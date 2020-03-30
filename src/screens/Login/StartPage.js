import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, ImageBackground, SafeAreaView } from 'react-native';

import { Button, BlankButton, Text } from 'atoms';

import Layout from 'config/constants';
import { socialLogin, clear } from 'redux/actions/auth';
import { Video } from 'expo-av';
import { Videos } from 'config/AppVideos';
import { Notification, Loader } from 'components';
import { ImagesIntro } from 'config/AppIntro';
import { ImagesLogos } from 'config/AppIcons/AppLogos';
<<<<<<< Updated upstream
=======
import { socialIcons } from 'config/AppIcons/AppIcons';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { expo } from '../../../app.json';
import Api from 'services/api';
import { FBLoginErrorMessage, googleLoginErrorMessage, defaultErrorMessage } from 'config/errorMessages';
>>>>>>> Stashed changes

class StartPage extends React.PureComponent {
    state = {
        play: true,
				loaded: false, 
				socialLoginError: null
    };
    componentDidMount() {
<<<<<<< Updated upstream
=======
				console.log("Props from start page", this.props);
>>>>>>> Stashed changes
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
		
		componentDidUpdate(prevProps) {
			if (this.props.authenticated && !prevProps.authenticated) {
					this.onAppLogin();
			}
		}

		onAppLogin() {
				const { navigation, newUser, status } = this.props;
				if(status === "fail") return this.setState({socialLoginError: defaultErrorMessage});
				else if(status === "success" && newUser) return navigation.navigate('Onboarding');
				navigation.navigate('Main');
		}
    
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
<<<<<<< Updated upstream
        );
    }
=======
				);
		}

		facebookLoginHandler = async () => {
			try {
				await Facebook.initializeAsync(expo.extra.facebookAppId);
				const {
					type,
					token,
					expires,
					permissions,
					declinedPermissions,
				} = await Facebook.logInWithReadPermissionsAsync({
					permissions: ['public_profile', 'email'],
				});
				if (type === 'success') {
					// Get the user's name using Facebook's Graph API
					const userFBDetails = await Api.facebookGraphApi(token);
					userFBDetails.error ? this.setState({socialLoginError: FBLoginErrorMessage}) : this.props.socialLogin(userFBDetails);

				} else {
					// type === 'cancel'
				}
			} catch ({ message }) {
				this.setState({socialLoginError: FBLoginErrorMessage});
			}
		}

		googleLoginHandler = async () => {

			try {
				const result = await Google.logInAsync({
					iosClientId: expo.extra.IOS_CLIENT_ID, 
					androidClientId: expo.extra.ANDROID_CLIENT_ID, 
					scopes: ['profile', 'email']
				});
				console.log("RESULT FROM GOOGLEW", result)
				if(result.type === 'success'){
					this.props.socialLogin({name: result.user.givenName, email: result.user.email});
				}
			}catch(e){
				this.setState({socialLoginError: googleLoginErrorMessage});
			}
  
		}

>>>>>>> Stashed changes
    render() {
				const { authenticating, unauthorised, clear } = this.props;
				const { facebookLoginError } = this.state;
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
<<<<<<< Updated upstream
=======
													<View style={styles.socialButtons}>
                            <Button
																large
																style={styles.actionButton}
																onPress={this.googleLoginHandler}
																colour="google"
																icon={socialIcons.googleLetter}
                            >Sign in with Google</Button>
													</View>
													<View style={styles.socialButtons}>
                            <Button
																large
																style={styles.actionButton}
																onPress={this.facebookLoginHandler}
																colour="facebook"
																icon={socialIcons.facebookRound}
                            >Sign in with Facebook</Button>
													</View>
>>>>>>> Stashed changes
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
                                    Sign in with email
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
								<Notification
                    onClose={clear}
                    active={facebookLoginError}
                    type="error"
                    message={facebookLoginError}
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
				...state.auth,
				...state.user
    };
}

export default connect(mapStateToProps,{ socialLogin, clear })(StartPage);

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
