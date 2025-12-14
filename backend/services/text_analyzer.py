"""
Text Analyzer Service
Analyzes voice note text to extract health information
"""

import re
from typing import Dict, List
from datetime import datetime


class TextAnalyzerService:
    """Service for analyzing health-related text and extracting structured data"""
    
    # Common symptom keywords
    SYMPTOM_KEYWORDS = {
        'pain': ['pain', 'ache', 'hurting', 'sore', 'tender', 'discomfort'],
        'headache': ['headache', 'head pain', 'migraine', 'head ache'],
        'fever': ['fever', 'temperature', 'hot', 'chills', 'sweating'],
        'nausea': ['nausea', 'nauseous', 'queasy', 'sick to stomach'],
        'fatigue': ['tired', 'fatigue', 'exhausted', 'worn out', 'drained'],
        'cough': ['cough', 'coughing', 'hacking'],
        'sore_throat': ['sore throat', 'throat pain', 'scratchy throat'],
        'dizziness': ['dizzy', 'dizziness', 'lightheaded', 'woozy'],
        'joint_pain': ['joint pain', 'arthritis', 'stiff joints'],
        'back_pain': ['back pain', 'backache', 'lower back'],
    }
    
    # Mood/mental state keywords
    MOOD_KEYWORDS = {
        'anxious': ['anxious', 'anxiety', 'worried', 'nervous', 'stressed'],
        'depressed': ['depressed', 'sad', 'down', 'blue', 'hopeless'],
        'happy': ['happy', 'good', 'great', 'excited', 'joyful'],
        'calm': ['calm', 'relaxed', 'peaceful', 'serene'],
        'irritated': ['irritated', 'angry', 'frustrated', 'annoyed'],
        'energetic': ['energetic', 'energized', 'active', 'peppy'],
    }
    
    # Medication keywords
    MEDICATION_PATTERNS = [
        r'\b(?:took|taking|taken|prescribed|medication|medicine|med|pill|tablet|capsule)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)',
        r'\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:mg|mcg|ml|dose)',
    ]
    
    # Lifestyle keywords
    LIFESTYLE_KEYWORDS = {
        'sleep': ['sleep', 'slept', 'sleeping', 'rested', 'insomnia', 'wake up'],
        'exercise': ['exercise', 'worked out', 'gym', 'running', 'walking', 'fitness'],
        'stress': ['stress', 'stressed', 'pressure', 'overwhelmed'],
        'food': ['ate', 'eating', 'food', 'meal', 'breakfast', 'lunch', 'dinner', 'snack'],
        'water': ['water', 'hydrated', 'drinking', 'thirsty'],
    }
    
    def analyze(self, text: str) -> Dict:
        """
        Analyze voice note text and extract structured health information
        
        Args:
            text: The voice note text to analyze
            
        Returns:
            Dictionary containing extracted information:
            - symptoms: List of detected symptoms
            - mood: Detected mood/mental state
            - medications: List of mentioned medications
            - lifestyle: Dictionary of lifestyle factors
        """
        text_lower = text.lower()
        
        # Extract symptoms
        symptoms = self._extract_symptoms(text_lower)
        
        # Extract mood
        mood = self._extract_mood(text_lower)
        
        # Extract medications
        medications = self._extract_medications(text)
        
        # Extract lifestyle context
        lifestyle = self._extract_lifestyle(text_lower)
        
        return {
            'symptoms': symptoms,
            'mood': mood,
            'medications': medications,
            'lifestyle': lifestyle,
            'raw_text': text,
            'analyzed_at': datetime.utcnow().isoformat()
        }
    
    def _extract_symptoms(self, text: str) -> List[str]:
        """Extract symptoms from text"""
        detected_symptoms = []
        
        for symptom, keywords in self.SYMPTOM_KEYWORDS.items():
            for keyword in keywords:
                if keyword in text:
                    # Convert snake_case to readable format
                    readable_name = symptom.replace('_', ' ').title()
                    if readable_name not in detected_symptoms:
                        detected_symptoms.append(readable_name)
                    break
        
        return detected_symptoms
    
    def _extract_mood(self, text: str) -> Dict[str, any]:
        """Extract mood/mental state from text"""
        mood_scores = {}
        
        for mood, keywords in self.MOOD_KEYWORDS.items():
            score = sum(1 for keyword in keywords if keyword in text)
            if score > 0:
                mood_scores[mood] = score
        
        # Determine primary mood (highest score)
        primary_mood = None
        if mood_scores:
            primary_mood = max(mood_scores, key=mood_scores.get)
        
        return {
            'primary': primary_mood.replace('_', ' ').title() if primary_mood else 'Neutral',
            'scores': mood_scores,
            'detected': primary_mood is not None
        }
    
    def _extract_medications(self, text: str) -> List[Dict[str, str]]:
        """Extract medication mentions from text"""
        medications = []
        
        # Try to find medication names using patterns
        for pattern in self.MEDICATION_PATTERNS:
            matches = re.finditer(pattern, text, re.IGNORECASE)
            for match in matches:
                med_name = match.group(1) if match.groups() else match.group(0)
                # Filter out common false positives
                if med_name.lower() not in ['took', 'taking', 'taken', 'prescribed', 'medication', 'medicine']:
                    medications.append({
                        'name': med_name.strip(),
                        'mentioned_in': text[max(0, match.start()-20):match.end()+20]
                    })
        
        # Remove duplicates
        seen = set()
        unique_meds = []
        for med in medications:
            if med['name'].lower() not in seen:
                seen.add(med['name'].lower())
                unique_meds.append(med)
        
        return unique_meds
    
    def _extract_lifestyle(self, text: str) -> Dict[str, any]:
        """Extract lifestyle context from text"""
        lifestyle = {}
        
        for category, keywords in self.LIFESTYLE_KEYWORDS.items():
            mentions = [keyword for keyword in keywords if keyword in text]
            if mentions:
                lifestyle[category] = {
                    'mentioned': True,
                    'keywords_found': mentions,
                    'count': len(mentions)
                }
        
        # Try to extract sleep hours if mentioned
        sleep_pattern = r'(?:slept|sleep|rested)\s+(?:for\s+)?(\d+)\s*(?:hours?|hrs?)'
        sleep_match = re.search(sleep_pattern, text, re.IGNORECASE)
        if sleep_match:
            lifestyle['sleep'] = lifestyle.get('sleep', {})
            lifestyle['sleep']['hours'] = int(sleep_match.group(1))
        
        return lifestyle
    
    def generate_summary(self, analysis: Dict) -> str:
        """
        Generate a short medical-style summary from the analysis
        
        Args:
            analysis: The analysis dictionary from analyze() method
            
        Returns:
            str: A concise medical summary
        """
        summary_parts = []
        
        # Add symptoms
        if analysis['symptoms']:
            symptoms_str = ', '.join(analysis['symptoms'])
            summary_parts.append(f"Presenting symptoms: {symptoms_str}.")
        
        # Add mood
        if analysis['mood']['detected']:
            summary_parts.append(f"Mental state: {analysis['mood']['primary']}.")
        
        # Add medications
        if analysis['medications']:
            med_names = [med['name'] for med in analysis['medications']]
            meds_str = ', '.join(med_names)
            summary_parts.append(f"Medications mentioned: {meds_str}.")
        
        # Add lifestyle highlights
        lifestyle_highlights = []
        if 'sleep' in analysis['lifestyle']:
            if 'hours' in analysis['lifestyle']['sleep']:
                lifestyle_highlights.append(f"Sleep: {analysis['lifestyle']['sleep']['hours']} hours")
            else:
                lifestyle_highlights.append("Sleep mentioned")
        
        if 'exercise' in analysis['lifestyle']:
            lifestyle_highlights.append("Exercise mentioned")
        
        if 'stress' in analysis['lifestyle']:
            lifestyle_highlights.append("Stress mentioned")
        
        if lifestyle_highlights:
            summary_parts.append(f"Lifestyle context: {', '.join(lifestyle_highlights)}.")
        
        # Combine into final summary
        if summary_parts:
            return ' '.join(summary_parts)
        else:
            return "Health log recorded. No specific symptoms or concerns identified."

