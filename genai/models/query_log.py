from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class QueryLog(db.Model):
    __tablename__ = 'query_logs'
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)
    answer = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)