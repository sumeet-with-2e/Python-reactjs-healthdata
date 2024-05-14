from flask import Flask
from app.config import load_configurations, configure_logging
from .views import webhook_blueprint
from .whatsapp_quickstart import start_conversation
#from .create_empty_csv import create_empty_csv

def create_app():
    app = Flask(__name__)

    # Load configurations and logging settings
    load_configurations(app)
    configure_logging()
    # create_empty_csv()
    response = start_conversation()
    print(response.status_code)
    # Import and register blueprints, if any
    app.register_blueprint(webhook_blueprint)
    return app
