"""
outlier_detection.py
--------------------
Removes outliers from the featured Bengaluru House Price dataset.
"""

import numpy as np
import pandas as pd


def load_data(file_path):
    """Load the featured dataset."""
    return pd.read_csv(file_path)


def remove_sqft_outliers(df):
    """
    Remove properties having less than 300 sqft per BHK.
    """
    return df[df["sqft_per_bhk"] >= 300].copy()


def group_rare_locations(df):
    """
    Group locations having 10 or fewer houses into 'other'.
    """
    location_stats = df.groupby("location")["location"].count()

    rare_locations = location_stats[location_stats <= 10].index

    df["location"] = df["location"].apply(
        lambda x: "other" if x in rare_locations else x
    )

    return df


def remove_pps_outliers(df):
    """
    Remove price_per_sqft outliers using mean ± standard deviation
    for each location.
    """
    df_out = pd.DataFrame()

    for location, location_df in df.groupby("location"):

        mean = np.mean(location_df.price_per_sqft)
        std = np.std(location_df.price_per_sqft)

        filtered_df = location_df[
            (location_df.price_per_sqft >= (mean - std))
            & (location_df.price_per_sqft <= (mean + std))
        ]

        df_out = pd.concat([df_out, filtered_df], ignore_index=True)

    return df_out


def remove_bhk_outliers(df):
    """
    Remove BHK outliers by comparing price_per_sqft with
    the previous BHK category within the same location.
    """
    exclude_indices = np.array([])

    for location, location_df in df.groupby("location"):

        bhk_stats = {}

        for bhk, bhk_df in location_df.groupby("bhk"):

            bhk_stats[bhk] = {
                "mean": np.mean(bhk_df.price_per_sqft),
                "std": np.std(bhk_df.price_per_sqft),
                "count": bhk_df.shape[0],
            }

        for bhk, bhk_df in location_df.groupby("bhk"):

            previous_bhk = bhk_stats.get(bhk - 1)

            if previous_bhk and previous_bhk["count"] > 5:

                exclude_indices = np.append(
                    exclude_indices,
                    bhk_df[
                        bhk_df.price_per_sqft < previous_bhk["mean"]
                    ].index.values,
                )

    return df.drop(exclude_indices, axis="index")


def save_data(df, output_path):
    """Save the final dataset."""
    df.to_csv(output_path, index=False)
    print(f"Final dataset saved to: {output_path}")


def main():

    input_file = "../../datasets/Bengaluru_House_Data_Featured.csv"
    output_file = "../../datasets/Bengaluru_House_Data_Final.csv"

    df = load_data(input_file)

    print("Input Shape :", df.shape)

    df = remove_sqft_outliers(df)
    print("After sqft_per_bhk filter :", df.shape)

    df = group_rare_locations(df)
    print("After grouping locations :", df.shape)

    df = remove_pps_outliers(df)
    print("After price_per_sqft outliers :", df.shape)

    df = remove_bhk_outliers(df)
    print("Final Shape :", df.shape)

    save_data(df, output_file)


if __name__ == "__main__":
    main()