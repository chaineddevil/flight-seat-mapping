import React from 'react';
import styles from './Seat.module.css';
import type { InternalSeat } from '../types';

interface SeatProps {
    seat: InternalSeat;
    size: number;
    color: string;
    onClick?: (seat: InternalSeat) => void;
    isSelected?: boolean;
}

export const Seat: React.FC<SeatProps> = ({ seat, size, color, onClick, isSelected }) => {
    const handleClick = () => {
        if (seat.available && onClick) {
            onClick(seat);
        }
    };

    return (
        <div
            className={`${styles.seatContainer} ${!seat.available ? styles.unavailable : ''} ${isSelected ? styles.selected : ''}`}
            style={{
                width: size,
                height: size,
                backgroundColor: seat.available ? color : undefined,
            }}
            onClick={handleClick}
            title={`Row ${seat.row} - Seat ${seat.column} (${seat.price})`}
        >
            {seat.available ? seat.column : 'X'}

            {seat.available && seat.attributes.extraLegroom && (
                <span className={styles.xlBadge}>XL</span>
            )}

            {seat.attributes.exitRow && (
                <span className={styles.exitRowMark} title="Exit Row" />
            )}
        </div>
    );
};
