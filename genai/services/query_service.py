from models.query_log import QueryLog
from repositories.query_log_repositories import QueryLogRepository
from utils.langchain_utils import ask as ask_llm

class QueryService:
    """Service class for handling user questions and managing query history."""

    @staticmethod
    def handle_question(question: str) -> QueryLog:
        """Processes a user question through the LLM and saves the result to database."""
        answer = ask_llm(question)
        log = QueryLog(question=question, answer=answer)
        return QueryLogRepository.save(log)

    @staticmethod
    def list_history():
        """Retrieves all previous query-answer pairs from the database."""
        return QueryLogRepository.find_all()