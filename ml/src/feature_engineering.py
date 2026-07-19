"""
feature_engineering.py
----------------------
Creates new features for the Bengaluru House Price dataset.
"""

import pandas as pd


def load_data(file_path):
    """
    Load the cleaned dataset.
    """
    return pd.read_csv(file_path)


def extract_bhk(size):
    """
    Extract the BHK value from the 'size' column.

    Examples:
        '2 BHK' -> 2
        '4 Bedroom' -> 4
        '1 RK' -> 1
    """

    if pd.isna(size):
        return None

    try:
        return int(str(size).split()[0])
    except (ValueError, IndexError):
        return None


def convert_sqft_to_num(x):
    """
    Convert total_sqft values to numeric.

    Examples:
        '2100-2850' -> 2475.0
        '1200' -> 1200.0

    Returns None for invalid values.
    """

    if pd.isna(x):
        return None

    x = str(x).strip()

    if "-" in x:
        tokens = x.split("-", maxsplit=1)

        try:
            return (float(tokens[0]) + float(tokens[1])) / 2
        except ValueError:
            return None

    try:
        return float(x)
    except ValueError:
        return None


def engineer_features(df):
    """
    Create new engineered features.
    """

    print("Creating BHK feature...")
    df["bhk"] = df["size"].apply(extract_bhk)

    print("Converting total_sqft to numeric...")
    df["total_sqft"] = df["total_sqft"].apply(convert_sqft_to_num)

    # Remove rows where total_sqft could not be converted
    df = df.dropna(subset=["total_sqft"]).copy()

    print("Creating price_per_sqft feature...")
    df["price_per_sqft"] = (
        df["price"] * 100000
    ) / df["total_sqft"]

    print("Creating sqft_per_bhk feature...")
    df["sqft_per_bhk"] = (
        df["total_sqft"] / df["bhk"]
    )

    # Keep columns in a consistent order
    columns = [
        "area_type",
        "availability",
        "location",
        "size",
        "total_sqft",
        "bath",
        "balcony",
        "price",
        "bhk",
        "price_per_sqft",
        "sqft_per_bhk",
    ]

    df = df[columns]

    return df


def save_data(df, output_path):
    """
    Save the featured dataset.
    """

    df.to_csv(output_path, index=False)

    print(f"\nFeatured dataset saved to: {output_path}")


def main():

    input_file = "../../datasets/Bengaluru_House_Data_Cleaned.csv"
    output_file = "../../datasets/Bengaluru_House_Data_Featured.csv"

    print("Loading Dataset...")

    df = load_data(input_file)

    print(f"Input Shape  : {df.shape}")

    df = engineer_features(df)

    print(f"Output Shape : {df.shape}")

    save_data(df, output_file)

    print("\nFeature Engineering Completed Successfully!")


if __name__ == "__main__":
    main()