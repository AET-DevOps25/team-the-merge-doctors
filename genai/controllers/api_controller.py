from flask import Blueprint, request, jsonify
from services.query_service import QueryService

api = Blueprint('api', __name__, url_prefix='/api')

@api.route('/ask', methods=['POST'])
def ask():
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


@api.route('/history', methods=['GET'])
def history():
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
