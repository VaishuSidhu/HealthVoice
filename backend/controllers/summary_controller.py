"""
Summary Controller
Handles generation of doctor-ready clinical summaries
"""

from typing import Dict, List
from datetime import datetime, timedelta
from services.database import DatabaseService


class SummaryController:
    """Controller for generating doctor-ready summaries"""
    
    def __init__(self, db_service: DatabaseService):
        """
        Initialize controller with database service
        
        Args:
            db_service: Database service instance
        """
        self.db = db_service
    
    def get_summary(self, days: int = 30, user_id: str = None) -> Dict:
        """
        Generate a clean clinical summary for doctor review
        
        Args:
            days: Number of days to include in summary (default: 30)
            
        Returns:
            Dictionary containing clinical summary text
        """
        # Get logs from specified period for this user
        logs = self.db.get_recent_logs(days=days, user_id=user_id)
        
        if not logs:
            return {
                'summary': "No health logs available for the specified period.",
                'period_days': days,
                'generated_at': datetime.utcnow().isoformat()
            }
        
        # Build clinical summary sections
        summary_sections = []
        
        # Header
        summary_sections.append(f"HEALTH SUMMARY - {days} DAY PERIOD")
        summary_sections.append(f"Generated: {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')}")
        summary_sections.append("")
        
        # Symptoms section
        all_symptoms = []
        for log in logs:
            analysis = log.get('analysis', {})
            symptoms = analysis.get('symptoms', [])
            all_symptoms.extend(symptoms)
        
        if all_symptoms:
            from collections import Counter
            symptom_counter = Counter(all_symptoms)
            summary_sections.append("SYMPTOMS:")
            for symptom, count in symptom_counter.most_common():
                summary_sections.append(f"  - {symptom}: reported {count} time(s)")
            summary_sections.append("")
        
        # Mental state section
        mood_states = []
        for log in logs:
            analysis = log.get('analysis', {})
            mood = analysis.get('mood', {})
            if mood.get('detected'):
                mood_states.append(mood.get('primary', 'Neutral'))
        
        if mood_states:
            from collections import Counter
            mood_counter = Counter(mood_states)
            summary_sections.append("MENTAL/EMOTIONAL STATE:")
            for mood, count in mood_counter.most_common():
                summary_sections.append(f"  - {mood}: noted {count} time(s)")
            summary_sections.append("")
        
        # Medications section
        all_medications = []
        for log in logs:
            analysis = log.get('analysis', {})
            medications = analysis.get('medications', [])
            for med in medications:
                all_medications.append(med.get('name'))
        
        if all_medications:
            from collections import Counter
            med_counter = Counter(all_medications)
            summary_sections.append("MEDICATIONS MENTIONED:")
            for med, count in med_counter.most_common():
                summary_sections.append(f"  - {med}: mentioned {count} time(s)")
            summary_sections.append("")
        
        # Lifestyle factors
        sleep_hours = []
        exercise_count = 0
        stress_count = 0
        
        for log in logs:
            analysis = log.get('analysis', {})
            lifestyle = analysis.get('lifestyle', {})
            
            if 'sleep' in lifestyle and 'hours' in lifestyle['sleep']:
                sleep_hours.append(lifestyle['sleep']['hours'])
            
            if 'exercise' in lifestyle:
                exercise_count += 1
            
            if 'stress' in lifestyle:
                stress_count += 1
        
        summary_sections.append("LIFESTYLE FACTORS:")
        if sleep_hours:
            avg_sleep = sum(sleep_hours) / len(sleep_hours)
            summary_sections.append(f"  - Average sleep: {avg_sleep:.1f} hours (from {len(sleep_hours)} mentions)")
        if exercise_count > 0:
            summary_sections.append(f"  - Exercise mentioned: {exercise_count} time(s)")
        if stress_count > 0:
            summary_sections.append(f"  - Stress mentioned: {stress_count} time(s)")
        summary_sections.append("")
        
        # Summary statistics
        summary_sections.append("SUMMARY STATISTICS:")
        summary_sections.append(f"  - Total health logs: {len(logs)}")
        summary_sections.append(f"  - Period: {days} days")
        summary_sections.append(f"  - Average logs per day: {len(logs) / days:.1f}")
        
        # Combine all sections
        clinical_summary = "\n".join(summary_sections)
        
        return {
            'summary': clinical_summary,
            'period_days': days,
            'total_logs': len(logs),
            'generated_at': datetime.utcnow().isoformat()
        }

