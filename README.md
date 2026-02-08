# 🛢️ Brent Oil Price Change Point Analysis

[![Python Version](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A sophisticated Bayesian analysis project designed to detect structural breaks in historical Brent crude oil prices and correlate them with major geopolitical and economic events.

---

## 🌟 Executive Summary
The global oil market is a complex ecosystem influenced by geopolitics, economic cycles, and technological shifts. This project utilizes **Bayesian Change Point Detection** via **PyMC** to identify when the market's underlying regime shifted significantly. By mapping these statistical breaks to historical events, we provide actionable insights for investors and policymakers.

## 🚀 Key Features
- **Statistical Rigor**: Uses MCMC sampling to identify latent change points.
- **Interactive EDA**: Detailed notebooks exploring data trends, stationarity (ADF Test), and volatility.
- **Data-Driven Event Mapping**: Correlates structural breaks with a curated dataset of global shocks.
- **Modular Codebase**: Clean, production-ready Python modules for data processing and analysis.

## 📂 Project Structure
```text
oil-change-point-analysis/
├── data/
│   ├── raw/               # BrentOilPrices.csv, events.csv
│   ├── processed/         # Model outputs and cleaned data
│   └── plots/             # Generated visualizations
├── notebooks/             # Step-by-step EDA and Modeling
├── src/
│   ├── analysis/          # Model core logic
│   ├── backend/           # Flask API
│   └── frontend/          # React Dashboard
├── scripts/               # Automation and one-off utilities
├── Docs/                  # Project documentation and Task reports
├── requirements.txt       # Dependency list
└── README.md              # Project portal
```

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.9 or higher
- (Recommended) Anaconda or Miniconda

### 1. Clone & Environment
```bash
git clone https://github.com/your-repo/oil-change-point-analysis.git
cd oil-change-point-analysis
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Run Initial Analysis
```bash
python scripts/initial_eda.py
```

## 📊 Analysis Workflow
1. **Data Ingestion**: Standardizing date formats and handling gaps.
2. **Exploratory Analysis**: Testing for stationarity and visualizing volatility clustering.
3. **Change Point Detection**: Running PyMC models to find $\tau$ (the switch point).
4. **Insight Generation**: Mapping detected dates to historical events in `events.csv`.

## 🛡️ License
Distributed under the MIT License. See `LICENSE` for more information.

---
*Created as part of the Data Analysis and Bayesian Modeling Portfolio.*
