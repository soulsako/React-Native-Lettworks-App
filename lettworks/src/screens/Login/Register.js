import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { createAccount } from 'redux/actions/auth';
import { StyleSheet, View, Keyboard } from 'react-native';

import { Notification, TouchableItem } from 'components';
import { Button, Input, Text } from 'atoms';

import { getError } from 'config/functions';
import { validate } from 'config/validation';
import LoginWrapper from './LoginWrapper';
import PrivacyPopup from '../other/PrivacyPopup';

class RegisterScreen extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            errors: [],
            submitted: false,
            loading: false,
            privacy: false
        }
    }

    componentDidMount() {
        this.calcErrors();
    }
    componentDidUpdate() {
        const { authenticated, navigation } = this.props;
        if (authenticated) navigation.navigate('Onboarding');
    }

    onLogin = () => {
        this.props.navigation.navigate('Login');
    }

    onBack = () => {
        this.props.navigation.goBack();
    }

    onConfirm = async () => {
        const errors = this.getErrors();
        if (errors.length) return this.setState({ submitted: true, errors });

        this.setState({ loading: true });
        const { email, password, firstName, lastName } = this.state;
        Keyboard.dismiss();
        try {
            await this.props.createAccount({ email, password, firstName, lastName });
           
        } catch (ex) {
            this.setState({ error: ex.error || ex.message || true, loading: false })
        }
    }

    calcErrors = () => {
        this.setState({ errors: this.getErrors() });
    }

    getErrors = () => {
        const errors = [];
        if (!validate('email', this.state.email)) errors.push('email');
        if (!validate('password', this.state.password)) errors.push('password');
        if (!validate('firstName', this.state.firstName)) errors.push('firstName');
        if (!validate('lastName', this.state.lastName)) errors.push('lastName');
        return errors;
    }

    onCloseError = () => {
        this.setState({ error: false })
    }

    onChange = (field, value) => {
        this.setState({ [field]: value }, this.calcErrors);
    }

    onTogglePrivacy = () => {
        this.setState({ privacy: !this.state.privacy })
    }

    getActionButtons = () => {
        return (
            <Fragment>
                <Button medium style={styles.actionButton} onPress={this.onBack} colour='transparent'>Go Back</Button>
                <Button medium style={styles.actionButton} onPress={this.onLogin} colour='transparent'>Sign In</Button>
            </Fragment>
        );
    };

    render() {
        const { errors, submitted, error, loading, email, password, firstName, lastName } = this.state;

        return (
            <View style={styles.container}>
                <LoginWrapper actions={this.getActionButtons()}>
                    <View style={styles.form}>
                        <Input v1
                            inputValid={!errors.includes('firstName')}
                            error={submitted && errors.includes('firstName')}
                            style={styles.inputBox}
                            labelStyle={styles.labelStyle}
                            label="First Name"
                            value={firstName}
                            onChangeText={val => this.onChange('firstName', val)}
                        />
                        <Input v1
                            inputValid={!errors.includes('lastName')}
                            error={submitted && errors.includes('lastName')}
                            style={styles.inputBox}
                            labelStyle={styles.labelStyle}
                            label="Last Name"
                            value={lastName}
                            onChangeText={val => this.onChange('lastName', val)}
                        />
                        <Input v1
                            inputValid={!errors.includes('email')}
                            error={submitted && errors.includes('email')}
                            style={styles.inputBox}
                            labelStyle={styles.labelStyle}
                            label="Email Address"
                            value={email}
                            autoCapitalize='none'
                            keyboardType='email-address'
                            onChangeText={val => this.onChange('email', val)}
                        />
                        <Input v1
                            inputValid={!errors.includes('password')}
                            error={submitted && errors.includes('password')}
                            style={styles.inputBox}
                            labelStyle={styles.labelStyle}
                            label="Create Password"
                            value={password}
                            secureEntry
                            iconColour="white"
                            onChangeText={val => this.onChange('password', val)}
                        />

                        <Text style={styles.errorMessage} small type={submitted && errors.includes('password') ? 'error' : 'w'}>
                            Password must contain upper and lower case characters, numbers and be at least 8 characters
                        </Text>

                        <Button medium loading={loading} onPress={this.onConfirm} colour='primary'>Register</Button>

                        <TouchableItem onPress={this.onTogglePrivacy}>
                            <View style={styles.privacyPolicyText}>
                                <Text type='w' small>We will use your information in accordance with our <Text type='w' small underline bold>privacy policy</Text> - Updated May 2018</Text>
                            </View>
                        </TouchableItem>
                    </View>
                </LoginWrapper>
                <Notification type='error' active={error} onClose={this.onCloseError} message={getError(error)} autoClose/>
                {this.state.privacy && <PrivacyPopup onBack={this.onTogglePrivacy} />}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth && state.auth.authenticated,
    }
}

export default connect(mapStateToProps, { createAccount })(RegisterScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    pwdWrap: {
        position: 'relative',
    },
    pwdIcon: {
        position: 'absolute',
        right: 0,
        top: '50%',
        bottom: 0,
        zIndex: 10,
        padding: 5
    },
    form: {
        marginBottom: 10
    },
    errorMessage: {
        marginBottom: 20
    },
    dropdown: {
        paddingRight: 10
    },
    inputBox: {
        backgroundColor: 'transparent',
        color: '#FFFFFF'
    },
    labelStyle: {
        color: '#FFFFFF'
    },
    privacyPolicyText: {
        marginTop: 20
    },
    actionButton: {
        marginHorizontal: 10,
        width: '40%'
    }
});