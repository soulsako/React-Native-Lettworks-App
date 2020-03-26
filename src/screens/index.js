import React from 'react';
import AppNavigator from 'config/navigation/AppNavigator';
import { AsyncStorage } from 'react-native';
import { Linking } from 'expo';
const prefix = Linking.makeUrl('/');

const navigationPersistenceKey = __DEV__ ? "NavigationStateDEV208" : null;

export default class Main extends React.PureComponent {
  
    getPersistenceFunctions = () => {
        return __DEV__
            ? {
                persistNavigationState: this.persistNavigationState,
                loadNavigationState: this.loadNavigationState,
            }
            : undefined;
    }
    persistNavigationState = async (navState) => {
        try {
            await AsyncStorage.setItem(navigationPersistenceKey, JSON.stringify(navState));
        } catch (err) {
            // handle the error according to your needs
        }
    }

    loadNavigationState = async () => {
        const jsonString = await AsyncStorage.getItem(navigationPersistenceKey);
        return JSON.parse(jsonString);
    };

    getActiveRouteName = (navigationState) => {
        if (!navigationState) return null;
        const route = navigationState.routes[navigationState.index];
        if (route.routes) return this.getActiveRouteName(route);
        return route.routeName;
    }
    handleNavigationChange = (prevState, currentState, action) => {
        const currentScreen = this.getActiveRouteName(currentState);
        const prevScreen = this.getActiveRouteName(prevState);

        if (prevScreen !== currentScreen) {
            // Todo add GA code here
        }
    }
    render() {
        return (
            <AppNavigator {...this.getPersistenceFunctions()} uriPrefix={prefix} />
        );
    }
}