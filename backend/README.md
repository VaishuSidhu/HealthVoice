# HealthVoice Backend API

Flask-based REST API backend for HealthVoice, a voice-first health tracking application. This backend processes voice health logs, analyzes text to extract health information, and provides insights and summaries.

## Features

- **Voice Health Log Processing**: Accepts voice note text from SpeakSpace workflows and extracts structured health data
- **Text Analysis**: Analyzes text to identify symptoms, mood, medications, and lifestyle factors
- **Dashboard Overview**: Provides today's health summary with symptoms, mood, medications, and consistency metrics
- **Health Insights**: Generates structured insights including symptom frequency, mood trends, and lifestyle context
- **Doctor-Ready Summaries**: Creates clean clinical summaries suitable for healthcare providers
- **Health Trends**: Analyzes trends over time for symptoms, mood, and medication adherence

## Tech Stack

- **Python 3.8+**
- **Flask**: Web framework for REST API
- **MongoDB**: Database for storing health logs
- **pymongo**: MongoDB driver for Python

## Prerequisites

- Python 3.8 or higher
- MongoDB Atlas account OR local MongoDB installation
- pip (Python package manager)

## Installation

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Create a virtual environment** (recommended):
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**:
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env and add your MongoDB connection string
   # For MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/healthvoice?retryWrites=true&w=majority
   # For local MongoDB:
   # MONGODB_URI=mongodb://localhost:27017/healthvoice
   ```

## Running the Backend

1. **Activate your virtual environment** (if not already activated)

2. **Start the Flask server**:
   ```bash
   python app.py
   ```

   The API will be available at `http://localhost:5000`

3. **Verify the server is running**:
   ```bash
   curl http://localhost:5000/health
   ```

   You should receive a JSON response with status "healthy".

## API Endpoints

### Health Check
- **GET** `/health`
  - Returns API health status

### Health Logs
- **POST** `/api/health-logs`
  - Accepts voice note text from SpeakSpace workflows
  - Request body: `{ "prompt": "voice note text" }`
  - Returns: `{ "message": "Health log created successfully", "log_id": "...", "summary": "..." }`

### Dashboard
- **GET** `/api/dashboard/overview`
  - Returns today's health overview
  - Response includes: symptoms, mental state, medications, health consistency

### Insights
- **GET** `/api/insights?days=7`
  - Returns structured health insights
  - Query parameter: `days` (default: 7)
  - Response includes: symptoms detected, mental state, medications, lifestyle context

### Summary
- **GET** `/api/summary?days=30`
  - Returns doctor-ready clinical summary
  - Query parameter: `days` (default: 30)
  - Response includes: formatted clinical summary text

### Trends
- **GET** `/api/trends?days=30`
  - Returns health trends analysis
  - Query parameter: `days` (default: 30)
  - Response includes: symptom frequency, mood trends, medication adherence

## Testing the API

### Using cURL

1. **Test health check**:
   ```bash
   curl http://localhost:5000/health
   ```

2. **Create a health log**:
   ```bash
   curl -X POST http://localhost:5000/api/health-logs \
     -H "Content-Type: application/json" \
     -d '{"prompt": "I have a headache and feel tired today. Took ibuprofen this morning."}'
   ```

3. **Get dashboard overview**:
   ```bash
   curl http://localhost:5000/api/dashboard/overview
   ```

4. **Get insights**:
   ```bash
   curl http://localhost:5000/api/insights?days=7
   ```

5. **Get doctor summary**:
   ```bash
   curl http://localhost:5000/api/summary?days=30
   ```

6. **Get trends**:
   ```bash
   curl http://localhost:5000/api/trends?days=30
   ```

### Using Python requests

```python
import requests

# Create a health log
response = requests.post(
    'http://localhost:5000/api/health-logs',
    json={'prompt': 'I have a headache and feel tired today.'}
)
print(response.json())

# Get dashboard overview
response = requests.get('http://localhost:5000/api/dashboard/overview')
print(response.json())
```

## Project Structure

```
backend/
├── app.py                      # Main Flask application
├── requirements.txt            # Python dependencies
├── .env.example                # Environment variables template
├── README.md                   # This file
├── controllers/                # Request handlers
│   ├── __init__.py
│   ├── dashboard_controller.py
│   ├── health_log_controller.py
│   ├── insights_controller.py
│   ├── summary_controller.py
│   └── trends_controller.py
└── services/                   # Business logic
    ├── __init__.py
    ├── database.py            # MongoDB operations
    └── text_analyzer.py       # Text analysis logic
```

## Text Analysis

The backend analyzes voice note text to extract:

- **Symptoms**: Headache, pain, fever, nausea, fatigue, cough, etc.
- **Mood/Mental State**: Anxious, depressed, happy, calm, irritated, energetic
- **Medications**: Detects medication names mentioned in text
- **Lifestyle Factors**: Sleep, exercise, stress, food, water intake

The analysis uses keyword matching and pattern recognition. For production use, consider integrating with NLP services for more accurate extraction.

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200`: Success
- `400`: Bad Request (missing/invalid parameters)
- `500`: Internal Server Error

Error responses include an `error` field with details.

## CORS

CORS is enabled to allow frontend communication. The API accepts requests from any origin. For production, configure CORS to restrict to specific domains.

## Environment Variables

- `MONGODB_URI`: MongoDB connection string (required)
- `FLASK_ENV`: Flask environment (development/production)
- `PORT`: Server port (default: 5000)

## Development Tips

1. **Enable debug mode**: Set `FLASK_ENV=development` in `.env`
2. **View logs**: Check console output for database connection status and errors
3. **Test with sample data**: Create multiple health logs to see trends and insights
4. **MongoDB Compass**: Use MongoDB Compass to view stored data

## Production Deployment

For production deployment:

1. Set `FLASK_ENV=production` in `.env`
2. Use a production WSGI server (e.g., Gunicorn):
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```
3. Configure proper MongoDB connection with authentication
4. Set up environment variables securely
5. Enable HTTPS
6. Configure CORS for specific domains only

## Troubleshooting

**MongoDB Connection Error**:
- Verify MongoDB is running (if local)
- Check connection string in `.env`
- Ensure network access (for MongoDB Atlas)

**Import Errors**:
- Ensure virtual environment is activated
- Run `pip install -r requirements.txt` again

**Port Already in Use**:
- Change `PORT` in `.env` to a different port
- Or stop the process using port 5000

## License

Proprietary - All rights reserved

