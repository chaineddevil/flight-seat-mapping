import React from 'react';
import type { SeatMapConfig } from '../types';

interface LegendProps {
    config: SeatMapConfig;
}

export const Legend: React.FC<LegendProps> = ({ config }) => {
    return (
        <div style={{
            marginTop: '30px',
            padding: '20px',
            background: '#2a2a2a',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '600px'
        }}>
            <h3 style={{ marginTop: 0, fontSize: '1rem', marginBottom: '15px' }}>Legend</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {/* Availability / Blocked */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: 16, height: 16, background: '#f3f4f6', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#888' }}>X</div>
                    <span style={{ fontSize: '0.9rem' }}>Unavailable</span>
                </div>

                {/* Exit Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: 16, height: 16, border: '1px solid #666', borderRadius: 4, position: 'relative' }}>
                        <div style={{ position: 'absolute', bottom: 1, left: 1, width: 4, height: 4, background: '#ef4444', borderRadius: '50%' }}></div>
                    </div>
                    <span style={{ fontSize: '0.9rem' }}>Exit Row</span>
                </div>

                {/* Extra Legroom */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: 16, height: 16, border: '1px solid #666', borderRadius: 4, position: 'relative' }}>
                        <span style={{ position: 'absolute', top: -3, right: -3, background: '#f59e0b', fontSize: '6px', padding: '1px 2px', borderRadius: 2, color: 'white' }}>XL</span>
                    </div>
                    <span style={{ fontSize: '0.9rem' }}>Extra Legroom</span>
                </div>

                {/* Prices */}
                {config.priceRanges.map((range, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: 16, height: 16, background: range.color, borderRadius: 4 }}></div>
                        <span style={{ fontSize: '0.9rem' }}>{range.label} (${range.min}-${range.max})</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
