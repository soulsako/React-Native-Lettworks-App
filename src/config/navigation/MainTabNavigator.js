import React from 'react';
import { View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { TabBarIcon, LaunchIcon, BagIcon, NavBackArrow } from 'atoms/icons';

import BottomTabBar from 'components/BottomTabBar';

// import ShopScreen from 'screens/Shop/ShopScreen';
// import ProductScreen from 'screens/Shop/ProductScreen';
// import CategoriesScreen from 'screens/Shop/CategoriesScreen';
// import ListingScreen from 'screens/Shop/ListingScreen';
// import SearchScreen from 'screens/Shop/SearchScreen';
// import ProductInfoScreen from 'screens/Shop/ProductTabs/ProductInfoScreen';
// import SizeGuideScreen from 'screens/Shop/ProductTabs/SizeGuideScreen';
// import DeliveryTabScreen from 'screens/Shop/ProductTabs/DeliveryTabScreen';
// import ReturnsTabScreen from 'screens/Shop/ProductTabs/ReturnsTabScreen';
// import ReviewsTabScreen from 'screens/Shop/ProductTabs/ReviewsTabScreen';

// import BagScreen from 'screens/Bag/BagScreen';
// import BagSummaryScreen from 'screens/Bag/BagSummaryScreen';
// import CheckoutScreen from 'screens/Bag/CheckoutScreen';
// import AddressSelectScreen from 'screens/Bag/AddressSelectScreen';
// import DeliveryScreen from 'screens/Bag/DeliveryScreen';
// import DeliveryStoreScreen from 'screens/Bag/DeliveryStoreScreen';
// import DeliveryMethodsScreen from 'screens/Bag/DeliveryMethodsScreen';
// import OpeningHoursScreen from 'screens/Bag/OpeningHoursScreen';
// import ConfirmationScreen from 'screens/Bag/ConfirmationScreen';
// import PaymentScreen from 'screens/Bag/PaymentScreen';
// import PaymentTypesScreen from 'screens/Bag/PaymentTypesScreen';
// import ProductView from 'screens/Bag/ProductView';

// import LaunchListingScreen from 'screens/Launch/LaunchScreen';
// import LaunchProductScreen from 'screens/Launch/LaunchProductScreen';

// import DiscoverScreen from 'screens/Discover/DiscoverScreen';
// import DiscoverListingScreen from 'screens/Discover/DiscoverListingScreen';

// import BrandsScreen from 'screens/Brands/BrandsScreen';
// import AllBrandsScreen from 'screens/Brands/AllBrandsScreen';

// import WishlistScreen from 'screens/Wishlist/WishlistScreen';

// import AccountScreen from 'screens/Account/AccountScreen';
// import SecurityScreen from 'screens/Account/SecurityScreen';
// import PaymentCardScreen from 'screens/Account/PaymentCards/CreatePaymentScreen';
// import AddressFinderScreen from 'screens/Account/Addresses/AddressFinderScreen';
// import CreateAddressScreen from 'screens/Account/Addresses/CreateAddressScreen';
// import OrdersScreen from 'screens/Account/Orders/OrdersScreen';
// import OrderScreen from 'screens/Account/Orders/OrderScreen';
// import AddressesScreen from 'screens/Account/Addresses/AddressesScreen';
// import PaymentCardsScreen from 'screens/Account/PaymentCards/PaymentCardsScreen';
// import MyDetailsScreen from 'screens/Account/MyDetailsScreen';
// import CreatePaymentScreen from 'screens/Account/PaymentCards/CreatePaymentScreen';
// import TermsScreen from 'screens/Account/TermsScreen';
// import PreferencesScreen from 'screens/Account/PreferencesScreen';
// import BuyNowScreen from 'screens/Account/BuyNowScreen';

import HomeScreen from 'screens/Home/HomeScreen';
import FindScreen from 'screens/Find/FindScreen';
import AppointmentScreen from 'screens/Appointment/AppointmentScreen';
import ProfileScreen from 'screens/Profile/ProfileScreen';

const defaultNavigationOptions = {
    headerTitleStyle: {
        fontFamily: 'Bold',
        fontWeight: '200',
        fontSize: 15,
    },
    headerBackTitle: null,
    headerBackImage: <NavBackArrow mainNav />,
};

// const SharedScreens = {
//     Page: PageScreen,
//     LandingPage: LandingPageScreen,
//     Listing: ListingScreen,
//     Product: ProductScreen,
//     ProductInfo: ProductInfoScreen,
//     SizeGuide: SizeGuideScreen,
//     DeliveryTab: DeliveryTabScreen,
//     ReturnsTab: ReturnsTabScreen,
//     ReviewsTab: ReviewsTabScreen,
//     Checkout: CheckoutScreen,
//     Confirmation: ConfirmationScreen,
//     DiscoverListing: DiscoverListingScreen,
// };

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
        // ...SharedScreens,
        // SubCategory: SubCategoryScreen,
        // Delivery: DeliveryScreen,
        // DeliveryStore: DeliveryStoreScreen,
        // OpeningHours: OpeningHoursScreen,
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions,
        headerLayoutPreset: 'center',
    }
);

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarComponent: BottomTabBar,
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="stores" />,
};

