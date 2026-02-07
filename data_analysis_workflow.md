# Data Analysis Workflow: Brent Oil Price Change Point Analysis

This document outlines the systematic process for analyzing Brent oil prices and identifying structural breaks.

## 1. Data Collection & Preprocessing
- **Source**: Historical Brent crude oil prices (1987-2022).
- **Cleaning**: Handle missing values (weekends/holidays) using interpolation or ffill.
- **Normalization**: Analyze both raw prices and log returns for stationarity.

## 2. Exploratory Data Analysis (EDA)
- **Time Series Visualization**: Plot overall trends and volatility.
- **Stationarity Testing**: Perform Augmented Dickey-Fuller (ADF) tests.
- **Seasonal Decomposition**: Identify trend, seasonality, and residuals.

## 3. Bayesian Change Point Modeling (PyMC)
- **Model Definition**: 
  - Switch point ($\tau$): Discrete uniform prior.
  - Parameters ($\mu_1, \mu_2$, $\sigma_1, \sigma_2$): Priors for before and after the switch.
- **Inference**: Use MCMC (Hamiltonian Monte Carlo) to sample the posterior.
- **Convergence**: Verify $\hat{R}$ values and trace plots.

## 4. Insight Generation
- **Event Correlation**: Mapping detected change points to the compiled `events.csv`.
- **Causal Inference Discussion**: Distinguish between statistical correlation and proven causality.
- **Quantitative Impact**: Calculate percentage changes and shift in volatility.

## 5. Reporting & Dashboard
- **Backend**: API to serve model parameters and detected dates.
- **Frontend**: Interactive timeline with event overlays.

## Assumptions & Limitations
- **Stationarity**: Assuming prices can be modeled as switching between stable regimes.
- **Causality**: Statistical change points do not *prove* an event caused the shift; they provide strong evidence for correlation.
- **Market Lag**: Events may have anticipated or delayed effects.
