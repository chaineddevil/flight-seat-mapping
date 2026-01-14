import React, { useState } from 'react';
import type { VendorResponse } from '../types';

interface InputPanelProps {
    onGenerate: (data: VendorResponse) => void;
}

export const InputPanel: React.FC<InputPanelProps> = ({ onGenerate }) => {
    const [input, setInput] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = () => {
        try {
            setError(null);
            const parsed = JSON.parse(input);
            // Basic validation check
            if (!parsed.SeatDynamic) {
                throw new Error("Invalid Format: Missing 'SeatDynamic' array");
            }
            onGenerate(parsed);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div style={{
            width: '300px',
            background: '#242424',
            borderRight: '1px solid #444',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            boxSizing: 'border-box'
        }}>
            <h3 style={{ marginTop: 0 }}>Data Input</h3>
            <p style={{ fontSize: '0.8rem', color: '#888' }}>Paste full vendor JSON response here.</p>

            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{ "SeatDynamic": ... }'
                style={{
                    flex: 1,
                    background: '#1a1a1a',
                    color: '#ddd',
                    border: '1px solid #444',
                    borderRadius: '8px',
                    padding: '10px',
                    fontFamily: 'monospace',
                    fontSize: '0.8rem',
                    resize: 'none',
                    marginBottom: '10px'
                }}
            />

            {error && (
                <div style={{
                    color: '#ef4444',
                    fontSize: '0.8rem',
                    marginBottom: '10px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    padding: '8px',
                    borderRadius: '4px'
                }}>
                    Error: {error}
                </div>
            )}

            <button
                onClick={handleGenerate}
                style={{
                    backgroundColor: '#4f46e5',
                    color: 'white',
                }}
            >
                Generate Map
            </button>
        </div>
    );
};
