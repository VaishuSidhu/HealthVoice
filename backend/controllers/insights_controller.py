"""
Insights Controller
Handles structured health insights generation
"""

from typing import Dict, List
from datetime import datetime, timedelta
from collections import Counter
from services.database import DatabaseService


class InsightsController:
    """Controller for health insights operations"""
    
    def __init__(self, db_service: DatabaseService):
        """
        Initialize controller with database service
        
        Args:
            db_service: Database service instance
        """
        self.db = db_service
    
    def get_insights(self, days: int = 7, user_id: str = None) -> Dict:
        """
        Get structured health insights for the specified time period
        
        Args:
            days: Number of days to analyze (default: 7)
            
        Returns:
            Dictionary containing:
            - symptoms_detected: List of symptoms with frequency
            - mental_emotional_state: Mood trends
            - medications_timing: Medication mentions
            - lifestyle_context: Lifestyle factors
        """
        # Get logs from specified period for this user
        logs = self.db.get_recent_logs(days=days, user_id=user_id)
        
        # Aggregate data
        all_symptoms = []
        all_moods = []
        all_medications = []
        lifestyle_data = {
            'sleep': [],
            'exercise': [],
            'stress': [],
            'food': []
        }
        
        for log in logs:
            analysis = log.get('analysis', {})
            
            # Collect symptoms
            symptoms = analysis.get('symptoms', [])
            all_symptoms.extend(symptoms)
            
            # Collect moods
            mood = analysis.get('mood', {})
            if mood.get('detected'):
                all_moods.append(mood.get('primary', 'Neutral'))
            
            # Collect medications
            medications = analysis.get('medications', [])
            for med in medications:
                all_medications.append(med.get('name'))
            
            # Collect lifestyle data
            lifestyle = analysis.get('lifestyle', {})
            if 'sleep' in lifestyle:
                sleep_info = lifestyle['sleep']
                if 'hours' in sleep_info:
                    lifestyle_data['sleep'].append(sleep_info['hours'])
            
            if 'exercise' in lifestyle:
                lifestyle_data['exercise'].append(log.get('timestamp'))
            
            if 'stress' in lifestyle:
                lifestyle_data['stress'].append(log.get('timestamp'))
        
        # Process symptoms with frequency
        symptom_counter = Counter(all_symptoms)
        symptoms_detected = [
            {
                'symptom': symptom,
                'frequency': count,
                'percentage': round((count / len(logs)) * 100, 1) if logs else 0
            }
            for symptom, count in symptom_counter.most_common()
        ]
        
        # Process mood trends
        mood_counter = Counter(all_moods)
        mental_emotional_state = {
            'primary_mood': mood_counter.most_common(1)[0][0] if mood_counter else 'Neutral',
            'mood_distribution': dict(mood_counter),
            'total_mood_mentions': len(all_moods)
        }
        
        # Process medications
        medication_counter = Counter(all_medications)
        medications_timing = [
            {
                'medication': med,
                'mentions': count
            }
            for med, count in medication_counter.most_common()
        ]
        
        # Process lifestyle context
        lifestyle_context = {
            'sleep': {
                'average_hours': round(sum(lifestyle_data['sleep']) / len(lifestyle_data['sleep']), 1) if lifestyle_data['sleep'] else None,
                'mentions': len(lifestyle_data['sleep'])
            },
            'exercise': {
                'mentions': len(lifestyle_data['exercise']),
                'frequency': f"{len(lifestyle_data['exercise'])} times in {days} days"
            },
            'stress': {
                'mentions': len(lifestyle_data['stress']),
                'frequency': f"{len(lifestyle_data['stress'])} times in {days} days"
            }
        }
        
        return {
            'symptoms_detected': symptoms_detected,
            'mental_emotional_state': mental_emotional_state,
            'medications_timing': medications_timing,
            'lifestyle_context': lifestyle_context,
            'analysis_period': {
                'days': days,
                'start_date': (datetime.utcnow() - timedelta(days=days)).isoformat(),
                'end_date': datetime.utcnow().isoformat(),
                'total_logs': len(logs)
            }
        }

