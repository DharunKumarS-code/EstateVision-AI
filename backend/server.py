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

    # Enable Cross-Origin Resource Sharing
    CORS(app)

    # Register API routes
    app.register_blueprint(routes)

    # Load ML model and feature columns
    load_saved_artifacts()

    return app


app = create_app()


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )