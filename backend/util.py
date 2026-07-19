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
    This function should be called once when the server starts.
    """

    global __data_columns
    global __model

    print("Loading saved artifacts...")

    current_dir = os.path.dirname(os.path.abspath(__file__))

    model_path = os.path.join(
        current_dir,
        "..",
        "ml",
        "models",
        "house_price_model.pkl"
    )

    columns_path = os.path.join(
        current_dir,
        "..",
        "ml",
        "models",
        "columns.json"
    )

    # Load feature names
    with open(columns_path, "r") as f:
        __data_columns = json.load(f)["data_columns"]

    # Load trained model
    with open(model_path, "rb") as f:
        __model = pickle.load(f)

    print("Artifacts loaded successfully!")


def get_location_names():
    """
    Return all available locations.
    The first four columns are:
        total_sqft
        bath
        balcony
        bhk

    Remaining columns are locations.
    """
    return __data_columns[4:]


def predict_price(location, sqft, bath, balcony, bhk):
    """
    Predict house price.

    Parameters
    ----------
    location : str
    sqft : float
    bath : int
    balcony : int
    bhk : int

    Returns
    -------
    float
        Predicted house price (in Lakhs)
    """

    if __model is None or __data_columns is None:
        raise Exception(
            "Artifacts are not loaded. Call load_saved_artifacts() first."
        )

    # Feature vector
    x = np.zeros(len(__data_columns))

    x[0] = sqft
    x[1] = bath
    x[2] = balcony
    x[3] = bhk

    # Case-insensitive location matching
    location_map = {
        col.strip().lower(): col
        for col in __data_columns[4:]
    }

    actual_location = location_map.get(location.strip().lower())

    if actual_location:
        loc_index = __data_columns.index(actual_location)
        x[loc_index] = 1

    # Convert to DataFrame (prevents sklearn feature-name warning)
    x_df = pd.DataFrame(
        [x],
        columns=__data_columns
    )

    prediction = __model.predict(x_df)[0]

    return round(float(prediction), 2)


def get_data_columns():
    """
    Return all feature columns.
    """
    return __data_columns


if __name__ == "__main__":

    load_saved_artifacts()

    print("\nFirst 10 Locations:")
    print(get_location_names()[:10])

    print("\nPredicted Price:")

    print(
        predict_price(
            location="Whitefield",
            sqft=1200,
            bath=2,
            balcony=1,
            bhk=2
        )
    )