from flask import Blueprint, request, jsonify
from services.query_service import QueryService
from services.summarization_service import SummarizationService

api = Blueprint('api', __name__, url_prefix='/api')

@api.route('/ask', methods=['POST'])
def ask():
    '''Endpoint for asking LLM a question'''
    data = request.get_json(force=True)
    question = data.get('question')
    if not question:
        return jsonify({'error': 'Question field is required.'}), 400

    log = QueryService.handle_question(question)
    return jsonify({
        'id': log.id,
        'question': log.question,
        'answer': log.answer,
        'timestamp': log.timestamp.isoformat()
    }), 200

@api.route('/summarize', methods=['POST'])
def summarize():
    '''Endpoint for letting LLM summarize text'''
    data = request.get_json(force=True)
    text_to_summarize = data.get('textToSummarize')
    if not text_to_summarize:
        return jsonify({'error': 'textToSummarize field is required.'}), 400

    log = SummarizationService.handle_summarization(text_to_summarize)
    return jsonify({
        'id': log.id,
        'textToSummarize': log.text_to_summarize,
        'summarizedText': log.summarized_text,
        'timestamp': log.timestamp.isoformat()
    }), 200


@api.route('/ask/history', methods=['GET'])
def ask_history():
    '''Endpoint for listing the history of all ask commands'''
    logs = QueryService.list_history()
    return jsonify([
        {
            'id': l.id,
            'question': l.question,
            'answer': l.answer,
            'timestamp': l.timestamp.isoformat()
        }
        for l in logs
    ])

@api.route('/summarize/history', methods=['GET'])
def summarize_history():
    '''Endpoint for listing the history of all summarize commands'''
    logs = SummarizationService.list_history()
    return jsonify([
        {
            'id': log.id,
            'textToSummarize': log.text_to_summarize,
            'summarizedText': log.summarized_text,
            'timestamp': log.timestamp.isoformat()
        }
        for log in logs
    ])

