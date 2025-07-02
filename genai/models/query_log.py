from database import db
from datetime import datetime

class QueryLog(db.Model):
    '''Database model for storing question-answer pairs and their timestamps'''
    __tablename__ = 'query_logs'
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)
    answer = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)