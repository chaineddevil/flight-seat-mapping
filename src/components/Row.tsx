import React from 'react';
import type { InternalSeat, SeatMapConfig } from '../types';
import { Seat } from './Seat';
import { getPriceColor } from '../utils';

interface RowProps {
    rowNumber: number;
    seats: InternalSeat[]; // Should be sorted by column
    config: SeatMapConfig;
    onSeatClick: (seat: InternalSeat) => void;
    selectedSeatId?: string | null;
}

export const Row: React.FC<RowProps> = ({ rowNumber, seats, config, onSeatClick, selectedSeatId }) => {
    // Columns order: A B C | aisle | D E F
    const columns = ['A', 'B', 'C', 'AISLE', 'D', 'E', 'F'];

    const renderColumn = (colName: string) => {
        if (colName === 'AISLE') {
            return <div key="aisle" style={{ width: config.aisleSpacing }} />;
        }

        const seat = seats.find(s => s.column === colName);

        if (!seat) {
            return <div key={colName} style={{ width: config.seatSize, height: config.seatSize }} />; // Empty space
        }

        return (
            <Seat
                key={seat.id}
                seat={seat}
                size={config.seatSize}
                color={getPriceColor(seat.price, config.priceRanges)}
                onClick={onSeatClick}
                isSelected={selectedSeatId === seat.id}
            />
        );
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10, gap: 5 }}>
            {/* Row Number Left */}
            <div style={{ width: 30, textAlign: 'center', color: '#888', fontWeight: 'bold' }}>{rowNumber}</div>

            {/* Seats */}
            {columns.map(renderColumn)}

            {/* Row Number Right */}
            <div style={{ width: 30, textAlign: 'center', color: '#888', fontWeight: 'bold' }}>{rowNumber}</div>
        </div>
    );
};
