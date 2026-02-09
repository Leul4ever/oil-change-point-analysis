import React from 'react';

const MetricsCard = ({ title, value, subValue, color }) => {
    return (
        <div className="card" style={{ borderTop: `2px solid ${color}` }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    {title}
                </span>
                <div style={{
                    fontSize: '2rem',
                    fontWeight: '800',
                    color: 'var(--text-main)',
                    lineHeight: '1'
                }}>
                    {value}
                </div>
                <div style={{
                    color: color,
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                }}>
                    {subValue}
                </div>
            </div>
        </div>
    );
};

export default MetricsCard;
