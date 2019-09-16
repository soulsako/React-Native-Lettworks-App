import * as Types from 'redux/actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case Types.LOGIN:
            return { authenticated: true, token: action.payload.token, loginType: action.payload.loginType }
        case Types.UNAUTHORISED:
            return { unauthorised: true }
        case Types.AUTHENTICATING:
            return { authenticating: true }
        case Types.LOGIN_ERROR:
            return { error: true }
        case Types.PRE_LOGOUT:
            return { ...state, loggingOut: true }
        case Types.CLEAR_AUTH:
            return {};
        case Types.LOGOUT:
            return null;
        default:
            return state;
    }
}