import React, { useState, useEffect } from 'react';

interface ConfirmButtonProps {
    seatId: string;
    onConfirm: () => void;
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({ seatId, onConfirm }) => {
    const [confirmed, setConfirmed] = useState(false);

    useEffect(() => {
        setConfirmed(false);
    }, [seatId]);

    const handleClick = () => {
        onConfirm();
        setConfirmed(true);
        setTimeout(() => setConfirmed(false), 2000);
    };

    return (
        <button
            onClick={handleClick}
            style={{
                background: confirmed ? '#10b981' : 'white',
                color: confirmed ? 'white' : '#4f46e5',
                border: 'none',
                padding: '6px 16px',
                borderRadius: '20px',
                marginLeft: '8px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
            }}
        >
            {confirmed ? 'Confirmed!' : 'Confirm'}
        </button>
    );
};
