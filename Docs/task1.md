# Task 1: Laying the Foundation for Analysis

## 1. Analysis Workflow
This project follows a structured Bayesian data science workflow to analyze Brent oil prices.

### Step 1: Data Acquisition & Preprocessing
- **Source**: Daily Brent crude oil prices (May 20, 1987 – Sept 30, 2022).
- **Processing**: Convert dates to datetime objects, handle weekend/holiday gaps via forward-filling, and calculate daily log returns to stabilize variance.

### Step 2: Exploratory Data Analysis (EDA)
- **Trend Analysis**: Long-term upward trend with significant volatility spikes, particularly post-2000.
- **Stationarity Testing**: 
  - **Raw Price**: Non-stationary (ADF Statistic: -1.99, $p \approx 0.29$). This suggests modeling price levels directly may lead to spurious results.
  - **Log Returns**: Highly stationary (ADF Statistic: -16.43, $p \approx 2.5 \times 10^{-29}$). Returns are more suitable for identifying abrupt shifts in variance.
- **Volatility Pattern**: Significant clustering (Heteroskedasticity) observed during major events like the 1990 Gulf War, 2008 crisis, and 2020 pandemic.
- **Data Distribution**: Realized volatility shows "heavy tails," indicating that extreme events are more frequent than a Normal distribution would predict.

### Step 3: Bayesian Change Point Detection
- **Model Selection**: A "Switch Point" model using **PyMC**.
- **Priors**: 
  - Switch point $\tau \sim \text{DiscreteUniform}(0, T)$
  - Rate/Mean before $\mu_1 \sim \text{Normal}(\text{empirical mean}, 10)$
  - Rate/Mean after $\mu_2 \sim \text{Normal}(\text{empirical mean}, 10)$
- **Likelihood**: $\text{Price}_t \sim \text{Normal}(\mu_{\text{switch}}, \sigma)$

### Step 4: Model Inference & Diagnostics
- **Sampling**: Run NUTS (No-U-Turn Sampler) or Metropolis-Hastings.
- **Convergence**: Check $\hat{R} < 1.05$ and effective sample sizes.
- **Posterior Analysis**: Analyze the distribution of $\tau$ to identify the most probable dates for structural breaks.

### How Properties Inform Modeling
1. **Non-stationarity of Prices**: Forces us to use log returns for stability or include a trend-stationary component in the model.
2. **Volatility Clustering**: Suggests that a change point model should not only look for shifts in the mean ($\mu$) but also in the variance ($\sigma$).
3. **Bayesian Rationale**: Traditional frequentist tests (like Chow Test) require knowing the break date a priori. Bayesian models allow the date $\tau$ to be a latent parameter, providing a full probability distribution rather than a point estimate.

### Step 5: Interpretation & Communication
- **Event Mapping**: Compare $\tau$ posterior peaks with historical events in [events.csv](file:///d:/kifyaAi/oil-change-point-analysis/data/raw/events.csv).
- **Reporting**: Quantify the "before vs after" price shifts and volatility changes.

---

## 2. Model Understanding: Change Point Analysis
Change point models are designed to find **structural breaks** in a time series—points where the underlying generative process (mean, variance, or trend) changes abruptly.

- **Purpose**: Helps distinguish between "noise" and fundamental shifts in market dynamics caused by external shocks.
- **Expected Outputs**: 
  - **Probability Distribution of $\tau$**: Not just a single date, but a range of days with associated probabilities.
  - **Parameter Shifts**: Quantified changes in price levels (e.g., from an average of $20 to $40).
- **Limitations**: 
  - The "Single Change Point" model only finds the *most significant* break. Multiple breaks require hierarchical models or iterative fitting.
  - Does not inherently explain *why* a change happened; it only indicates *when*.

---

## 3. Assumptions and Limitations

### Assumptions
1. **Piecewise Stationarity**: We assume the data is stationary between change points.
2. **Normal Likelihood**: We assume price fluctuations (or returns) follow a normal distribution, though oil often exhibits "fat tails."

### Correlation vs. Causality
> [!IMPORTANT]
> A statistical change point identifies a **temporal correlation**. Proving that "Event X" caused "Price Shift Y" requires more than just overlapping dates. It requires:
> 1. **Temporal Precedence**: The event must occur before the shift.
> 2. **Theoretical Mechanism**: A logical economic path (e.g., supply disruption).
> 3. **Exclusion of Confounders**: Ensuring no other major event happened at the same time.

---

## 4. Communication Channels
1. **Government/Analyst Report (PDF)**: Detailed statistical findings and policy implications.
2. **Interactive Dashboard (Web)**: Allowing stakeholders to hover over events and see the "Before/After" price statistics.
3. **Internal Technical Wiki (GitHub Markdown)**: For reproducibility and peer review.

---

## 5. Key References
1. **Hamilton, J. D. (1989)**. "A New Approach to the Economic Analysis of Nonstationary Time Series and the Business Cycle." *Econometrica*.
2. **Perron, P. (2006)**. "Dealing with Structural Breaks." *Palgrave Handbook of Econometrics*.
3. **Salvatierra, I., & Patton, A. J. (2015)**. "Dynamic Copula Models for Large Realized Covariance Matrices." (Relevant for volatility modeling).
4. **PyMC Documentation**: "Bayesian Analysis with Python" - Switch Point models and MCMC sampling techniques.
5. **OPEC Annual Statistical Bulletin**: For official production and policy data.
