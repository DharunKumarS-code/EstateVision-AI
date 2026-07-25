"""
routes.py
---------
Defines API routes for the EstateVision house price prediction system.
"""

from flask import Blueprint, jsonify, request

from util import (
    get_location_names,
    predict_price,
)

# Create Blueprint
routes = Blueprint("routes", __name__)


@routes.route("/get_location_names", methods=["GET"])
def get_locations():
    """
    Return all available locations.
    """

    return jsonify({
        "locations": get_location_names()
    })


@routes.route("/predict_home_price", methods=["POST"])
def predict_home_price():
    """
    Predict house price.
    """

    try:

        data = request.get_json()

        if data is None:
            return jsonify({
                "error": "No JSON data received."
            }), 400

        required_fields = [
            "location",
            "sqft",
            "bath",
            "balcony",
            "bhk"
        ]

        for field in required_fields:
            if field not in data:
                return jsonify({
                    "error": f"Missing field: {field}"
                }), 400

        estimated_price = predict_price(
            location=data["location"],
            sqft=float(data["sqft"]),
            bath=int(data["bath"]),
            balcony=int(data["balcony"]),
            bhk=int(data["bhk"])
        )

        return jsonify({
            "estimated_price": estimated_price
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500