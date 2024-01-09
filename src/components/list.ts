interface _list {
    date: object[],
    start_time: string,
    end_time: string,
    opening_time: string
}
export const list:_list = {
    date: [
        { reservation_log: null },
        { reservation_log: ["2024-1-8 14:40,2024-1-8 16:40"] },
        { reservation_log: ["2024-1-8 14:40,2024-1-8 16:40"] },
        { reservation_log: ["2024-1-8 14:40,2024-1-8 16:40"] },
        { reservation_log: ["2024-1-8 11:40,2024-1-8 12:40", "2024-1-8 14:40,2024-1-8 16:40", "2024-1-8 14:50,2024-1-8 17:40"] },
    ],
    start_time: "2024-1-2",
    end_time: "2024-2-21",
    opening_time: "08:30-20:30"
}