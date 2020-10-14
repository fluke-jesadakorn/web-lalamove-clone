export const transportTypeList =
    [
        {
            type: "bike",
            imgUrl: "bike-1535509579156.png",
            logoUrl: "Bike-1553049458181-1553070994370.png",
            logoFilledUrl: "Bike-1552989364618.png",
            string: "มอเตอร์ไซค์",
            description: "50 x 50 x 50 cm",
            limitWeight: 20,
        },
        {
            type: "pickupTruck",
            imgUrl: "pickup-truck-1535509692623.png",
            logoUrl: "PickupTruck-1553049716013.png",
            logoFilledUrl: "PickupTruck-1553049118506.png",
            string: "กระบะตู้ทึบ",
            description: "50 x 50 x 50 cm",
            limitWeight: 1100,
        },
        {
            type: "suv",
            imgUrl: "hatchback-1535509593212.png",
            logoUrl: "SUV-1553673580108.png",
            logoFilledUrl: "SUV-1553673564827.png",
            string: "รถ 5 ประตู",
            description: "50 x 50 x 50 cm",
            limitWeight: 200,
        },
        {
            type: "fencePickup",
            imgUrl: "Fence-Pickup-1584927873795.png",
            logoUrl: "Fence-Pickup-1584927886753.png",
            logoFilledUrl: "Fence-Pickup-1584927858900.png",
            string: "กระบะโครงเหล็กสูง",
            description: "50 x 50 x 50 cm",
            limitWeight: 1100,
        },
    ]

export const optionalList =
    [
        {
            type: "bike",
            optional: [
                {
                    string: "บริการช่วยซื้อ (1 - 1,000 บาท)",
                    help: true,
                    addition: 25
                },
                {
                    string: "บริการช่วยซื้อ (1,001 - 2,000 บาท)",
                    help: true,
                    addition: 30
                },
                {
                    string: "ไป-กลับ",
                    addition: 75
                },
                {
                    string: "รถมีกล่องบรรจุอาหาร",
                    addition: "ฟรี"
                },
                {
                    string: "วางบิล เดินเอกสาร",
                    addition: 40
                },
                {
                    string: "ฝากส่ง (ไปรษณีย์, รถตู้)",
                    addition: 40
                },
                {
                    string: "บริการเก็บเงินค่าสินค้าปลายนทาง (COD)",
                    help: true,
                    addition: 40
                },
            ]
        },
        {
            type: "suv",
            optional: [
                {
                    string: "ไป-กลับ",
                    addition: 250
                },
                {
                    string: "บริการยกของโดยคนขับ",
                    addition: 100
                },
                {
                    string: "บริการเก็บเงินค่าสินค้าปลายนทาง (COD)",
                    help: true,
                    addition: 40
                },
                {
                    string: "บริการช่วยซื้อและยกของ (1-1,600 บาท)",
                    help: true,
                    addition: 120
                },
            ]
        },
        {
            type: "pickupTruck",
            optional: [
                {
                    string: "ไป-กลับ",
                    addition: 300
                },
                {
                    string: "ความยาวพิเศษ 2 เมตร (ปกติ 1.7 เมตร)",
                    addition: 100
                },
                {
                    string: "ความสูงพิเศษ 1.9 เมตร (ปกติ 1.7 เมตร)",
                    addition: 100
                },
                {
                    string: "บริการยกของโดยคนขับ",
                    addition: 150
                },
                {
                    string: "บริการยกของโดยคนขับและผู้ช่วยคนขับ 1 คน",
                    addition: 350
                },
                {
                    string: "บริการเก็บเงินค่าสินค้าปลายนทาง (COD)",
                    help: true,
                    addition: 40
                },
            ]
        },
        {
            type: "fencePickup",
            optional: [
                {
                    string: "ไป-กลับ",
                    addition: 300
                },
                {
                    string: "บริการยกของโดยคนขับ",
                    addition: 150
                },
                {
                    string: "บริการยกของโดยคนขับและผู้ช่วยคนขับ 1 คน",
                    addition: 350
                },
                {
                    string: "ความยาวพิเศษ 2 เมตร (ปกติ 1.7 เมตร)",
                    addition: 100
                },
                {
                    string: "ความสูงพิเศษ 1.9 เมตร (ปกติ 1.7 เมตร)",
                    addition: 100
                },
                {
                    string: "เพิ่มน้ำหนักไม่เกิน 4 ตัน (ปกติ 1.1 ตัน)",
                    addition: 40
                },
            ]
        }
    ]
