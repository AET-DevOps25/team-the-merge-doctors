from flask import Blueprint, request, jsonify
from services.summarization_service import SummarizationService

api = Blueprint('api', __name__, url_prefix='/api')

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

