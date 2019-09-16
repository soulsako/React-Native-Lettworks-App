import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, ImageBackground, SafeAreaView } from 'react-native';

import { Button, BlankButton, Text } from 'atoms';

import Layout from 'config/constants';
import { login, clear } from 'redux/actions/auth';
import { Video } from 'expo-av';
import { Videos } from 'config/AppVideos';
import { Notification, Loader } from 'components';
import { ImagesIntro } from 'config/AppIntro';
import { ImagesLogos } from 'config/AppIcons/AppLogos';

class StartPage extends React.PureComponent {
    state = {
        play: true,
        loaded: false,
    };
    componentDidMount() {
        this.blurListener = this.props.navigation.addListener('didBlur', () => {
            this.setState({ play: false });
        });
        this.focusListener = this.props.navigation.addListener('willFocus', () => {
            this.setState({ play: true });
        });
    }
    componentWillUnmount() {
        this.focusListener.remove();
        this.blurListener.remove();
    }
    // componentDidUpdate(prevProps) {
    //     const { authenticated, customer } = this.props;
    //     if (authenticated && !prevProps.authenticated && customer && customer.isGuest) {
    //         this.props.navigation.navigate('Home');
    //     }
    // }
    onRegister = () => {
        this.props.navigation.navigate('Register');
    };
    onLogin = () => {
        this.props.navigation.navigate('Login');
    };
    // onGuestLogin = () => {
    //     if (this.props.authenticating) return;
    //     this.props.login(null, null, true);
    // };
    onLoaded = () => {
        this.setState({ loaded: true });
    };
    renderVideo() {
        return (
            <Video
                onLoad={this.onLoaded}
                rate={1.0}
                volume={0}
                isMuted
                resizeMode="cover"
                shouldPlay={this.state.play}
                isLooping
                // onError={()=>this.onVideoError()}
                style={styles.fullScreen}
                source={Videos.startSmaller2}
            />
        );
    }
    render() {
        const { authenticating, unauthorised, clear } = this.props;
        return (
            <View style={styles.container}>
                <View styles={styles.video}>
                    <ImageBackground source={ImagesIntro.startPoster} style={styles.fullScreen}>
                        {this.renderVideo()}
                    </ImageBackground>
                </View>
                <SafeAreaView style={styles.overlay}>
                    <View style={styles.content}>
                        <View />
                        <View style={styles.center}>
                            <Image source={ImagesLogos.logo} style={styles.image} />
                        </View>
                        <View>
                            <View style={styles.buttons}>
                                <Button
                                    medium
                                    style={styles.actionButton}
                                    onPress={this.onRegister}
                                    colour="transparent">
                                    Register
                                </Button>
                                <Button
                                    medium
                                    style={styles.actionButton}
                                    onPress={this.onLogin}
                                    colour="white">
                                    Sign In
                                </Button>
                            </View>
                            {/* <BlankButton onPress={this.onGuestLogin}>
                                {authenticating ? <Loader style={{padding: 0, marginTop: 20}} /> : <Text style={styles.blankButton}>Browse as Guest</Text>}
                            </BlankButton> */}
                        </View>
                    </View>
                </SafeAreaView>
                <Notification
                    onClose={clear}
                    active={unauthorised}
                    type="error"
                    message={'There was a problem logging you in, please check your connection'}
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.auth,
    };
}

export default connect(mapStateToProps,{ login, clear })(StartPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    actionButton: {
        marginHorizontal: 10,
        width: '40%',
    },
    blankButton: {
        fontSize: 14,
        fontFamily: 'Medium',
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 20,
    },
    overlay: {
        // ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    video: {
        width: Layout.window.width,
        height: Layout.window.height,
    },
    content: {
        margin: 10,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    image: {
        width: 150,
        height: 150,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullScreen: {
        width: Layout.window.width,
        height: Layout.screen.height
    },
});
