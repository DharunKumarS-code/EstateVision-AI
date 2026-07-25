import json
import os
import pickle

import numpy as np
import pandas as pd

__data_columns = None
__model = None


def load_saved_artifacts():
    """
    Load the trained model and feature columns.
    """

    global __data_columns
    global __model

    print("Loading saved artifacts...")

    current_dir = os.path.dirname(os.path.abspath(__file__))

    model_path = os.path.join(
        current_dir,
        "model",
        "house_price_model.pkl"
    )

    columns_path = os.path.join(
        current_dir,
        "model",
        "columns.json"
    )

    # Load feature columns
    with open(columns_path, "r") as f:
        __data_columns = json.load(f)["data_columns"]

    # Load trained model
    with open(model_path, "rb") as f:
        __model = pickle.load(f)

    print("Artifacts loaded successfully!")


def get_location_names():
    """
    Return all available locations.
    """
    return __data_columns[4:]


def get_data_columns():
    """
    Return all feature columns.
    """
    return __data_columns


def predict_price(location, sqft, bath, balcony, bhk):
    """
    Predict the house price.
    """

    if __model is None or __data_columns is None:
        raise Exception("Model is not loaded!")

    # Create feature vector
    x = np.zeros(len(__data_columns))

    x[0] = sqft
    x[1] = bath
    x[2] = balcony
    x[3] = bhk

    # One-hot encode location
    location = location.strip().lower()

    location_map = {
        col.strip().lower(): col
        for col in __data_columns[4:]
    }

    actual_location = location_map.get(location)

    if actual_location:
        loc_index = __data_columns.index(actual_location)
        x[loc_index] = 1

    # Convert to DataFrame
    x_df = pd.DataFrame(
        [x],
        columns=__data_columns
    )

    prediction = __model.predict(x_df)[0]

    return round(float(prediction), 2)


if __name__ == "__main__":

    load_saved_artifacts()

    print("\n==============================")
    print("MODEL INFORMATION")
    print("==============================")

    print("Model Type:", type(__model).__name__)
    print("Total Features:", len(__data_columns))

    print("\nFirst 15 Columns:")

    for i, col in enumerate(__data_columns[:15]):
        print(f"{i}: {col}")

    print("\n==============================")
    print("First 10 Locations")
    print("==============================")

    print(get_location_names()[:10])

    print("\n==============================")
    print("Sample Prediction")
    print("==============================")

    predicted_price = predict_price(
        location="Whitefield",
        sqft=1200,
        bath=2,
        balcony=1,
        bhk=2
    )

    print(f"\nEstimated Price: {predicted_price} Lakhs")