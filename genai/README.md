# GenAI Service

This service uses [langchain](https://www.langchain.com) to enable communication with a LLM via the endpoints defined in [api_controller.py](controllers/api_controller.py). This service then calls [ollama](https://ollama.com), which is running in a separate container (see [Dockerfile](ollama/Dockerfile)). The main use case of the GenAI service is summarization of application texts.

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

## Generate Swagger Specification

To generate the swagger schema for the GenAI service follow the following steps:

1. Start docker compose

```
docker compose up --build
```

2. Go to `http://localhost:5001/swagger.json`
