from database import db
from datetime import datetime

class SummarizationLog(db.Model):
    '''Database model for storing summarization queries and their timestamps'''
    __tablename__ = 'summarization_logs'
    id = db.Column(db.Integer, primary_key=True)
    text_to_summarize = db.Column(db.Text, nullable=False)
    summarized_text = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)