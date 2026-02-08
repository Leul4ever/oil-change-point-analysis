import pymc as pm
import numpy as np
import pandas as pd

class BrentOilChangePointModel:
    """
    A Bayesian Change Point Model for Brent Oil Price Analysis.
    Detects a single structural break in a time series.
    """
    
    def __init__(self, data):
        self.data = data
        self.model = None
        self.trace = None

    def build_model(self):
        """Builds the PyMC model for detecting a change point."""
        with pm.Model() as self.model:
            # Index for the switch point
            n_data = len(self.data)
            idx = np.arange(n_data)
            
            # Prior for the switch point (tau)
            tau = pm.DiscreteUniform("tau", lower=0, upper=n_data - 1)
            
            # Priors for the mean values before and after the switch
            # We use the empirical mean and std for informed priors
            mu_1 = pm.Normal("mu_1", mu=self.data.mean(), sigma=self.data.std())
            mu_2 = pm.Normal("mu_2", mu=self.data.mean(), sigma=self.data.std())
            
            # Prior for the standard deviation (assuming it stays roughly the same or has its own switch)
            sigma = pm.HalfNormal("sigma", sigma=self.data.std())
            
            # Use the index to switch between mu_1 and mu_2
            mu_ = pm.math.switch(tau >= idx, mu_1, mu_2)
            
            # Likelihood
            observation = pm.Normal("obs", mu=mu_, sigma=sigma, observed=self.data)
            
        return self.model

    def run_inference(self, draws=2000, tune=1000):
        """Runs MCMC sampling."""
        if self.model is None:
            self.build_model()
            
        with self.model:
            self.trace = pm.sample(draws=draws, tune=tune, return_inferencedata=True)
            
        return self.trace

    def get_summary(self):
        """Returns the summary of the posterior distribution."""
        if self.trace is None:
            raise ValueError("Inference has not been run yet.")
        import arviz as az
        return az.summary(self.trace)
