import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os
from statsmodels.tsa.stattools import adfuller

def load_and_preprocess_data(file_path):
    """Loads and preprocesses the Brent Oil Price data."""
    try:
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"Data file not found at {file_path}")
            
        df = pd.read_csv(file_path)
        
        # Standardize date format
        df['Date'] = pd.to_datetime(df['Date'], dayfirst=True)
        df = df.sort_values('Date').reset_index(drop=True)
        
        # Handle missing values (forward fill as markets are continuous)
        if df.isnull().values.any():
            df = df.ffill()
            
        return df
    except Exception as e:
        print(f"[ERROR] Loading data: {e}")
        return None

def perform_stationarity_test(series, name="Series"):
    """Performs Augmented Dickey-Fuller test."""
    print(f"\n--- Stationarity Test: {name} ---")
    try:
        result = adfuller(series.dropna().values)
        print(f'ADF Statistic: {result[0]:.4f}')
        print(f'p-value: {result[1]:.4e}')
        
        for key, value in result[4].items():
            print(f'   Critical Value ({key}): {value:.4f}')
            
        is_stationary = result[1] < 0.05
        print(f"[RESULT] {name} is {'stationary' if is_stationary else 'NOT stationary'}.")
        return is_stationary
    except Exception as e:
        print(f"[ERROR] Performing ADF test: {e}")
        return False

def plot_trends(df, output_path='data/plots'):
    """Generates and saves trend and volatility visualizations."""
    os.makedirs(output_path, exist_ok=True)
    sns.set_theme(style="whitegrid")
    
    # 1. Price Trend
    plt.figure(figsize=(12, 6))
    plt.plot(df['Date'], df['Price'], color='#1f77b4', linewidth=1.5)
    plt.title('Brent Crude Oil Price Trend (1987-2022)', fontsize=14, fontweight='bold')
    plt.xlabel('Year', fontsize=12)
    plt.ylabel('Price (USD/Barrel)', fontsize=12)
    plt.tight_layout()
    plt.savefig(f"{output_path}/price_trend.png", dpi=300)
    print(f"[INFO] Saved price trend plot to {output_path}/price_trend.png")
    
    # 2. Log Returns
    df['Log_Price'] = np.log(df['Price'])
    df['Log_Return'] = df['Log_Price'].diff()
    
    plt.figure(figsize=(12, 6))
    plt.plot(df['Date'], df['Log_Return'], color='#d62728', linewidth=0.5, alpha=0.7)
    plt.title('Brent Oil Daily Log Returns (Volatility Visualization)', fontsize=14, fontweight='bold')
    plt.xlabel('Year', fontsize=12)
    plt.ylabel('Log Return', fontsize=12)
    plt.tight_layout()
    plt.savefig(f"{output_path}/log_returns.png", dpi=300)
    print(f"[INFO] Saved log returns plot to {output_path}/log_returns.png")

def main():
    file_path = "data/raw/BrentOilPrices.csv"
    df = load_and_preprocess_data(file_path)
    
    if df is not None:
        # Basic Analysis
        print("[INFO] Data loaded successfully.")
        print(f"[INFO] Observations: {len(df)}")
        
        # Visualizations
        plot_trends(df)
        
        # Testing
        perform_stationarity_test(df['Price'], "Raw Price")
        
        df['Log_Price'] = np.log(df['Price'])
        df['Log_Return'] = df['Log_Price'].diff().dropna()
        perform_stationarity_test(df['Log_Return'], "Log Returns")

if __name__ == "__main__":
    main()
