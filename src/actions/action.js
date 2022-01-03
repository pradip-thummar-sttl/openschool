export const AUTH_ACTIONS_TYPE = {
    LOGIN: 'LOGIN',
    CALENDAR_EVENT:"CALENDAR_EVENT",
    TIMETABLE_EVENT:"TIMETABLE_EVENT"
}

export function setUserAuthData(userAuthData) {
    return { type: AUTH_ACTIONS_TYPE.LOGIN, userAuthData }
}
export function setCalendarEventData(calEventData) {
    return { type: AUTH_ACTIONS_TYPE.CALENDAR_EVENT, calEventData }
}
export function setTimeTableWeekEventData(weekTimeTableData) {
    return { type: AUTH_ACTIONS_TYPE.TIMETABLE_EVENT, weekTimeTableData }
}