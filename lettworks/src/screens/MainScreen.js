import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchUser, updateUser } from 'redux/actions/user';
import { Platform } from 'react-native';

import api from 'services/api';
import { PopupMessage } from 'components';
import { Notifications } from 'expo';
import { isPermissionDenied } from 'config/functions';
import TabsNav from 'config/navigation/MainTabNavigator';
import packageJson from '../../app.json';

class MainScreen extends React.PureComponent {
    static router = TabsNav.router;
    constructor(props) {
        super(props);
        if (props.token) {
          //Set token and looged in to true in api class 
            api.setToken(props.token);
        }
    }
    state = {
        dismissWelcomeMessage: false
    }
    componentDidMount() {
        this.getPushToken();
        this.getAppVersion();
        //this.props.fetchCustomer();
        // console.log("Token: ", this.props.token);
        // console.log("pushToken: ", this.props.pushToken);
        // console.log("appVersion: ", this.props.appVersion);
        // console.log("authenticated: ", this.props.authenticated);
    }
    componentDidUpdate() {
        if (!this.props.authenticated) {
            this.props.navigation.navigate('Auth');
        }
    }

    // Get the token that uniquely identifies this device to send push notifications
    getPushToken = async () => {
        try {
            if (await isPermissionDenied('NOTIFICATIONS')) return;

            const expoToken = await Notifications.getExpoPushTokenAsync();
            let deviceToken = __DEV__ ? {} : await Notifications.getDevicePushTokenAsync({}).catch();
            if (!deviceToken) deviceToken = {};
            const { pushToken } = this.props;
            if (expoToken === pushToken.expoToken && deviceToken.data === pushToken.deviceToken) {
                console.log('no need to update push token');
                return Promise.resolve();
            }
            await this.props.updateUser({
                pushToken: {
                    expoToken,
                    platform: Platform.OS,
                    deviceToken: deviceToken.data,
                    type: deviceToken.type
                }
            })
        } catch (ex) {
            console.log('unable to get push token', ex);
        }
    }
    //Update app version
    getAppVersion = async () => {
        const { appVersion } = this.props;
        if (!packageJson || !packageJson.expo || !packageJson.expo.version) return;
        if (appVersion === packageJson.expo.version) return;
        
        try {
            await this.props.updateUser({
                appVersion: packageJson.expo.version
            });
        } catch (ex) {
            console.log('ERROR VERSION', ex);
        }
    }
 
    render() {
        return (
          <TabsNav navigation={this.props.navigation} />
        )
    }
}

function mapStateToProps(state) {
    return {
        token: state.auth && state.auth.token,
        pushToken: state.user && state.user.pushToken || {},
        appVersion: state.user && state.user.appVersion,
        authenticated: state.auth && state.auth.authenticated
    }
}

export default connect(mapStateToProps, { fetchUser, updateUser })(MainScreen);