import { AUTH_ACTIONS_TYPE } from "../actions/action";

const initialState = {
    userAuthData: {},
    calEventData: [],
    weekTimeTableData: ""
};

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_ACTIONS_TYPE.LOGIN:
            return { ...state, userAuthData: action.userAuthData, }
        case AUTH_ACTIONS_TYPE.CALENDAR_EVENT:
            return { ...state, calEventData: action.calEventData, }
        case AUTH_ACTIONS_TYPE.TIMETABLE_EVENT:
            return { ...state, weekTimeTableData: action.weekTimeTableData, }
        default:
            return state;
    }
}