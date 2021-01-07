import { AUTH_ACTIONS_TYPE } from "../actions/action";

const initialState = {
    userAuthData: {}
};

export const AuthReucer = (state=initialState, action)=> {
    switch (action.type) {
        case AUTH_ACTIONS_TYPE.LOGIN:
            
            break;
    
        default:
            return state;
    }
}