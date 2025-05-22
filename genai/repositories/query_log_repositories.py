from models.query_log import QueryLog, db

class QueryLogRepository:
    @staticmethod
    def save(log: QueryLog) -> QueryLog:
        db.session.add(log)
        db.session.commit()
        return log

    @staticmethod
    def find_all():
        return QueryLog.query.order_by(QueryLog.timestamp.desc()).all()