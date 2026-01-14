export interface VendorSeat {
    SeatNo: string | null;
    RowNo: string;
    SeatType: number; // 1 = Extra Legroom (assumed from requirements)
    AvailablityType: number; // 3 = Available
    Price: number;
    Currency: string;
    Code: string; // "NoSeat" means empty space
}

export interface VendorRow {
    Seats: VendorSeat[];
}

export interface VendorSegmentSeat {
    RowSeats: VendorRow[];
}

export interface VendorSeatDynamic {
    SegmentSeat: VendorSegmentSeat[];
}

export interface VendorResponse {
    SeatDynamic: VendorSeatDynamic[];
}

export interface SeatAttributes {
    exitRow: boolean;
    extraLegroom: boolean;
    nonReclining: boolean;
}

export interface InternalSeat {
    id: string; // "1A"
    row: number; // 1
    column: string; // "A"
    price: number;
    available: boolean;
    attributes: SeatAttributes;
}

export interface SeatMapConfig {
    seatSize: number;
    aisleSpacing: number;
    priceRanges: {
        min: number;
        max: number;
        label: string;
        color: string;
    }[];
}
