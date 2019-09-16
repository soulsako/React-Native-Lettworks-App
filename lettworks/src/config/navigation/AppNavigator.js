import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from './AuthNavigator';
import AuthLoading from 'screens/AuthLoading';
import MainScreen from 'screens/MainScreen';
import OnboardingNavigator from './OnboardingNavigator';

const AppContainer = createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        Main: MainScreen, // LoggedInWrapper(MainTabNavigator),
        Auth: {
          screen: AuthNavigator, 
          path: ''
        },
        Onboarding: OnboardingNavigator
    }, {
        initialRouteName: 'AuthLoading'
    }
));

export default AppContainer;