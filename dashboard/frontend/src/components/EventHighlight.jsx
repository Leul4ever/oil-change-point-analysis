import React from 'react';
import { AlertCircle } from 'lucide-react';

const EventHighlight = ({ event, isActive, onHover, onLeave, onClick }) => {
    return (
        <div
            className={`event-item ${isActive ? 'active' : ''}`}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            onClick={onClick}
            style={{
                padding: '1.25rem',
                borderRadius: '1rem',
                backgroundColor: isActive ? 'rgba(96, 165, 250, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${isActive ? 'rgba(96, 165, 250, 0.3)' : 'transparent'}`,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                marginBottom: '0.75rem'
            }}
        >
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: isActive ? 'rgba(96, 165, 250, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <AlertCircle size={16} color={isActive ? '#60a5fa' : '#64748b'} />
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        color: isActive ? '#60a5fa' : 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        {event.Date}
                    </div>
                    <div style={{
                        fontWeight: '600',
                        fontSize: '0.95rem',
                        color: 'var(--text-main)',
                        marginTop: '0.25rem'
                    }}>
                        {event.Event}
                    </div>
                    {isActive && (
                        <div style={{ marginTop: '0.5rem' }}>
                            <p style={{
                                margin: '0',
                                fontSize: '0.85rem',
                                color: 'var(--text-muted)',
                                lineHeight: '1.5'
                            }}>
                                {event.Description}
                            </p>
                            <div style={{
                                marginTop: '0.5rem',
                                fontSize: '0.7rem',
                                color: 'var(--primary)',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem'
                            }}>
                                CLICK FOR IMPACT ANALYSIS
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventHighlight;
