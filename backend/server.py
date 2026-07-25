"""
server.py
---------
Main entry point for the EstateVision Flask backend.
"""

from flask import Flask
from flask_cors import CORS

from routes import routes
from util import load_saved_artifacts


def create_app():
    """
    Create and configure the Flask application.
    """

    app = Flask(__name__)

    # Enable CORS for React frontend
    CORS(app)

    # Load ML model before serving requests
    load_saved_artifacts()

    # Register API routes
    app.register_blueprint(routes)

    @app.route("/")
    def home():
        return {
            "message": "Welcome to EstateVision AI API",
            "status": "Running"
        }

    return app


app = create_app()


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )