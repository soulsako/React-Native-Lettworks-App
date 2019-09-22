import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button } from 'atoms';

import Container from './components/Container';
import Heading from './components/Heading'
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';
import Layout from 'config/constants';
import { AppOnboarding } from 'config/AppOnboarding';
import { isPermissionDenied } from 'config/functions';
import PopupMessage from 'components/PopupMessage';
import * as Location from 'expo-location';

export default class LocationScreen extends React.PureComponent {

    state = {
      errorMessage: "", 
      isVisible: false
    }

    onNext = () => {
        this.props.navigation.navigate('Notifications');
    }

    onBack = () => {
        this.props.navigation.navigate('Sizes');
    }

    onSelectNext = async () => {
        const granted = await isPermissionDenied('LOCATION');
        if(!granted){
          this.setState({
            errorMessage: "Lettworks requires location to show you properties near by. Please enable location to continue.", 
            isVisible: true
          });
        }else {
          const GPSEnabled = await Location.hasServicesEnabledAsync();
          if(!GPSEnabled){
            await Location.getCurrentPositionAsync({});
          }
          this.onNext();
        }
    }


    onCloseMessage = () => {
      this.setState({ isVisible: false })
    }

    render() {
      const { errorMessage, isVisible } = this.state;
        return (
            <Container>
  
                <Heading
                    title={`Enable${'\n'}location`}
                    subtitle='Turn on your location to enable features like store locator, launches, product news, event access and real-time order updates'
                />

                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={AppOnboarding.location} />
                </View>

                <View>
                    <Button style={styles.buttonContainer} medium buttonStyle={styles.actionButton} onPress={this.onSelectNext} colour='transparent'>Enable location</Button>
                </View>

                <BottomBar selected='LocationScreen' onBack={this.onBack} />

                {isVisible ? <PopupMessage colour="warning" message={errorMessage} title="Location required" center confirm="Ok, I understand" onConfirm={this.onCloseMessage} /> : null}

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