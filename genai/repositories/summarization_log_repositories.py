from models.summarization_log import SummarizationLog
from database import db

class SummarizationLogRepository:
    """Repository class for SummaryLog database operations with save and retrieval methods."""
    
    @staticmethod
    def save(log: SummarizationLog) -> SummarizationLog:
        """Saves a SummaryLog instance to the database and returns the saved object."""
        db.session.add(log)
        db.session.commit()
        return log

    @staticmethod
    def find_all():
        """Retrieves all SummaryLog entries."""
        return SummarizationLog.query.order_by(SummarizationLog.timestamp.desc()).all()