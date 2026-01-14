import type { InternalSeat, VendorResponse, VendorSeat } from './types';

export const transformSeatData = (data: VendorResponse): InternalSeat[] => {
    const seats: InternalSeat[] = [];

    // Safely traverse the nested structure
    const segments = data.SeatDynamic;
    if (!segments || segments.length === 0) return [];

    // Assuming we only care about the first segment for this single-leg view
    const segment = segments[0]?.SegmentSeat;
    if (!segment || segment.length === 0) return [];

    // Assuming one cabin/deck for now, flatten all RowSeats
    segment.forEach(seg => {
        seg.RowSeats.forEach(row => {
            row.Seats.forEach(vendorSeat => {
                if (!isValidSeat(vendorSeat)) return;

                seats.push(mapToInternalSeat(vendorSeat));
            });
        });
    });

    return seats;
};

const isValidSeat = (seat: VendorSeat): boolean => {
    if (seat.Code === 'NoSeat') return false;
    if (!seat.SeatNo) return false;
    if (seat.RowNo === '0') return false;
    return true;
};

const mapToInternalSeat = (seat: VendorSeat): InternalSeat => {
    const row = parseInt(seat.RowNo, 10);
    const column = seat.SeatNo!.slice(-1);

    return {
        id: seat.Code || `${seat.RowNo}${seat.SeatNo}`,
        row: row,
        column: column,
        price: seat.Price,
        available: seat.AvailablityType === 3,
        attributes: {
            exitRow: false, // Cannot determine solely from vendor data per requirements, will be mostly purely visual or derived from config if needed. But requirements said "Do not assume... unless derived". User prompt says "SeatType === 1 -> extraLegroom".
            extraLegroom: seat.SeatType === 1,
            nonReclining: false // Default to false
        }
    };
};

export const getPriceColor = (price: number, ranges: { min: number; max: number; color: string }[]) => {
    const range = ranges.find(r => price >= r.min && price <= r.max);
    return range ? range.color : '#e5e7eb'; // Default gray
};
