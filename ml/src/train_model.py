"""
train_model.py
--------------
Trains and evaluates the house price prediction model.
Saves the trained model and feature columns for deployment.
"""

import json
import pickle

import pandas as pd
from sklearn.linear_model import Lasso, LinearRegression
from sklearn.model_selection import (
    GridSearchCV,
    ShuffleSplit,
    cross_val_score,
    train_test_split,
)
from sklearn.tree import DecisionTreeRegressor


def load_data(file_path):
    """Load the final dataset."""
    return pd.read_csv(file_path)


def prepare_data(df):
    """Prepare features for model training."""

    # Drop unnecessary columns
    df = df.drop(
        ["size", "price_per_sqft", "sqft_per_bhk"],
        axis=1,
    )

    # One-hot encode location
    dummies = pd.get_dummies(df["location"])

    # Remove dummy trap
    if "other" in dummies.columns:
        dummies = dummies.drop("other", axis=1)

    # Merge encoded columns
    df = pd.concat([df, dummies], axis=1)

    # Remove unused categorical columns
    df = df.drop(
        ["location", "availability", "area_type"],
        axis=1,
    )

    X = df.drop("price", axis=1)
    y = df["price"]

    return X, y


def split_data(X, y):
    """Split data into train and test sets."""

    return train_test_split(
        X,
        y,
        test_size=0.2,
        random_state=42,
    )


def train_model(X_train, y_train):
    """Train Linear Regression model."""

    model = LinearRegression()
    model.fit(X_train, y_train)

    return model


def evaluate_model(model, X_test, y_test):
    """Evaluate model performance."""

    score = model.score(X_test, y_test)

    print(f"\nR² Score : {score:.4f}")

    sample = X_test.iloc[[0]]
    prediction = model.predict(sample)

    print(f"Predicted Price : {prediction[0]:.2f}")
    print(f"Actual Price    : {y_test.iloc[0]:.2f}")


def cross_validate(X, y):
    """Perform Cross Validation."""

    cv = ShuffleSplit(
        n_splits=5,
        test_size=0.2,
        random_state=42,
    )

    scores = cross_val_score(
        LinearRegression(),
        X,
        y,
        cv=cv,
    )

    print("\nCross Validation Scores")
    print(scores)

    print(f"Average Score : {scores.mean():.4f}")


def find_best_model(X, y):
    """Find the best model using GridSearchCV."""

    algorithms = {

        "Linear Regression": {
            "model": LinearRegression(),
            "params": {}
        },

        "Lasso": {
            "model": Lasso(),
            "params": {
                "alpha": [1, 2],
                "selection": ["random", "cyclic"]
            }
        },

        "Decision Tree": {
            "model": DecisionTreeRegressor(),
            "params": {
                "criterion": [
                    "squared_error",
                    "friedman_mse"
                ],
                "splitter": [
                    "best",
                    "random"
                ]
            }
        }
    }

    results = []

    cv = ShuffleSplit(
        n_splits=5,
        test_size=0.2,
        random_state=42,
    )

    for name, config in algorithms.items():

        gs = GridSearchCV(
            config["model"],
            config["params"],
            cv=cv,
            return_train_score=False,
        )

        gs.fit(X, y)

        results.append({
            "Model": name,
            "Best Score": gs.best_score_,
            "Best Parameters": gs.best_params_,
        })

    result_df = pd.DataFrame(results)

    print("\nGrid Search Results")
    print(result_df)

    return result_df


def save_model(model):
    """Save trained model."""

    with open("../../ml/models/house_price_model.pkl", "wb") as f:
        pickle.dump(model, f)

    print("\nModel saved successfully.")


def save_columns(X):
    """Save feature columns."""

    columns = {
    "data_columns": X.columns.tolist()
}

    with open("../../ml/models/columns.json", "w") as f:
        json.dump(columns, f, indent=4)

    print("Columns saved successfully.")


def main():

    input_file = "../../datasets/Bengaluru_House_Data_Final.csv"

    print("Loading Dataset...")

    df = load_data(input_file)

    print("Dataset Shape :", df.shape)

    X, y = prepare_data(df)

    print("Feature Matrix :", X.shape)
    print("Target Vector  :", y.shape)

    X_train, X_test, y_train, y_test = split_data(X, y)

    model = train_model(X_train, y_train)

    evaluate_model(model, X_test, y_test)

    cross_validate(X, y)

    find_best_model(X, y)

    save_model(model)

    save_columns(X)

    print("\nTraining Pipeline Completed Successfully!")


if __name__ == "__main__":
    main()