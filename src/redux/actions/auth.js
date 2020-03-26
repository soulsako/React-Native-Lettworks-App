import api from 'services/api';
import * as Types from './types';

export function login(email, password) {
    return async dispatch => {
        dispatch({
            type: Types.AUTHENTICATING,
        });
        try {
            const { token, user, status } = await api.login({ email, password });
            // const response = await api.login({ email, password });
            dispatch({
                type: Types.LOGIN,
                payload: {
                  loginType: 'login',
                  token,
                  user
                }
            });
        } catch (error) {
            if (error.status === 401) {
                dispatch({
                    type: Types.UNAUTHORISED
                });
            } else {
                console.log('LOGIN ERROR', error);
                dispatch({
                    type: Types.LOGIN_ERROR
                });
            }
        }
    };
}

export function unauthorised() {
    return {
        type: Types.UNAUTHORISED,
    };
}

export function createAccount(data) { //{name: '', email: '', password: ''}
  //redux thunk middleware
    return async dispatch => {
        try {
            const { user, token } = await api.createAccount(data);
            dispatch({
              type: Types.LOGIN,
              payload: {
                loginType: 'register',
                token,
                user
              },
            });
        } catch (error) {
            throw error;
        }
    };
}

export function preLogout() {
    return {
        type: Types.PRE_LOGOUT
    };
}

export function logout() {
    return async dispatch => {
        dispatch(preLogout());
        setTimeout(() => {
            api.logout();
            dispatch({
                type: Types.LOGOUT
            });
        });
    };
}

export function clear() {
    return {
        type: Types.CLEAR_AUTH
    };
}
