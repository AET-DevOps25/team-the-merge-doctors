# GenAI Service

This service uses [langchain](https://www.langchain.com) to enable communication with a LLM via the endpoints defined in [api_controller.py](controllers/api_controller.py). This service then calls [ollama](https://ollama.com), which is running in a separate container (see [Dockerfile](ollama/Dockerfile)).

## Setup Local Environment

1. Create a virtual environment

```
python3 -m venv .venv
```

2. Activate virtual environment

```
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

2. Install dependencies

```
pip install -r requirements.txt
```