const FindStack = createStackNavigator(
    {
        Find: FindScreen,
        // Landing: CategoriesScreen,
        // SubCategory: SubCategoryScreen,
        // ...SharedScreens,
    },
    {
        initialRouteName: 'Find',
        defaultNavigationOptions,
        headerLayoutPreset: 'center',
    }
);

FindStack.navigationOptions = {
    tabBarLabel: 'Find',
    tabBarComponent: BottomTabBar,
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="shop" />,
};

// const SettingsStack = createStackNavigator(
//     {
//         ...SharedScreens,
//         Settings: AccountScreen,
//         Security: SecurityScreen,
//         Orders: OrdersScreen,
//         Order: OrderScreen,
//         AddressSelect: AddressSelectScreen,
//         Addresses: AddressesScreen,
//         AddressFinder: AddressFinderScreen,
//         CreateAddress: CreateAddressScreen,
//         MyDetails: MyDetailsScreen,
//         Payment: PaymentScreen,
//         PaymentCards: PaymentCardsScreen,
//         Delivery: DeliveryScreen,
//         DeliveryStore: DeliveryStoreScreen,
//         OpeningHours: OpeningHoursScreen,
//         Terms: TermsScreen,
//         CreatePaymentCard: CreatePaymentScreen,
//         Preferences: PreferencesScreen,
//         BuyNow: BuyNowScreen,
//         Wishlist: WishlistScreen,
//     },
//     {
//         initialRouteName: 'Settings',
//         defaultNavigationOptions,
//         headerLayoutPreset: 'center',
//     }
// );

// SettingsStack.navigationOptions = {
//     tabBarLabel: 'Account',
//     tabBarComponent: BottomTabBar,
//     tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="account" />,
//     tabBarButtonComponent: () => <View />,
// };

const AppointmentStack = createStackNavigator(
    {
      Appointment: AppointmentScreen,
      // AllBrands: AllBrandsScreen,
      // ...SharedScreens,
    },
    {
      initialRouteName: "Appointment",
      defaultNavigationOptions,
      headerLayoutPreset: 'center'
    }
);

AppointmentStack.navigationOptions = {
    tabBarLabel: 'Appointments',
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="appointment" />,
};

const ProfileStack = createStackNavigator(
    {
        Profile: ProfileScreen,
        // ProductView: ProductView,
        // ...SharedScreens,
    },
    {
      initialRouteName: "Profile",
      defaultNavigationOptions,
      headerLayoutPreset: 'center'
    }
);

ProfileStack.navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="profile" />,
};

// const LaunchStack = createStackNavigator(
//     {
//         Launch: LaunchListingScreen,
//         LaunchProduct: LaunchProductScreen,
//     },
//     {
//         defaultNavigationOptions,
//         headerLayoutPreset: 'center',
//     }
// );

// LaunchStack.navigationOptions = {
//     tabBarLabel: 'Launches',
//     tabBarIcon: ({ focused }) => <LaunchIcon focused={focused} name="launch" />,
// };

// const BagStack = createStackNavigator(
//     {
//         ...SharedScreens,
//         Bag: BagScreen,
//         BagSummary: BagSummaryScreen,
//         AddressSelect: AddressSelectScreen,
//         Delivery: DeliveryScreen,
//         DeliveryStore: DeliveryStoreScreen,
//         DeliveryMethods: DeliveryMethodsScreen,
//         OpeningHours: OpeningHoursScreen,
//         Payment: PaymentScreen,
//         PaymentTypes: PaymentTypesScreen,
//         PaymentCard: PaymentCardScreen,
//         AddressFinder: AddressFinderScreen,
//         CreateAddress: CreateAddressScreen,
//         Confirmation: ConfirmationScreen,
//         ProductView: ProductView,
//     },
//     {
//         initialRouteName: 'Bag',
//         defaultNavigationOptions,
//         headerLayoutPreset: 'center',
//     }
// );

// BagStack.navigationOptions = {
//     tabBarLabel: 'Bag',
//     tabBarComponent: BottomTabBar,
//     tabBarIcon: ({ focused }) => <BagIcon focused={focused} />,
//     tabBarButtonComponent: () => <View />,
// };

// const SearchStack = createStackNavigator(
//     {
//         Search: SearchScreen,
//         Product: ProductScreen,
//         ...SharedScreens,
//     },
//     {
//         defaultNavigationOptions,
//         headerLayoutPreset: 'center',
//     }
// );

// SearchStack.navigationOptions = {
//     tabBarLabel: 'Search',
//     tabBarComponent: BottomTabBar,
//     tabBarButtonComponent: () => <View />,
// };

export default createBottomTabNavigator(
    {
        HomeStack,
        FindStack,
        AppointmentStack,
        ProfileStack
        // LaunchStack,
        // SettingsStack,
        // BagStack,
        // SearchStack,
    },
    {
        tabBarOptions: {
            activeTintColor: '#000',
            style: {
                height: 55,
                paddingTop: 5,
                paddingBottom: 5,
            },
            labelStyle: {
                fontFamily: 'Regular',
            },
        },
    }
);
