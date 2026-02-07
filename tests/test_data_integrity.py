import os
import pandas as pd
import pytest

def test_raw_data_exists():
    """Check if the raw Brent oil price data exists."""
    path = "data/raw/BrentOilPrices.csv"
    assert os.path.exists(path), f"File not found at {path}"

def test_events_data_exists():
    """Check if the events.csv file exists."""
    path = "data/raw/events.csv"
    assert os.path.exists(path), f"File not found at {path}"

def test_brent_data_columns():
    """Verify columns in BrentOilPrices.csv."""
    df = pd.read_csv("data/raw/BrentOilPrices.csv")
    expected_cols = ["Date", "Price"]
    assert all(col in df.columns for col in expected_cols), "Columns do not match expected schema."

def test_events_data_columns():
    """Verify columns in events.csv."""
    df = pd.read_csv("data/raw/events.csv")
    expected_cols = ["Date", "Event", "Description"]
    assert all(col in df.columns for col in expected_cols), "Columns do not match expected schema."
