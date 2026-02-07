# Brent Oil Price Change Point Analysis

This project analyzes the impact of major political and economic events on Brent oil prices (1987-2022) using Bayesian Change Point detection.

## Project Overview
The oil market is characterized by extreme volatility. This project aims to:
- Identify key structural breaks in Brent oil price history.
- Quantify the impact of specific events (OPEC policy changes, conflicts, economic crises).
- Provide a data-driven dashboard for stakeholders to explore these correlations.

## Architecture
The project is structured as a monorepo:
- **`notebooks/`**: EDA and Bayesian modeling (PyMC).
- **`src/backend/`**: Flask API for serving analysis results.
- **`src/frontend/`**: React dashboard for visualization.
- **`data/`**: Raw and processed price data along with event timelines.

## Tech Stack
- **Analysis**: Python, PyMC, Pandas, NumPy, Statsmodels.
- **Backend**: Flask.
- **Frontend**: React, Vite, Recharts/Chart.js.
- **CI/CD**: GitHub Actions.

## Getting Started
(Detailed setup instructions will be added as each component is implemented.)

### Prerequisites
- Python 3.9+
- Node.js & npm

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   ```
2. Set up a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
