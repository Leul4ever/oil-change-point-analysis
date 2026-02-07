import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.stattools import adfuller

def analyze_brent_data(file_path):
    print(f"--- Loading Data: {file_path} ---")
    df = pd.read_csv(file_path)
    
    # 1. Basic Info
    print("\n[INFO] Basic Statistics:")
    print(df.describe())
    
    # 2. Date Conversion
    df['Date'] = pd.to_datetime(df['Date'], dayfirst=True)
    df = df.sort_values('Date')
    
    # 3. Check for Nulls
    print(f"\n[INFO] Missing Values: {df.isnull().sum().sum()}")
    
    # 4. Stationarity Test (ADF)
    print("\n[INFO] Augmented Dickey-Fuller Test (Raw Price):")
    result = adfuller(df['Price'].values)
    print(f'ADF Statistic: {result[0]}')
    print(f'p-value: {result[1]}')
    
    # 5. Log Returns
    print("\n[INFO] Augmented Dickey-Fuller Test (Log Returns):")
    df['Log_Price'] = np.log(df['Price'])
    df['Log_Return'] = df['Log_Price'].diff().dropna()
    result_log = adfuller(df['Log_Return'].dropna().values)
    print(f'ADF Statistic: {result_log[0]}')
    print(f'p-value: {result_log[1]}')
    
    if result_log[1] < 0.05:
        print("\n[RESULT] Log Returns are stationary.")
    else:
        print("\n[RESULT] Log Returns are NOT stationary.")

if __name__ == "__main__":
    file_path = "data/raw/BrentOilPrices.csv"
    analyze_brent_data(file_path)
