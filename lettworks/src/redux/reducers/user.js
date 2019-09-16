import * as Types from 'redux/actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case Types.LOGIN:
            return { ...action.payload.user, status: {} }
        case Types.FETCH_USER:
            return { ...action.payload.user, status: { loaded: true } }
        case Types.CREATING_USER_ADDRESS:
            return { ...state, status: { creatingAddress: true } }
        case Types.USER_ERROR:
            return { ...state, status: { error: true } }
        case Types.CLEAR_ADDRESS:
            return { ...state, address: null }
        case Types.SELECT_ADDRESS:
            return { ...state, address: { ...action.payload } }
        case Types.FETCHING_USER:
            return { ...state, status: { loading: true } }
        case Types.LOGOUT:
            return null;
        default:
            return state;
    }
}