# Task 1 Supplement: Analysis Foundation & Stakeholder Strategy

## 1. Structured Event Dataset Summary
The actual dataset is stored in `data/raw/events.csv`. It contains 15 curated events including:
- **Geopolitical Events**: Gulf War (1990), Iraq Invasion (2003), Libya Civil War (2011), Russia-Ukraine War (2022).
- **Economic Shocks**: Asian Financial Crisis (1997), Global Financial Crisis (2008), COVID-19 Pandemic (2020).
- **OPEC Decisions**: OPEC+ Production Cut (2016), OPEC-Russia Price War (2020).

## 2. Assumptions & Limitations
### Core Assumptions
- **Piecewise Stationarity**: We assume the underlying statistical process is stable between the detected change points.
- **Normal Distribution of Returns**: The model assumes log returns follow a normal likelihood, acknowledging that extreme market "fat tails" are common.

### Correlation vs. Causation
> [!CAUTION]
> **Statistical Significance != Causal Proof**
> Our analysis identifies a **temporal correlation**. A structural break occurring near a geopolitical event (e.g., a war) suggests an impact, but does not prove causality. To move toward causal inference, we would need to control for concurrent variables like global interest rates, storage levels, and non-OPEC production shifts which are outside the scope of this secondary time-series analysis.

## 3. Targeted Communication Strategy

| Stakeholder Group | Primary Format | Goal |
| :--- | :--- | :--- |
| **Investors & Traders** | **Investor Brief** (2-page PDF) | Focus on shift in mean price levels and risk/volatility changes post-event. |
| **Energy Policymakers** | **Policy Memo** (Briefing Note) | Focus on how supply shocks (OPEC/War) structurally altered market resilience. |
| **Operations Managers** | **Interactive Dashboard** (Streamlit/React) | provide real-time visualization of historical breaks vs. current price action. |
| **Technical Peers** | **GitHub Wiki / Notebooks** | Full transparency on MCMC diagnostics, priors, and code reproducibility. |
