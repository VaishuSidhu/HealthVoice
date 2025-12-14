"""
Trends Controller
Handles health trends analysis over time
"""

from typing import Dict, List
from datetime import datetime, timedelta
from collections import Counter, defaultdict
from services.database import DatabaseService


class TrendsController:
    """Controller for health trends analysis"""
    
    def __init__(self, db_service: DatabaseService):
        """
        Initialize controller with database service
        
        Args:
            db_service: Database service instance
        """
        self.db = db_service
    
    def get_trends(self, days: int = 30, user_id: str = None) -> Dict:
        """
        Get health trends for the specified time period
        
        Args:
            days: Number of days to analyze (default: 30)
            
        Returns:
            Dictionary containing:
            - symptom_frequency: Symptom trends over time
            - mood_trends: Mood patterns
            - medication_adherence: Medication tracking trends
        """
        # Get logs from specified period for this user
        logs = self.db.get_recent_logs(days=days, user_id=user_id)
        
        if not logs:
            return {
                'symptom_frequency': [],
                'mood_trends': [],
                'medication_adherence': {
                    'total_mentions': 0,
                    'unique_medications': 0,
                    'medications': []
                },
                'period_days': days,
                'message': 'No data available for trend analysis'
            }
        
        # Organize data by date
        daily_data = defaultdict(lambda: {
            'symptoms': [],
            'moods': [],
            'medications': []
        })
        
        for log in logs:
            timestamp = log.get('timestamp')
            if timestamp:
                if isinstance(timestamp, str):
                    timestamp = datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
                date_key = timestamp.date().isoformat()
                
                analysis = log.get('analysis', {})
                
                # Collect daily symptoms
                symptoms = analysis.get('symptoms', [])
                daily_data[date_key]['symptoms'].extend(symptoms)
                
                # Collect daily moods
                mood = analysis.get('mood', {})
                if mood.get('detected'):
                    daily_data[date_key]['moods'].append(mood.get('primary', 'Neutral'))
                
                # Collect daily medications
                medications = analysis.get('medications', [])
                for med in medications:
                    daily_data[date_key]['medications'].append(med.get('name'))
        
        # Process symptom frequency trends
        all_symptoms = []
        for date_data in daily_data.values():
            all_symptoms.extend(date_data['symptoms'])
        
        symptom_counter = Counter(all_symptoms)
        symptom_frequency = [
            {
                'symptom': symptom,
                'total_occurrences': count,
                'frequency_percentage': round((count / len(logs)) * 100, 1) if logs else 0,
                'trend': 'stable'  # Could be enhanced with time-series analysis
            }
            for symptom, count in symptom_counter.most_common()
        ]
        
        # Process mood trends
        all_moods = []
        for date_data in daily_data.values():
            all_moods.extend(date_data['moods'])
        
        mood_counter = Counter(all_moods)
        mood_trends = [
            {
                'mood': mood,
                'occurrences': count,
                'percentage': round((count / len(all_moods)) * 100, 1) if all_moods else 0
            }
            for mood, count in mood_counter.most_common()
        ]
        
        # Process medication adherence
        all_medications = []
        for date_data in daily_data.values():
            all_medications.extend(date_data['medications'])
        
        medication_counter = Counter(all_medications)
        medication_adherence = {
            'total_mentions': len(all_medications),
            'unique_medications': len(medication_counter),
            'medications': [
                {
                    'name': med,
                    'mentions': count,
                    'adherence_score': round((count / days) * 100, 1) if days > 0 else 0
                }
                for med, count in medication_counter.most_common()
            ]
        }
        
        # Daily breakdown for charting
        daily_breakdown = []
        for date_key in sorted(daily_data.keys()):
            date_data = daily_data[date_key]
            daily_breakdown.append({
                'date': date_key,
                'symptoms_count': len(date_data['symptoms']),
                'unique_symptoms': len(set(date_data['symptoms'])),
                'mood': date_data['moods'][0] if date_data['moods'] else None,
                'medications_count': len(date_data['medications'])
            })
        
        return {
            'symptom_frequency': symptom_frequency,
            'mood_trends': mood_trends,
            'medication_adherence': medication_adherence,
            'daily_breakdown': daily_breakdown,
            'period_days': days,
            'total_logs': len(logs),
            'analysis_date': datetime.utcnow().isoformat()
        }

