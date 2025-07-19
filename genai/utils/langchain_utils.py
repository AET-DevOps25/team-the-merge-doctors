import os
import logging
from langchain_core.prompts import PromptTemplate
from langchain_ollama import OllamaLLM

from config import Config

logger = logging.getLogger(__name__)

def _get_llm():
    """Get Ollama LLM instance"""
    try:
        base_url = os.getenv('OLLAMA_BASE_URL', 'http://ollama-service:11434')
        return OllamaLLM(model="llama3.2", base_url=base_url)
    except Exception as e:
        logger.error(f"Failed to initialize Ollama LLM: {e}")
        raise

def summarize(text_to_summarize: str) -> str:
  """Summarizes the given text using the LLM."""
  prompt = PromptTemplate(
    template="Please summarize the following text in less than 4 sentences. Please only include the summarized text in your response and nothing else:\n{text}",
    input_variables=["text"],
  )
  llm = _get_llm()

  chain = prompt | llm

  result = chain.invoke({"text": text_to_summarize})
  return result