import api from 'services/api';
import * as Types from './types';
// import adyenEncrypt from 'services/adyen';

import { logout } from './auth';

export function fetchCustomer() {
    return async (dispatch, getState) => {
        const customerObj = getState().customer;
        if (!customerObj || customerObj.isGuest) return;

        try {
            dispatch({
                type: Types.FETCHING_CUSTOMER
            });
            const customer = await api.http({
                url: `/customers/${customerObj.ID}`
            });
            dispatch({
                type: Types.FETCH_CUSTOMER,
                payload: customer
            });
        }
        catch (error) {
            if (error.status === 401) {
                console.log('401 from fetchCustomer so logout')
                dispatch(logout())
            }
        }
    }
}

export function updateUser(data) {
  console.log("updating user action");
    return async (dispatch, getState) => {
        // const userObj = getState().user;
        // const authObj = getState().auth;
        const { user, auth } = getState();
        if (!user || !auth.token) return;
        //updating database
        try {
            const user = await api.http({
                endpoint: 'updateme',
                method: 'patch',
                type: 'users',
                data, 
                token: auth.token
            });
            console.log('====================================');
            console.log(user);
            console.log('====================================');
            // console.log("User updated and to be added to store: ", user);
            //Updating store
            dispatch({
                type: Types.FETCH_USER,
                payload: user
            });
        } catch (ex) {
            if (ex.status === 401) return dispatch(logout());
            throw ex;
        }
    }
}

export function createAddress(data) {
    return (dispatch, getState) => {
        const customerObj = getState().customer;
        if (!customerObj || customerObj.isGuest) return;

        dispatch({
            type: Types.CREATING_CUSTOMER_ADDRESS
        });

        return api.http({
            url: `/customers/${customerObj.ID}/addresses`,
            method: 'post',
            data
        }).then(customer => {
            dispatch({
                type: Types.FETCH_CUSTOMER,
                payload: customer
            })
        }).catch(ex => {
            dispatch({
                type: Types.CUSTOMER_ERROR
            })
            if (ex.status === 401) return dispatch(logout());
            console.log(ex, 'Error from create address');
            throw ex;
        })
    }
}

export function addPayment(data) {
    return async (dispatch, getState) => {
        try {
            const customerObj = getState().customer;
            if (!customerObj || customerObj.isGuest) return;
            const customer = await api.http({
                url: `/customers/${customerObj.ID}/paymentcards`,
                method: 'POST',
                data
            });
            dispatch({
                type: Types.FETCH_CUSTOMER,
                payload: customer
            });
        } catch (ex) {
            if (ex.status === 401) return dispatch(logout());
            console.log(ex, 'Error from add payment');
            throw ex;
        }
    }
}

export function deleteAddress(addressID) {
    return async (dispatch, getState) => {
        try {
            const customerObj = getState().customer;
            if (!customerObj || customerObj.isGuest) return;
            const customer = await api.http({
                url: `/customers/${customerObj.ID}/addresses/${addressID}`,
                method: 'DELETE'
            });
            dispatch({
                type: Types.FETCH_CUSTOMER,
                payload: customer
            });
        } catch (ex) {
            if (ex.status === 401) return dispatch(logout());
            console.log(ex, 'Error from delete address');
            throw ex;
        }
    }
}

export function updateAddress(addressID, data) {
    return async (dispatch, getState) => {
        try {
            const customerObj = getState().customer;
            if (!customerObj || customerObj.isGuest) return;
            const customer = await api.http({
                url: `/customers/${customerObj.ID}/addresses/${addressID}`,
                method: 'PUT',
                data
            });
            dispatch({
                type: Types.FETCH_CUSTOMER,
                payload: customer
            });
        } catch (ex) {
            if (ex.status === 401) return dispatch(logout());
            console.log(ex, 'Error from put address');
            throw ex;
        }
    }
}

export function deletePaymentCard(cardID) {
    return async (dispatch, getState) => {
        try {
            const customerObj = getState().customer;
            if (!customerObj || customerObj.isGuest) return;
            const customer = await api.http({
                url: `/customers/${customerObj.ID}/paymentcards/${cardID}`,
                method: 'DELETE'
            });
            dispatch({
                type: Types.FETCH_CUSTOMER,
                payload: customer
            });
        } catch (ex) {
            if (ex.status === 401) return dispatch(logout());
            console.log(ex, 'Error from delete payment card');
            throw ex;
        }
    }
}

export function updatePaymentCard(cardID, data) {
    return async (dispatch, getState) => {
        try {
            const customerObj = getState().customer;
            if (!customerObj || customerObj.isGuest) return;
            const customer = await api.http({
                url: `/customers/${customerObj.ID}/paymentcards/${cardID}`,
                method: 'PUT',
                data
            });
            dispatch({
                type: Types.FETCH_CUSTOMER,
                payload: customer
            });
        } catch (ex) {
            if (ex.status === 401) return dispatch(logout());
            console.log(ex, 'Error from put address');
            throw ex;
        }
    }
}