import * as Types from './types';
import api from 'services/api';

export function addToWishlist(_product) {
    return async (dispatch) => {
        try {
            const product = await api.http({
                url: `/facias/${_product.facia}/products/${_product.ID}`
            });
            dispatch({
                type: Types.ADD_TO_WISHLIST,
                payload: product
            });
        } catch (ex) {
            console.log("ERROR FROM WISHLIST", ex);
        }
    }
}

export function removeFromWishlist(ID) {
    return {
        type: Types.REMOVE_FROM_WISHLIST,
        payload: ID
    };
}

export function updateWishlishItem(ID, updates) {
    return {
        type: Types.UPDATE_WISHLIST_ITEM,
        payload: { ID, updates }
    };
}

export function toggleItemInWishlist(product) {
    return (dispatch, getState) => {
        const item = getState().wishlist.find(p => p.ID === product.ID);
        return dispatch(item ? removeFromWishlist(product.ID) : addToWishlist(product));
    }
}