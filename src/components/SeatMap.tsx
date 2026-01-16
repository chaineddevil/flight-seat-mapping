import React, { useMemo, useState } from 'react';
import type { InternalSeat, SeatMapConfig, VendorResponse } from '../types';
import { transformSeatData } from '../utils';
import { Row } from './Row';
import { Header } from './Header';
import { Legend } from './Legend';
import { ConfirmButton } from './ConfirmButton';

interface SeatMapProps {
    vendorData: VendorResponse;
    config: SeatMapConfig;
}

export const SeatMap: React.FC<SeatMapProps> = ({ vendorData, config }) => {
    const [selectedSeatId, setSelectedSeatId] = useState<string | null>(null);

    // Transform data once
    const seats = useMemo(() => transformSeatData(vendorData), [vendorData]);

    // Group by row
    const rows = useMemo(() => {
        const rowMap = new Map<number, InternalSeat[]>();
        seats.forEach(seat => {
            if (!rowMap.has(seat.row)) {
                rowMap.set(seat.row, []);
            }
            rowMap.get(seat.row)!.push(seat);
        });

        // Sort rows numerically
        return Array.from(rowMap.keys()).sort((a, b) => a - b).map(rowNum => ({
            rowNumber: rowNum,
            seats: rowMap.get(rowNum)!.sort((a, b) => a.column.localeCompare(b.column))
        }));
    }, [seats]);

    const handleSeatClick = (seat: InternalSeat) => {
        console.log('Clicked seat:', seat);
        setSelectedSeatId(seat.id === selectedSeatId ? null : seat.id);
    };

    const selectedSeat = seats.find(s => s.id === selectedSeatId);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '40px 20px',
            background: '#1a1a1a',
            color: '#fff'
        }}>
            <Header />

            <div style={{
                position: 'relative',
                padding: '20px',
                background: '#242424',
                borderRadius: '16px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                maxWidth: '100%',
                overflowX: 'auto'
            }}>
                {/* Fuselage shape hint could go here, but simple container used for now */}

                {rows.map(row => (
                    <Row
                        key={row.rowNumber}
                        rowNumber={row.rowNumber}
                        seats={row.seats}
                        config={config}
                        onSeatClick={handleSeatClick}
                        selectedSeatId={selectedSeatId}
                    />
                ))}

                {(!rows || rows.length === 0) && (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
                        <p style={{ fontSize: '1.2rem', marginBottom: '8px' }}>⚠️</p>
                        <p>Seat map not available for this flight.</p>
                    </div>
                )}
            </div>

            <Legend config={config} />

            {/* Floating Selection Summary */}
            {selectedSeat && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#4f46e5',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '50px',
                    fontWeight: 600,
                    boxShadow: '0 10px 25px rgba(79, 70, 229, 0.4)',
                    zIndex: 100,
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center'
                }}>
                    <span>Seat {selectedSeat.id}</span>
                    <span style={{ opacity: 0.8 }}>|</span>
                    <span>${selectedSeat.price}</span>
                    <ConfirmButton
                        seatId={selectedSeat.id}
                        onConfirm={() => console.log('Confirmed:', selectedSeat.id)}
                    />
                </div>
            )}
        </div>
    );
};
