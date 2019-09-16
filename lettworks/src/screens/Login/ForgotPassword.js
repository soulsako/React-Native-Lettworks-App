import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Keyboard } from 'react-native';

import { Notification } from 'components';
import { Button, Input, Text, BlankButton } from 'atoms';

import { getError } from 'config/functions';
import { validate } from 'config/validation';
import LoginWrapper from './LoginWrapper';
import api from 'services/api';

import { Linking } from 'expo';

class ForgotPasswordScreen extends React.PureComponent {

    state = {
        email: '',
        error: false,
        errors: []
    }

    componentDidMount() {
        this.calcErrors();
    }

    onReset = async () => {
        const errors = this.getErrors();
        if (errors.length) return this.setState({ submitted: true, errors });
        if (this.state.loading) return;
        try {
            this.setState({ loading: true });
            Keyboard.dismiss();
            //Create a deep link url 
            const deepLinkUrl = Linking.makeUrl('/reset'); //exp://192.168.0.23:19000/--/
            await api.http({
                endpoint: 'forgotpassword',
                method: 'post',
                data: {
                    email: this.state.email, 
                    deepLinkUrl

                }
            });
            // console.log("Forgot password response", response);
            this.setState({ success: true, loading: false, email: '' }, this.calcErrors);
        } catch (ex) {
            console.log("coming from forgot password", ex);
            this.setState({ error: ex.message || true, loading: false });
        }
    }
    calcErrors = () => {
        this.setState({ errors: this.getErrors() });
    }
    getErrors = () => {
        const errors = [];
        if (!validate('email', this.state.email)) errors.push('email');
        return errors;
    }
    onChange = (field, value) => {
        this.setState({ [field]: value }, this.calcErrors);
    }
    onLogin = () => {
        this.props.navigation.goBack();
    }
    onCloseError = () => {
        this.setState({ error: false })
    }
    onCloseSuccess = () => {
        this.setState({ success: false })
    }
    getActionButtons = () => {
        return (
            <View style={styles.center}>
                <BlankButton onPress={this.onLogin}>
                    <Text style={styles.blankButton}>Remembered it? Log in here</Text>
                </BlankButton>
            </View>
        );
    }
    render() {
        const { errors, submitted, email, error, loading, success } = this.state;

        return (
            <View style={styles.container}>
                <LoginWrapper actions={this.getActionButtons()}>
                    <View style={styles.form}>
                        <View style={styles.center}>
                            <Text style={styles.title}>Reset Password</Text>
                        </View>
                        <Input v1
                            inputValid={!errors.includes('email')}
                            error={submitted && errors.includes('email')}
                            style={styles.inputBox}
                            labelStyle={styles.labelStyle}
                            label="Email Address"
                            value={email}
                            keyboardType='email-address'
                            autoCapitalize='none'
                            onChangeText={val => this.onChange('email', val)}
                        />

                        <Button medium loading={loading} onPress={this.onReset} colour='primary'>Reset Password</Button>
                    </View>
                </LoginWrapper>
                <Notification type="error" autoClose active={error} onClose={this.onCloseError} message={getError(error)} />
                <Notification type="success" autoClose active={success} onClose={this.onCloseSuccess} message={"You have been emailed with instructions to reset your password"} />
            </View>
        );
    }
}

export default connect(null)(ForgotPasswordScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    form: {
        marginBottom: 40
    },
    center: {
        width: '100%',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontFamily: 'Bold',
        color: '#fff',
        marginBottom: 20
    },
    inputBox: {
        backgroundColor: 'transparent',
        color: '#FFFFFF'
    },
    labelStyle: {
        color: '#FFFFFF',
        fontSize: 10
    },
    blankButton: {
        fontFamily: 'Medium',
        color: '#fff'
    }
});