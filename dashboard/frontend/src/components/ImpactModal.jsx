import React from 'react';
import { X, TrendingUp, TrendingDown, Activity } from 'lucide-react';

const ImpactModal = ({ event, prices, onClose }) => {
    if (!event) return null;

    // Calculate impact: 30 days before vs 30 days after
    const eventDate = new Date(event.Date);
    const windowDays = 30;

    const beforePrices = prices.filter(p => {
        const d = new Date(p.Date);
        const diff = (eventDate - d) / (1000 * 60 * 60 * 24);
        return diff > 0 && diff <= windowDays;
    });

    const afterPrices = prices.filter(p => {
        const d = new Date(p.Date);
        const diff = (d - eventDate) / (1000 * 60 * 60 * 24);
        return diff >= 0 && diff <= windowDays;
    });

    const avgBefore = beforePrices.length > 0
        ? beforePrices.reduce((sum, p) => sum + p.Price, 0) / beforePrices.length
        : null;

    const avgAfter = afterPrices.length > 0
        ? afterPrices.reduce((sum, p) => sum + p.Price, 0) / afterPrices.length
        : null;

    const priceShift = (avgBefore && avgAfter) ? ((avgAfter - avgBefore) / avgBefore) * 100 : null;

    return (
        <div className="modal-overlay" onClick={onClose} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{
                background: 'var(--bg-card)',
                width: '90%',
                maxWidth: '600px',
                borderRadius: '1.5rem',
                border: '1px solid var(--border)',
                padding: '2.5rem',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                animation: 'slideUp 0.3s ease-out'
            }}>
                <button onClick={onClose} style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer'
                }}>
                    <X size={24} />
                </button>

                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            color: 'var(--primary)',
                            background: 'rgba(96, 165, 250, 0.1)',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '1rem',
                            textTransform: 'uppercase'
                        }}>
                            {event.Category}
                        </span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{event.Date}</span>
                    </div>
                    <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '800' }}>{event.Event}</h2>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', lineHeight: '1.6' }}>{event.Description}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="impact-stat" style={{
                        background: 'rgba(255,255,255,0.03)',
                        padding: '1.25rem',
                        borderRadius: '1rem',
                        border: '1px solid var(--border)'
                    }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.5rem' }}>
                            Avg Price Before (30d)
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                            {avgBefore ? `$${avgBefore.toFixed(2)}` : 'N/A'}
                        </div>
                    </div>
                    <div className="impact-stat" style={{
                        background: 'rgba(255,255,255,0.03)',
                        padding: '1.25rem',
                        borderRadius: '1rem',
                        border: '1px solid var(--border)'
                    }}>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '600', marginBottom: '0.5rem' }}>
                            Avg Price After (30d)
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                            {avgAfter ? `$${avgAfter.toFixed(2)}` : 'N/A'}
                        </div>
                    </div>
                </div>

                {priceShift !== null && (
                    <div style={{
                        marginTop: '1.5rem',
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        background: priceShift > 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            {priceShift > 0 ? <TrendingUp color="#10b981" /> : <TrendingDown color="#ef4444" />}
                            <div>
                                <div style={{ fontWeight: '800', fontSize: '1.25rem', color: priceShift > 0 ? '#10b981' : '#ef4444' }}>
                                    {Math.abs(priceShift).toFixed(1)}% {priceShift > 0 ? 'Increase' : 'Decrease'}
                                </div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Immediate Market Response</div>
                            </div>
                        </div>
                        <Activity size={32} style={{ opacity: 0.2 }} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImpactModal;
