FROM ollama/ollama:latest

RUN ollama serve & \
    sleep 10 && \
    ollama pull llama3.2 && \
    pkill ollama

ENTRYPOINT ["ollama", "serve"]