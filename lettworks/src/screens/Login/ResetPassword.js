import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Keyboard } from 'react-native';

import { Notification } from 'components';
import { Button, Input, Text, BlankButton } from 'atoms';

import api from 'services/api';
import LoginWrapper from './LoginWrapper';
import { getError } from 'config/functions';
import { validate } from 'config/validation';

class ResetPasswordScreen extends React.PureComponent {

    state = {
        password: '',
        error: false,
        errors: []
    }
    
    componentDidMount() {
        this.token = this.props.navigation.getParam('token');
        this.calcErrors();
    }
  
    onReset = async () => {
        const { loading, password } = this.state;
        const errors = this.getErrors();
        if (errors.length) return this.setState({ submitted: true, errors });
        if (loading || !password) return;

        if (!validate('password', password)) {
            return this.setState({
                error: 'Password must contain upper and lower case characters, numbers and be at least 8 characters'
            });
        }
        this.setState({ loading: true });
        Keyboard.dismiss();
        try {
            await api.http({
                endpoint: `/resetpassword/${this.token}`,
                method: 'patch',
                data: { password }
            });
            this.setState({ success: true, loading: false, password: '' });
        } catch (ex) {
            this.setState({ error: ex.message || true, loading: false });
        }
    }
    calcErrors = () => {
        this.setState({ errors: this.getErrors() });
    }
    getErrors = () => {
        const errors = [];
        if (!validate('password', this.state.password)) errors.push('password');
        return errors;
    }
    onChange = (field, value) => {
        this.setState({ [field]: value }, this.calcErrors);
    }
    onLogin = () => {
        this.props.navigation.navigate('Login');
    }
    onCloseError = () => {
        this.setState({ error: false });
    }
    onCloseSuccess = () => {
        this.setState({ success: false });
    }
    getActionButtons = () => {
        return (
            <View>
                <BlankButton onPress={this.onLogin}>
                    <Text style={styles.blankButton}>Back</Text>
                </BlankButton>
            </View>
        );
    };
    onForgot = () => {
      this.props.navigation.navigate("Forgot");
    }
    render() {
        const { errors, submitted, password, error, loading, success } = this.state;
        return (
            <View style={styles.container}>
                <LoginWrapper actions={this.getActionButtons()}>
                    {success ?
                        <View style={styles.form}>
                            <View style={styles.success}>
                                <Text bold type='w'>Your password has been updated</Text>
                            </View>
                            <Button medium loading={loading} onPress={this.onLogin} colour="primary">Sign In</Button>
                        </View>
                        :
                        <View style={styles.form}>
                            <View style={styles.center}>
                                <Text style={styles.title}>Enter your new password</Text>
                            </View>

                            <Input v1
                                inputValid={!errors.includes('password')}
                                error={submitted && errors.includes('password')}
                                style={styles.inputBox}
                                labelStyle={styles.labelStyle}
                                label="New Password"
                                value={password}
                                secureEntry
                                iconColour="white"
                                onChangeText={val => this.onChange('password', val)}
                            />

                            <Text style={styles.errorMessage} small type={submitted && errors.includes('password') ? 'error' : 'w'}>
                                Password must contain upper and lower case characters, numbers and be at least 8 characters
                            </Text>

                            <Button medium loading={loading} onPress={this.onReset} colour='primary'>Reset Password</Button>
                        </View>
                    }
                </LoginWrapper>
               
                <Notification type="error" active={error} onClose={this.onCloseError} message={getError(error)} autoClose/>
            </View>
        );
    }
}

export default connect(null)(ResetPasswordScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    form: {
        marginBottom: 40
    },
    button: {
        paddingHorizontal: 40,
        marginTop: 10
    },
    blankButton: {
        fontFamily: 'Medium',
        color: '#fff',
    },
    success: {
        alignItems: 'center',
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
    errorMessage: {
        marginBottom: 20
    },
    inputBox: {
        backgroundColor: 'transparent',
        color: '#FFFFFF'
    },
    labelStyle: {
        color: '#FFFFFF',
        fontSize: 10
    }
});