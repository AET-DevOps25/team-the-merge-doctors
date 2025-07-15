# from flask import Flask
# from config import Config
# from database import db

# # Import the blueprint object
# from controllers.api_controller import api

# app = Flask(__name__)
# app.config.from_object(Config)

# # Init extensions
# db.init_app(app)

# # Register your API blueprint
# app.register_blueprint(api)

# # Initialize DB tables
# with app.app_context():
#     db.create_all()

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001, debug=False)

from flask import Flask
from flask_restx import Api
from config import Config
from database import db

# Import the namespace object
from controllers.api_controller import api as genai_namespace

app = Flask(__name__)
app.config.from_object(Config)

# Init extensions
db.init_app(app)

# Initialize Flask-RESTX API
api = Api(app, title='GenAI Service', version='1.0', description='API for text summarization')

# Register your namespace
api.add_namespace(genai_namespace, path='/api/genai')

# Initialize DB tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=False)