from langchain_openai import OpenAI
from langchain_core.prompts import PromptTemplate

from config import Config


def ask(question: str) -> str:
    prompt = PromptTemplate(
        template="You are a helpful assistant. Q: {question}\nA:",
        input_variables=["question"],
    )
    llm = OpenAI(openai_api_key=Config.OPENAI_API_KEY, temperature=0.7)

    chain = prompt | llm

    result = chain.invoke({"question": question})
    return result
