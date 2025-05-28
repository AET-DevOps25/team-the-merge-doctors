from flask import Flask
from config import Config
from models.query_log import db

# Import the blueprint object
from controllers.api_controller import api

app = Flask(__name__)
app.config.from_object(Config)

# Init extensions
db.init_app(app)

# Register your API blueprint
app.register_blueprint(api)

# Initialize DB tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=False)
