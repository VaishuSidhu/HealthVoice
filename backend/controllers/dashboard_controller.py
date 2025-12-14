"""
Dashboard Controller
Handles dashboard overview data aggregation
"""

from typing import Dict, List
from datetime import datetime, timedelta
from services.database import DatabaseService


class DashboardController:
    """Controller for dashboard overview operations"""
    
    def __init__(self, db_service: DatabaseService):
        """
        Initialize controller with database service
        
        Args:
            db_service: Database service instance
        """
        self.db = db_service
    
    def get_overview(self, user_id: str = None) -> Dict:
        """
        Get dashboard overview data for today
        
        Returns:
            Dictionary containing:
            - today_symptoms: List of symptoms mentioned today
            - mental_state: Current mental state
            - medications_logged: List of medications mentioned today
            - health_consistency: Count and streak information
        """
        # Get today's logs for this user
        today_logs = self.db.get_today_logs(user_id=user_id)
        
        # Aggregate symptoms from today
        today_symptoms = []
        medications_logged = []
        mood_states = []
        
        for log in today_logs:
            analysis = log.get('analysis', {})
            
            # Collect symptoms
            symptoms = analysis.get('symptoms', [])
            today_symptoms.extend(symptoms)
            
            # Collect medications
            medications = analysis.get('medications', [])
            medications_logged.extend([med.get('name') for med in medications])
            
            # Collect mood states
            mood = analysis.get('mood', {})
            if mood.get('detected'):
                mood_states.append(mood.get('primary', 'Neutral'))
        
        # Remove duplicates
        today_symptoms = list(set(today_symptoms))
        medications_logged = list(set(medications_logged))
        
        # Determine primary mental state (most frequent)
        mental_state = 'Neutral'
        if mood_states:
            from collections import Counter
            mood_counter = Counter(mood_states)
            mental_state = mood_counter.most_common(1)[0][0]
        
        # Calculate health consistency (streak of days with logs)
        consistency = self._calculate_consistency(user_id=user_id)
        
        return {
            'today_symptoms': today_symptoms,
            'mental_state': mental_state,
            'medications_logged': medications_logged,
            'health_consistency': consistency,
            'logs_today': len(today_logs),
            'timestamp': datetime.utcnow().isoformat()
        }
    
    def _calculate_consistency(self, user_id: str = None) -> Dict:
        """
        Calculate health logging consistency (streak and count)
        
        Args:
            user_id: User ID to filter logs (if provided)
        
        Returns:
            Dictionary with streak and total count
        """
        # Get logs from last 30 days to calculate streak for this user
        recent_logs = self.db.get_recent_logs(days=30, user_id=user_id)
        
        if not recent_logs:
            return {
                'streak_days': 0,
                'total_logs': 0,
                'last_log_date': None
            }
        
        # Extract unique dates from logs
        dates_with_logs = set()
        for log in recent_logs:
            timestamp = log.get('timestamp')
            if timestamp:
                if isinstance(timestamp, str):
                    timestamp = datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
                date_only = timestamp.date()
                dates_with_logs.add(date_only)
        
        # Calculate streak (consecutive days with logs)
        streak_days = 0
        today = datetime.utcnow().date()
        current_date = today
        
        # Count backwards from today
        while current_date in dates_with_logs:
            streak_days += 1
            current_date -= timedelta(days=1)
        
        # Get most recent log date
        last_log = recent_logs[0] if recent_logs else None
        last_log_date = None
        if last_log:
            timestamp = last_log.get('timestamp')
            if timestamp:
                if isinstance(timestamp, str):
                    timestamp = datetime.fromisoformat(timestamp.replace('Z', '+00:00'))
                last_log_date = timestamp.date().isoformat()
        
        return {
            'streak_days': streak_days,
            'total_logs': len(recent_logs),
            'last_log_date': last_log_date,
            'unique_days_logged': len(dates_with_logs)
        }

