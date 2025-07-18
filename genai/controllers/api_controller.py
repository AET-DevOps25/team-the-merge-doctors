from flask import request, jsonify
from flask_restx import Namespace, Resource, fields
from services.summarization_service import SummarizationService

api = Namespace('GenAI', description='Endpoints for text summarization')

# Define request and response models
summarize_request = api.model('SummarizeRequest', {
    'textToSummarize': fields.String(required=True, description='Text to be summarized')
})

summarize_response = api.model('SummarizeResponse', {
    'id': fields.Integer(description='Log ID'),
    'textToSummarize': fields.String(description='Original text'),
    'summarizedText': fields.String(description='Summarized text'),
    'timestamp': fields.String(description='Timestamp of summarization')
})

@api.route('/summarize')
class Summarize(Resource):
    @api.expect(summarize_request)
    @api.marshal_with(summarize_response, code=200)
    def post(self):
        '''Endpoint for letting LLM summarize text'''
        data = request.get_json(force=True)
        text_to_summarize = data.get('textToSummarize')
        if not text_to_summarize:
            return {'error': 'textToSummarize field is required.'}, 400

        log = SummarizationService.handle_summarization(text_to_summarize)
        return {
            'id': log.id,
            'textToSummarize': log.text_to_summarize,
            'summarizedText': log.summarized_text,
            'timestamp': log.timestamp.isoformat()
        }

@api.route('/summarize/history')
class SummarizeHistory(Resource):
    @api.marshal_list_with(summarize_response, code=200)
    def get(self):
        '''Endpoint for listing the history of all summarize commands'''
        logs = SummarizationService.list_history()
        return [
            {
                'id': log.id,
                'textToSummarize': log.text_to_summarize,
                'summarizedText': log.summarized_text,
                'timestamp': log.timestamp.isoformat()
            }
            for log in logs
        ]