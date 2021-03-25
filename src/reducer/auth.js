import { AUTH_ACTIONS_TYPE } from "../actions/action";

const initialState = {
    userAuthData: {},
    calEventData:[]
};

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_ACTIONS_TYPE.LOGIN:
            return { ...state, userAuthData: action.userAuthData, }
        case AUTH_ACTIONS_TYPE.CALENDAR_EVENT:
            return { ...state, calEventData: action.calEventData, }
        default:
            return state;
    }
}