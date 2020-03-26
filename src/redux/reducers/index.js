import { persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import auth from './auth';
// import basket from './basket';
// import buyNowBasket from './buyNowBasket';
import user from './user';
// import deliveryMethods from './deliveryMethods';
// import orders from './orders';
// import pages from './pages';
// import recentlyViewed from './recentlyViewed';
// import search from './search';
// import wishlist from './wishlist';
// import ui from './ui';

import { isDev } from 'config/functions';

const rootReducer = persistCombineReducers(
    {
        key: isDev() ? 'jd-marketplace-app' : 'jdplc',
        storage: AsyncStorage,
        timeout: 0
    }, {
        // facias,
        // home,
        // category,
        // product,
        auth,
        // basket,
        // buyNowBasket,
        user,
        // deliveryMethods,
        // orders,
        // pages,
        // recentlyViewed,
        // search,
        // wishlist,
        // ui
    }
);

export default rootReducer;
