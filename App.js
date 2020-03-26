import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { AppLoading } from 'expo';
import * as Icon from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import reduxThunk from 'redux-thunk';

import reducers from 'redux/reducers';
import Screens from 'screens';

const store = createStore(reducers, applyMiddleware(reduxThunk));

const persistor = persistStore(store);

export default class App extends React.PureComponent {
    state = {
        isLoadingComplete: false, 
    };

    render() {
      
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (
                <Provider store={store}>
                    <View style={styles.container}>
                        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                        <Screens />
                    </View>
                </Provider>
            );
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Asset.loadAsync([
                require('./src/assets/images/logo/logo.png'),
                require('./src/assets/images/intro/blur.png'),
                require('./src/assets/images/intro/start-poster.png'),
            ]),
            Font.loadAsync({
                // This is the font that we are using for our tab bar
                ...Icon.Ionicons.font,
                // We include SpaceMono because we use it in HomeScreen.js. Feel free
                // to remove this if you are not using it in your app
                Regular: require('./src/assets/fonts/Gotham-Book.otf'),
                Medium: require('./src/assets/fonts/Gotham-Medium.otf'),
                Bold: require('./src/assets/fonts/Gotham-Bold.otf'),
            }),
        ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
