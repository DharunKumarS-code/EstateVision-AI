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

    response = {
        "locations": get_location_names()
    }

    return jsonify(response)


@routes.route("/predict_home_price", methods=["POST"])
def predict_home_price():
    """
    Predict house price.
    """

    try:

        data = request.get_json()

        location = data["location"]
        sqft = float(data["sqft"])
        bath = int(data["bath"])
        balcony = int(data["balcony"])
        bhk = int(data["bhk"])

        estimated_price = predict_price(
            location=location,
            sqft=sqft,
            bath=bath,
            balcony=balcony,
            bhk=bhk,
        )

        return jsonify({
            "estimated_price": estimated_price
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 400