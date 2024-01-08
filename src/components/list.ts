interface _list {
    date: object[],
    start_time: string,
    end_time: string,
    opening_time: string
}
export const list:_list = {
    date: [
        { reservation_log: null },
        { reservation_log: ["2023-11-30 14:40,2023-11-30 16:40"] },
        { reservation_log: ["2023-11-30 14:40,2023-11-30 16:40"] },
        { reservation_log: ["2023-11-30 14:40,2023-11-30 16:40"] },
        { reservation_log: ["2023-11-30 11:40,2023-11-30 12:40", "2023-11-30 14:40,2023-11-30 16:40", "2023-11-30 14:50,2023-11-30 17:40"] },
    ],
    start_time: "2023-11-29",
    end_time: "2023-11-30",
    opening_time: "08:30-20:30"
}