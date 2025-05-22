from models.query_log import QueryLog
from repositories.query_log_repositories import QueryLogRepository
from utils.langchain_utils import ask as ask_llm

class QueryService:
    @staticmethod
    def handle_question(question: str) -> QueryLog:
        answer = ask_llm(question)
        log = QueryLog(question=question, answer=answer)
        return QueryLogRepository.save(log)

    @staticmethod
    def list_history():
        return QueryLogRepository.find_all()