"""
HealthVoice Backend API
Flask application for processing voice health logs and providing health insights
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import services and controllers
from services.database import DatabaseService
from services.text_analyzer import TextAnalyzerService
from controllers.health_log_controller import HealthLogController
from controllers.dashboard_controller import DashboardController
from controllers.insights_controller import InsightsController
from controllers.summary_controller import SummaryController
from controllers.trends_controller import TrendsController

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Initialize services
db_service = DatabaseService()
text_analyzer = TextAnalyzerService()

# Initialize controllers
health_log_controller = HealthLogController(db_service, text_analyzer)
dashboard_controller = DashboardController(db_service)
insights_controller = InsightsController(db_service)
summary_controller = SummaryController(db_service)
trends_controller = TrendsController(db_service)


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify API is running"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat()
    }), 200


@app.route('/api/health-logs', methods=['POST'])
def create_health_log():
    """
    Endpoint to accept voice health logs from SpeakSpace workflows
    Input: { "prompt": "voice note text", "user_id": "optional user id" }
    """
    try:
        data = request.get_json()
        
        if not data or 'prompt' not in data:
            return jsonify({
                "error": "Missing 'prompt' field in request body"
            }), 400
        
        prompt = data['prompt']
        user_id = data.get('user_id')  # Get user_id from request
        
        if not prompt or not isinstance(prompt, str):
            return jsonify({
                "error": "Prompt must be a non-empty string"
            }), 400
        
        # Process the health log with user_id
        result = health_log_controller.create_health_log(prompt, user_id=user_id)
        
        return jsonify({
            "message": "Health log created successfully",
            "log_id": result['log_id'],
            "summary": result['summary']
        }), 200
        
    except Exception as e:
        return jsonify({
            "error": "Failed to process health log",
            "details": str(e)
        }), 500


@app.route('/api/dashboard/overview', methods=['GET'])
def get_dashboard_overview():
    """
    Endpoint to fetch dashboard overview
    Returns: Today's symptoms, mental state, medications, health consistency
    """
    try:
        user_id = request.args.get('user_id')  # Get user_id from query params
        overview = dashboard_controller.get_overview(user_id=user_id)
        return jsonify(overview), 200
        
    except Exception as e:
        return jsonify({
            "error": "Failed to fetch dashboard overview",
            "details": str(e)
        }), 500


@app.route('/api/insights', methods=['GET'])
def get_health_insights():
    """
    Endpoint to fetch structured health insights
    Returns: Symptoms, mental state, medications, lifestyle context
    """
    try:
        # Optional query parameters for date range
        days = request.args.get('days', default=7, type=int)
        user_id = request.args.get('user_id')  # Get user_id from query params
        
        insights = insights_controller.get_insights(days=days, user_id=user_id)
        return jsonify(insights), 200
        
    except Exception as e:
        return jsonify({
            "error": "Failed to fetch health insights",
            "details": str(e)
        }), 500


@app.route('/api/summary', methods=['GET'])
def get_doctor_summary():
    """
    Endpoint to fetch doctor-ready summary
    Returns: Clean clinical summary text
    """
    try:
        # Optional query parameters for date range
        days = request.args.get('days', default=30, type=int)
        user_id = request.args.get('user_id')  # Get user_id from query params
        
        summary = summary_controller.get_summary(days=days, user_id=user_id)
        return jsonify(summary), 200
        
    except Exception as e:
        return jsonify({
            "error": "Failed to generate doctor summary",
            "details": str(e)
        }), 500


@app.route('/api/trends', methods=['GET'])
def get_health_trends():
    """
    Endpoint to fetch health trends
    Returns: Symptom frequency, mood trends, medication adherence
    """
    try:
        # Optional query parameters for date range
        days = request.args.get('days', default=30, type=int)
        user_id = request.args.get('user_id')  # Get user_id from query params
        
        trends = trends_controller.get_trends(days=days, user_id=user_id)
        return jsonify(trends), 200
        
    except Exception as e:
        return jsonify({
            "error": "Failed to fetch health trends",
            "details": str(e)
        }), 500


@app.route('/api/reports/download', methods=['GET'])
def download_report():
    """
    Endpoint to download health report as PDF file
    Returns: PDF file download with health summary
    """
    try:
        from flask import Response
        from datetime import datetime
        from services.pdf_generator import PDFGenerator
        
        # Optional query parameters
        days = request.args.get('days', default=30, type=int)
        report_type = request.args.get('type', default='summary', type=str)
        user_id = request.args.get('user_id')  # Get user_id from query params
        format_type = request.args.get('format', default='pdf', type=str)  # pdf or txt
        
        # Get summary data for this user
        summary_data = summary_controller.get_summary(days=days, user_id=user_id)
        
        # Create filename with timestamp
        timestamp = datetime.utcnow().strftime('%Y%m%d_%H%M%S')
        
        if format_type.lower() == 'pdf':
            # Generate PDF
            pdf_generator = PDFGenerator()
            pdf_buffer = pdf_generator.generate_health_report(summary_data, days, report_type)
            
            filename = f"healthvoice_report_{timestamp}.pdf"
            
            # Return as PDF download
            return Response(
                pdf_buffer.getvalue(),
                mimetype='application/pdf',
                headers={
                    'Content-Disposition': f'attachment; filename={filename}',
                    'Content-Type': 'application/pdf'
                }
            )
        else:
            # Fallback to text format
            report_content = f"""HEALTHVOICE - HEALTH REPORT
Generated: {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')}
Report Period: {days} days
Report Type: {report_type.upper()}
Year: 2025

{'=' * 60}

{summary_data['summary']}

{'=' * 60}

REPORT STATISTICS
- Total Health Logs: {summary_data.get('total_logs', 0)}
- Period: {summary_data.get('period_days', days)} days
- Generated At: {summary_data.get('generated_at', datetime.utcnow().isoformat())}

{'=' * 60}

This report was generated by HealthVoice - Voice-First Health Tracking
For medical advice, please consult with your healthcare provider.

"""
            filename = f"healthvoice_report_{timestamp}.txt"
            
            return Response(
                report_content,
                mimetype='text/plain',
                headers={
                    'Content-Disposition': f'attachment; filename={filename}',
                    'Content-Type': 'text/plain; charset=utf-8'
                }
            )
        
    except Exception as e:
        return jsonify({
            "error": "Failed to generate report",
            "details": str(e)
        }), 500


if __name__ == '__main__':
    # Get port from environment or default to 5000
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    
    app.run(host='0.0.0.0', port=port, debug=debug)

