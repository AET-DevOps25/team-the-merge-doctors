from models.query_log import QueryLog
from database import db

class QueryLogRepository:
    """Repository class for QueryLog database operations with save and retrieval methods."""

    @staticmethod
    def save(log: QueryLog) -> QueryLog:
        """Saves a QueryLog instance to the database and returns the saved object."""
        db.session.add(log)
        db.session.commit()
        return log

    @staticmethod
    def find_all():
        """Retrieves all QueryLog entries."""
        return QueryLog.query.order_by(QueryLog.timestamp.desc()).all()