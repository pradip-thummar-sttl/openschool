export const AUTH_ACTIONS_TYPE = {
    LOGIN: 'LOGIN'
}

export function setUserAuthData(userAuthData) {
    return { type: AUTH_ACTIONS_TYPE.LOGIN, userAuthData }
}