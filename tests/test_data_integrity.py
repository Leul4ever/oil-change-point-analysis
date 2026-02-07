import os
import pandas as pd
import pytest

# Constants for data paths
BRENT_DATA_PATH = "data/raw/BrentOilPrices.csv"
EVENTS_DATA_PATH = "data/raw/events.csv"

@pytest.mark.skipif(not os.path.exists(BRENT_DATA_PATH), reason="Raw Brent data not found (standard for CI)")
def test_raw_data_exists():
    """Check if the raw Brent oil price data exists."""
    assert os.path.exists(BRENT_DATA_PATH)

@pytest.mark.skipif(not os.path.exists(EVENTS_DATA_PATH), reason="Events data not found (standard for CI)")
def test_events_data_exists():
    """Check if the events.csv file exists."""
    assert os.path.exists(EVENTS_DATA_PATH)

@pytest.mark.skipif(not os.path.exists(BRENT_DATA_PATH), reason="Raw Brent data not found (standard for CI)")
def test_brent_data_columns():
    """Verify columns in BrentOilPrices.csv."""
    df = pd.read_csv(BRENT_DATA_PATH)
    expected_cols = ["Date", "Price"]
    assert all(col in df.columns for col in expected_cols), "Columns do not match expected schema."

@pytest.mark.skipif(not os.path.exists(EVENTS_DATA_PATH), reason="Events data not found (standard for CI)")
def test_events_data_columns():
    """Verify columns in events.csv."""
    df = pd.read_csv(EVENTS_DATA_PATH)
    expected_cols = ["Date", "Event", "Description"]
    assert all(col in df.columns for col in expected_cols), "Columns do not match expected schema."
