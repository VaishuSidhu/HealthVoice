"""
PDF Generator Service
Generates professional PDF reports from health data
"""

from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from io import BytesIO
from datetime import datetime
from typing import Dict


class PDFGenerator:
    """Service for generating PDF reports"""
    
    def __init__(self):
        """Initialize PDF generator"""
        self.styles = getSampleStyleSheet()
        self._setup_custom_styles()
    
    def _setup_custom_styles(self):
        """Setup custom paragraph styles"""
        # Title style
        self.styles.add(ParagraphStyle(
            name='CustomTitle',
            parent=self.styles['Heading1'],
            fontSize=24,
            textColor=colors.HexColor('#2563EB'),
            spaceAfter=30,
            alignment=TA_CENTER,
            fontName='Helvetica-Bold'
        ))
        
        # Heading style
        self.styles.add(ParagraphStyle(
            name='CustomHeading',
            parent=self.styles['Heading2'],
            fontSize=16,
            textColor=colors.HexColor('#2563EB'),
            spaceAfter=12,
            spaceBefore=12,
            fontName='Helvetica-Bold'
        ))
        
        # Body style
        self.styles.add(ParagraphStyle(
            name='CustomBody',
            parent=self.styles['BodyText'],
            fontSize=11,
            textColor=colors.HexColor('#1F2937'),
            spaceAfter=12,
            alignment=TA_JUSTIFY,
            leading=14
        ))
        
        # Footer style
        self.styles.add(ParagraphStyle(
            name='CustomFooter',
            parent=self.styles['Normal'],
            fontSize=9,
            textColor=colors.HexColor('#6B7280'),
            alignment=TA_CENTER,
            spaceBefore=20
        ))
    
    def generate_health_report(self, summary_data: Dict, days: int, report_type: str) -> BytesIO:
        """
        Generate a PDF health report
        
        Args:
            summary_data: Summary data from summary controller
            days: Number of days in report period
            report_type: Type of report (weekly/monthly/quarterly/summary)
            
        Returns:
            BytesIO: PDF file as bytes
        """
        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter,
                              rightMargin=72, leftMargin=72,
                              topMargin=72, bottomMargin=72)
        
        # Container for the 'Flowable' objects
        elements = []
        
        # Title
        title = Paragraph("HEALTHVOICE - HEALTH REPORT", self.styles['CustomTitle'])
        elements.append(title)
        elements.append(Spacer(1, 0.2*inch))
        
        # Report metadata
        metadata_data = [
            ['Generated:', datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')],
            ['Report Period:', f'{days} days'],
            ['Report Type:', report_type.upper()],
            ['Year:', '2025'],
        ]
        
        metadata_table = Table(metadata_data, colWidths=[2*inch, 4*inch])
        metadata_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#F3F4F6')),
            ('TEXTCOLOR', (0, 0), (-1, -1), colors.HexColor('#1F2937')),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
            ('TOPPADDING', (0, 0), (-1, -1), 8),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#E5E7EB')),
        ]))
        elements.append(metadata_table)
        elements.append(Spacer(1, 0.3*inch))
        
        # Divider line
        elements.append(Spacer(1, 0.1*inch))
        
        # Health Summary Section
        elements.append(Paragraph("HEALTH SUMMARY", self.styles['CustomHeading']))
        
        # Split summary into paragraphs
        summary_text = summary_data.get('summary', 'No health logs available for summary.')
        summary_paragraphs = summary_text.split('\n\n')
        
        for para in summary_paragraphs:
            if para.strip():
                # Clean up the text
                para = para.replace('\n', ' ').strip()
                if para:
                    elements.append(Paragraph(para, self.styles['CustomBody']))
                    elements.append(Spacer(1, 0.15*inch))
        
        elements.append(Spacer(1, 0.2*inch))
        
        # Report Statistics Section
        elements.append(Paragraph("REPORT STATISTICS", self.styles['CustomHeading']))
        
        stats_data = [
            ['Total Health Logs:', str(summary_data.get('total_logs', 0))],
            ['Period:', f"{summary_data.get('period_days', days)} days"],
            ['Generated At:', summary_data.get('generated_at', datetime.utcnow().isoformat())],
        ]
        
        stats_table = Table(stats_data, colWidths=[2.5*inch, 3.5*inch])
        stats_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#F3F4F6')),
            ('TEXTCOLOR', (0, 0), (-1, -1), colors.HexColor('#1F2937')),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
            ('TOPPADDING', (0, 0), (-1, -1), 8),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#E5E7EB')),
        ]))
        elements.append(stats_table)
        
        elements.append(Spacer(1, 0.3*inch))
        
        # Footer
        footer_text = """
        This report was generated by HealthVoice - Voice-First Health Tracking<br/>
        For medical advice, please consult with your healthcare provider.
        """
        elements.append(Paragraph(footer_text, self.styles['CustomFooter']))
        
        # Build PDF
        doc.build(elements)
        buffer.seek(0)
        return buffer

