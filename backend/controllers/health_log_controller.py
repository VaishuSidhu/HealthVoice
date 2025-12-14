"""
Health Log Controller
Handles creation and processing of health logs from voice input
"""

from typing import Dict
from datetime import datetime
from services.database import DatabaseService
from services.text_analyzer import TextAnalyzerService


class HealthLogController:
    """Controller for managing health log operations"""
    
    def __init__(self, db_service: DatabaseService, text_analyzer: TextAnalyzerService):
        """
        Initialize controller with required services
        
        Args:
            db_service: Database service instance
            text_analyzer: Text analyzer service instance
        """
        self.db = db_service
        self.analyzer = text_analyzer
    
    def create_health_log(self, prompt: str, user_id: str = None) -> Dict:
        """
        Create a new health log from voice note text
        
        Args:
            prompt: The voice note text from SpeakSpace workflow
            user_id: User ID to associate with the log
            
        Returns:
            Dictionary containing log_id and summary
        """
        # Analyze the text to extract health information
        analysis = self.analyzer.analyze(prompt)
        
        # Generate a medical-style summary
        summary = self.analyzer.generate_summary(analysis)
        
        # Prepare document for database
        log_data = {
            'prompt': prompt,
            'analysis': analysis,
            'summary': summary,
            'timestamp': datetime.utcnow(),
            'created_at': datetime.utcnow().isoformat()
        }
        
        # Insert into database with user_id
        log_id = self.db.insert_health_log(log_data, user_id=user_id)
        
        return {
            'log_id': log_id,
            'summary': summary,
            'analysis': analysis
        }

