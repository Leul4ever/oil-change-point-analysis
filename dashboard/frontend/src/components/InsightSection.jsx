import React from 'react';
import { Info, Briefcase } from 'lucide-react';

const InsightSection = ({ changePoint, activeEvent }) => {
    return (
        <div className="insight-section" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2.5rem',
            marginTop: '2.5rem',
            marginBottom: '2rem'
        }}>
            {/* Bayesian Impact Insights Card */}
            <div className="insight-card" style={{
                background: 'var(--bg-card)',
                backdropFilter: 'blur(12px)',
                padding: '1.5rem',
                borderRadius: '1.5rem',
                border: '1px solid var(--border)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <div style={{
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        backgroundColor: 'rgba(96, 165, 250, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Info size={16} color="#60a5fa" />
                    </div>
                    <h3 style={{ margin: 0, fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.05em', color: 'var(--text-main)', textTransform: 'uppercase' }}>
                        Bayesian Impact Insights
                    </h3>
                </div>

                <div className="terminal-output" style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    padding: '1.5rem',
                    borderRadius: '1rem',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                    fontSize: '0.85rem',
                    color: '#94a3b8',
                    lineHeight: '1.6'
                }}>
                    <div style={{ color: '#64748b', marginBottom: '0.5rem' }}>--- Task 2 Quantitative Impact Report ---</div>
                    <div>Detected Change Point Date: <span style={{ color: '#f1f5f9' }}>{changePoint?.date || 'N/A'}</span></div>
                    <div>Mean Price Before: <span style={{ color: '#f1f5f9' }}>${changePoint?.mu_before?.toFixed(2) || '0.00'}</span></div>
                    <div>Mean Price After: <span style={{ color: '#f1f5f9' }}>${changePoint?.mu_after?.toFixed(2) || '0.00'}</span></div>
                    <div>Percentage Change: <span style={{ color: changePoint?.percentage_change > 0 ? '#10b981' : '#ef4444' }}>
                        {changePoint?.percentage_change > 0 ? '+' : ''}{changePoint?.percentage_change?.toFixed(2) || '0.0'}%
                    </span></div>
                </div>
            </div>

            {/* Causal Breakdown Card */}
            <div className="insight-card" style={{
                background: 'var(--bg-card)',
                backdropFilter: 'blur(12px)',
                padding: '1.5rem',
                borderRadius: '1.5rem',
                border: '1px solid var(--border)',
                borderLeft: '4px solid var(--primary)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <div style={{
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        backgroundColor: 'rgba(96, 165, 250, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Briefcase size={16} color="var(--primary)" />
                    </div>
                    <h3 style={{ margin: 0, fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.05em', color: 'var(--text-main)', textTransform: 'uppercase' }}>
                        Causal Breakdown
                    </h3>
                </div>

                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                    <p>
                        Analysis for <strong style={{ color: 'var(--text-main)' }}>"{activeEvent?.Event || 'Selected Event'}"</strong> indicates a significant structural break.
                        Our model quantification suggests a probabilistic shift in market regime following this date.
                    </p>
                    <div style={{ marginTop: '1.25rem' }}>
                        <strong style={{ color: 'var(--text-main)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Context:</strong>
                        <p style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>
                            {activeEvent?.Description || 'Historical context of the geopolitical or economic event affecting supply/demand dynamics.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsightSection;
