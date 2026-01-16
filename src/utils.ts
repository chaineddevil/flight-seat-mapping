import type { InternalSeat, VendorResponse, VendorSeat } from './types';

export const transformSeatData = (data: VendorResponse): InternalSeat[] => {
    console.log('Transforming Seat Data. Input:', data);

    const seats: InternalSeat[] = [];

    // Safely traverse the nested structure
    const segments = data?.SeatDynamic;
    if (!segments || !Array.isArray(segments) || segments.length === 0) {
        console.warn('No seat segments found in data');
        return [];
    }

    // Process all segments (handling multiple flights/segments if present)
    segments.forEach((dynamicSegment, index) => {
        const rootSegmentSeats = dynamicSegment?.SegmentSeat;
        if (!rootSegmentSeats || !Array.isArray(rootSegmentSeats)) return;

        console.log(`Processing Segment ${index}, items:`, rootSegmentSeats.length);

        // Recursively find all RowSeats
        const collectRows = (items: any[]): any[] => {
            let collected: any[] = [];
            items?.forEach(item => {
                if (!item) return;

                // Case A: Direct RowSeats
                if (item.RowSeats && Array.isArray(item.RowSeats)) {
                    collected = collected.concat(item.RowSeats);
                }

                // Case B: Nested SegmentSeat
                if (item.SegmentSeat && Array.isArray(item.SegmentSeat)) {
                    collected = collected.concat(collectRows(item.SegmentSeat));
                }
            });
            return collected;
        };

        const allRows = collectRows(rootSegmentSeats);
        console.log(`Found ${allRows.length} rows in segment ${index}`);

        allRows.forEach(row => {
            if (!row?.Seats || !Array.isArray(row.Seats)) return;

            row.Seats.forEach((vendorSeat: VendorSeat) => {
                if (!isValidSeat(vendorSeat)) return;
                seats.push(mapToInternalSeat(vendorSeat));
            });
        });
    });

    console.log(`Total internal seats created: ${seats.length}`);
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
