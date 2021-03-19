import { AUTH_ACTIONS_TYPE } from "../actions/action";

const initialState = {
    userAuthData: {}
};

export const AuthReducer = (state=initialState, action)=> {
    switch (action.type) {
        case AUTH_ACTIONS_TYPE.LOGIN:
            return { ...state, userAuthData: action.userAuthData, }    
        default:
            return state;
    }
}