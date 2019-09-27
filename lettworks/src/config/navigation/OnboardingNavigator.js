import { createSwitchNavigator } from 'react-navigation';
import PersonaliseScreen from 'screens/Onboarding/PersonaliseScreen';
import LocationScreen from 'screens/Onboarding/LocationScreen';
import NotificationsScreen from 'screens/Onboarding/NotificationsScreen';
import PropertyTypeScreen from 'screens/Onboarding/PropertyTypeScreen';
import PricesScreen from 'screens/Onboarding/PricesScreen';

const Navigator = createSwitchNavigator(
    {
        Personalise: PersonaliseScreen,
        Location: LocationScreen,
        Notifications: NotificationsScreen,
        Property: PropertyTypeScreen,
        Prices: PricesScreen,
    }, {
        initialRouteName: 'Personalise'
    }
);

export default Navigator;