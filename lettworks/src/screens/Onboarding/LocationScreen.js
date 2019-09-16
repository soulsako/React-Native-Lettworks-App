import React from 'react';
import { Platform, StyleSheet, View, Image } from 'react-native';
import { Button } from 'atoms';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import Container from './components/Container';
import Heading from './components/Heading'
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';
import Layout from 'config/constants';
import { AppOnboarding } from 'config/AppOnboarding';
import { isPermissionDenied } from 'config/functions';

export default class LocationScreen extends React.PureComponent {

    state = {
      location: null, 
      errorMessage: null
    }

    componentWillMount(){
      if(Platform.OS === 'android' && !Constants.isDevice){
        this.setState({
          errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
        });
      }else {
        this.getLocationAsync();
      }
    }

    getLocationAsync = async () => {

      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if(status !== 'granted'){
        this.setState({
          errorMessage: 'Lettworks searches for properties near your current location. Please allow using Location Services to enable this.'
        })
      }
    }

    onNext = () => {
        this.props.navigation.navigate('Notifications');
    }

    onBack = () => {
        this.props.navigation.navigate('Sizes');
    }

    // onSelectNext = async () => {
    //     await isPermissionDenied('LOCATION');
    //     this.onNext();
    // }

    render() {
        return (
            <Container>
                {/* <TopBar onSkip={this.onNext} /> */}
                <Heading
                    title={`Enable${'\n'}location`}
                    subtitle='Turn on your location to enable features like property locator, launches, news, event access and real-time updates'
                />

                <View style={styles.imageContainer}>
                    < Image style={styles.image} source={AppOnboarding.location} />
                </View>

                <View>
                    <Button style={styles.buttonContainer} medium buttonStyle={styles.actionButton} onPress={this.onSelectNext} colour='transparent'>Enable location</Button>
                </View>

                <BottomBar selected='LocationScreen' onBack={this.onBack} onNext={this.onNext} />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
    },
    image: {
        resizeMode: 'contain',
        width: Layout.window.width / (Layout.isSmallDevice ? 2 : 1.5),
        height: Layout.window.width / (Layout.isSmallDevice ? 2 : 1.5)
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionButton: {
        width: '70%',
        height: 50,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#A8A8A8'
    }
});