"""
preprocessing.py
----------------
Performs data cleaning on the raw Bengaluru House Price dataset.
"""

import pandas as pd


def load_data(file_path):
    """
    Load the raw dataset.
    """
    return pd.read_csv(file_path)


def clean_data(df):
    """
    Perform data cleaning.
    """

    # Drop unnecessary column
    df = df.drop("society", axis=1)

    # Fill missing balcony values with the median
    df["balcony"] = df["balcony"].fillna(df["balcony"].median())

    # Drop rows with missing important values
    df = df.dropna(subset=["location", "size", "bath"])

    # Remove leading and trailing spaces from location names
    df["location"] = df["location"].str.strip()

    return df


def save_data(df, output_path):
    """
    Save the cleaned dataset.
    """
    df.to_csv(output_path, index=False)
    print(f"Cleaned dataset saved to: {output_path}")


def main():

    input_file = "../../datasets/Bengaluru_House_Data.csv"
    output_file = "../../datasets/Bengaluru_House_Data_Cleaned.csv"

    print("Loading Dataset...")

    df = load_data(input_file)

    print(f"Original Shape : {df.shape}")

    df = clean_data(df)

    print(f"Cleaned Shape  : {df.shape}")

    save_data(df, output_file)

    print("\nPreprocessing Completed Successfully!")


if __name__ == "__main__":
    main()