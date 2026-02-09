import React from 'react';
import { AlertCircle } from 'lucide-react';

const EventHighlight = ({ event, isActive, onHover, onLeave }) => {
    return (
        <div
            className={`event-item ${isActive ? 'active' : ''}`}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            style={{
                padding: '1rem',
                borderRadius: '0.5rem',
                backgroundColor: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                border: `1px solid ${isActive ? '#3b82f6' : 'rgba(255,255,255,0.05)'}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
            }}
        >
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <AlertCircle size={18} color={isActive ? '#3b82f6' : '#94a3b8'} style={{ marginTop: '2px' }} />
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{event.Date}</div>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{event.Event}</div>
                    {isActive && (
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                            {event.Description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventHighlight;
