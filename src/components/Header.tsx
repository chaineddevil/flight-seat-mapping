import React from 'react';

export const Header: React.FC = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0',
            borderBottom: '1px solid #444',
            marginBottom: '20px',
            width: '100%',
            maxWidth: '600px'
        }}>
            <div>
                <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Bengaluru → Mumbai</h2>
                <span style={{ fontSize: '0.9rem', color: '#888' }}>Airbus A320</span>
            </div>

            {/* Aircraft Nose Indicator */}
            <div style={{
                width: 0,
                height: 0,
                borderTop: '20px solid transparent',
                borderBottom: '20px solid transparent',
                borderLeft: '30px solid #555',
                borderRadius: '4px'
            }} title="Front of Aircraft" />
        </div>
    );
};
