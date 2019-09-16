import React from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import Layout from 'config/constants';

import { ImagesIntro } from 'config/AppIntro';

class AuthLoading extends React.PureComponent {
    constructor(props) {
        super(props);
        if (props.authenticated) {
            props.navigation.navigate('Onboarding'); // Should be main screen i.e. "Main"
        } else {
            props.navigation.navigate('Auth');
        }
    }
    render() {
        return <Image source={ImagesIntro.startPoster} style={{ width: Layout.window.width, height: Layout.window.height }} />
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth && state.auth.authenticated
    }
}

export default connect(mapStateToProps)(AuthLoading);