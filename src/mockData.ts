import type { VendorResponse, SeatMapConfig } from './types';

export const mockVendorResponse: VendorResponse = {
    "SeatDynamic": [
        {
            "SegmentSeat": [
                {
                    "RowSeats": [
                        {
                            "Seats": [
                                {
                                    "SeatNo": null,
                                    "RowNo": "0",
                                    "SeatType": 0,
                                    "AvailablityType": 0,
                                    "Price": 0,
                                    "Currency": "INR",
                                    "Code": "NoSeat"
                                }
                            ]
                        },
                        {
                            "Seats": [
                                {
                                    "SeatNo": null,
                                    "RowNo": "0",
                                    "SeatType": 0,
                                    "AvailablityType": 0,
                                    "Price": 0,
                                    "Currency": "INR",
                                    "Code": "NoSeat"
                                }
                            ]
                        },
                        {
                            "Seats": [
                                {
                                    "SeatNo": "A",
                                    "RowNo": "1",
                                    "SeatType": 1,
                                    "AvailablityType": 3,
                                    "Price": 3500,
                                    "Currency": "INR",
                                    "Code": "1A"
                                },
                                {
                                    "SeatNo": "C",
                                    "RowNo": "1",
                                    "SeatType": 2,
                                    "AvailablityType": 3,
                                    "Price": 3500,
                                    "Currency": "INR",
                                    "Code": "1C"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

export const config: SeatMapConfig = {
    seatSize: 40,
    aisleSpacing: 20,
    priceRanges: [
        { min: 0, max: 1000, label: 'Standard', color: '#e0e7ff' },
        { min: 1001, max: 5000, label: 'Premium', color: '#c7d2fe' }
    ]
};
