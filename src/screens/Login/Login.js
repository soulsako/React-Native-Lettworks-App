import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Keyboard } from 'react-native';
import { Linking } from 'expo';

import { login, clear } from 'redux/actions/auth';
// import { setUseFingerprint } from 'redux/actions/ui';

import { Notification } from 'components';
import { Button, Input, Text } from 'atoms';

import { validate } from 'config/validation';
import LoginWrapper from './LoginWrapper';

class LoginScreen extends React.PureComponent {
    state = {
        email: '',
        password: '',
        errors: [],
        submitted: false
    };
    componentDidMount() {
        this.calcErrors(); // Validates email and password in the state and sets errors array to ['email', 'password'] if error exists 
        this.props.clear(); // Action to reduce auth state to an object
        Linking.getInitialURL().then(this.onReset); // Deep linking if  app is NOT already open navigated to reset password// seperate path and query params if path = 'reset-password' navigate to reset screen and pass query params
        Linking.addEventListener('url', obj => {
        this.onReset(obj.url); // If app is open 
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.authenticated && !prevProps.authenticated) {
            this.onAppLogin();
        }
    }

    onAppLogin() {
        const { user, navigation, loginType } = this.props;
        navigation.navigate(user.preferences || loginType === 'login' ? 'Onboarding' : 'Onboarding');
    }
    onReset = url => {
        let { path, queryParams } = Linking.parse(url);
        if (path === 'reset-password') {
            this.props.navigation.navigate('Reset', queryParams);
        }
    };
    onLogin = () => {
        const errors = this.getErrors();
        if (errors.length) return this.setState({ submitted: true, errors });

        if (this.props.authenticating) return;
        const { email, password } = this.state;
        Keyboard.dismiss();
        this.props.login(email, password);
    };
    onRegister = () => {
        this.props.navigation.navigate('Register');
    };
    onForgot = () => {
        this.props.navigation.navigate('Forgot');
    };
    onChange = (field, value) => {
        this.setState({ [field]: value }, this.calcErrors);
    };
    calcErrors = () => {
        this.setState({ errors: this.getErrors() });
    };
    getErrors = () => {
        const errors = [];
        if (!validate('email', this.state.email)) errors.push('email');
        if (!validate('password', this.state.password)) errors.push('password');
        return errors;
    };
    getActionButtons = () => {
        return (
            <Fragment> 
                <Button
                    medium
                    style={styles.actionButton}
                    onPress={this.onRegister}
                    colour="noBorderBackground">
                    Haven't got an account? Register
                </Button>
                {/* <TouchableWithoutFeedback style={{alignItems: 'center', width: '100%'}}>
                    <Text mediumWeight style={{color: '#FFF', textAlign: 'center'}}>
                        Haven't got an account? Register
                    </Text>
                </TouchableWithoutFeedback> */}
                {/* <Button
                    medium
                    style={styles.actionButton}
                    onPress={this.onForgot}
                    colour="transparent">
                    Forgot Password
                </Button> */}
            </Fragment>
        );
    };
    render() {
        const { unauthorised, error, authenticating, clear } = this.props;
        const {
            submitted,
            errors,
            email,
            password
        } = this.state;

        return (
            <View style={styles.container}>
                <LoginWrapper actions={this.getActionButtons()}>
                    <View>
                        <Input
                            v1
                            style={styles.inputBox}
                            inputValid={!errors.includes('email')}
                            error={submitted && errors.includes('email')}
                            labelStyle={styles.labelStyle}
                            label="Email Address"
                            value={email}
                            autoCorrect={false}
                            ref={r => (this.email = r)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChangeText={val => this.onChange('email', val)}
                        />

                        <Input
                            v1
                            style={styles.inputBox}
                            inputValid={!errors.includes('password')}
                            error={submitted && errors.includes('password')}
                            labelStyle={styles.labelStyle}
                            label="Password"
                            value={password}
                            ref={r => (this.password = r)}
                            secureEntry={true}
                            iconColour="white"
                            onChangeText={val => this.onChange('password', val)}
                        />

                        <Button
                            medium
                            loading={authenticating}
                            onPress={this.onLogin}
                            colour="primary">
                            Sign In
                        </Button>
                        <Button
                            smallTextSize
                            style={{marginTop: 20}}
                            onPress={this.onForgot}
                            colour="noBorderBackground">
                            Forgot Password?
                        </Button>                        
                    </View>
                </LoginWrapper>
  
                <Notification
                    onClose={clear}
                    active={unauthorised || error}
                    type="error"
                    autoClose
                    message={
                        unauthorised
                            ? 'The details you entered were invalid'
                            : 'There was a problem logging you in, please check your connection'
                    }
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.auth,
        user: state.user || {}
    };
}

export default connect(mapStateToProps,{ login, clear })(LoginScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    popupRow: {
        marginVertical: 10,
    },
    popupText: {
        fontSize: 20,
        fontFamily: 'Bold',
        color: '#000',
    },
    skipButton: {
        paddingVertical: 20,
        paddingRight: 20,
    },
    skip: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
    },
    confirm: {
        flexDirection: 'row',
    },
    confirmButton: {
        marginHorizontal: 10,
    },
    inputBox: {
        backgroundColor: 'transparent',
        color: '#FFFFFF',
    },
    labelStyle: {
        color: '#FFFFFF',
        fontSize: 10,
    },
    actionButton: {
        marginHorizontal: 10,
        width: '40%',
        borderWidth: 0
    },
});
