from models.summarization_log import SummarizationLog
from repositories.summarization_log_repositories import SummarizationLogRepository
from utils.langchain_utils import summarize

class SummarizationService:
    """Service class for handling text summarization and managing summarization history."""

    @staticmethod
    def handle_summarization(text_to_summarize: str) -> SummarizationLog:
        """Processes text through the summarization model and saves the result to database."""
        summarized_text = summarize(text_to_summarize)
        log = SummarizationLog(text_to_summarize=text_to_summarize, summarized_text=summarized_text)
        return SummarizationLogRepository.save(log)

    @staticmethod
    def list_history():
        """Retrieves all previous summarization entries from the database."""
        return SummarizationLogRepository.find_all()