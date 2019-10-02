import React from 'react';
import { StyleSheet, View, Image, Platform, Linking } from 'react-native';
import { Button } from 'atoms';
import { connect } from 'react-redux';
import { updateUser} from 'redux/actions/user';
import Container from './components/Container';
import Heading from './components/Heading'
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';
import Layout from 'config/constants';
import { AppOnboarding } from 'config/AppOnboarding';
import PopupMessage from 'components/PopupMessage';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

class LocationScreen extends React.PureComponent {

    state = {
      errorMessage: "", 
      error: false
    }

    onNext = () => {
        this.props.navigation.navigate('Property');
    }

    onReject = async () => {
      
      try {
        await this.props.updateUser({
          preferences: {
            type: 'rent',
            minBedroom: 1,
            maxBedroom: 6, 
            minPrice: 100, 
            maxPrice: 10000, 
            searchRadius: 40
          }
        });
      }
      catch (ex) {
          console.log('ERROR UPDATE', ex.message);
      }
      this.props.navigation.navigate('Notifications');
    }

    onBack = () => {
        this.props.navigation.navigate('Personalise');
    }

    getLocationAsync = async () => {

      const GPSEnabled = await Location.hasServicesEnabledAsync();
        if(!GPSEnabled){
          if(Platform.OS === 'ios'){
            return Linking.openURL('app-settings:'); 
          }
        }
      const existingStatus = await Permissions.getAsync(Permissions.LOCATION);
      if (!existingStatus || existingStatus.status !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          return this.setState({
            errorMessage: "We highly recommend enabling location to browse properties near by. Please enable location to continue.",
            error: true
          });
        }
      }
      this.onNext();
    }

    onConfirm = async () => {
      
      const existingStatus = await Permissions.getAsync(Permissions.LOCATION);
      if (!existingStatus || existingStatus.status !== 'granted'){
        if(Platform.OS === 'ios'){
          Linking.openURL('app-settings:'); 
        }
      }
      this.setState({error: false});
    }

    onSkip = () => {
      this.setState({
        errorMessage: "We highly recommend enabling location to browse properties near by. Please enable location to continue.", 
        error: true
      });
    }

    render() {
      const { errorMessage, error } = this.state;
        return (
          <Container>
              <TopBar onSkip={this.onSkip} />
              <Heading
                  title={`Enable${'\n'}location`}
                  subtitle='Turn on your location to enable features like store locator, launches, product news, event access and real-time order updates'
              />

              <View style={styles.imageContainer}>
                  <Image style={styles.image} source={AppOnboarding.location} />
              </View>

              <View>
                  <Button style={styles.buttonContainer} medium buttonStyle={styles.actionButton} onPress={this.getLocationAsync} colour='black'>Enable location</Button>
              </View>

              <BottomBar selected='LocationScreen' onBack={this.onBack} hideNext/>

              {error ? 
              <PopupMessage 
                colour="primary" 
                message={errorMessage} 
                title="Location required" 
                center 
                primary
                confirm="Ok, I understand"
                onConfirm={this.onConfirm} 
                reject="I'll do it later"
                onReject={this.onReject} /> 
              : null}
          </Container>
        );
    }
}

export default connect(null, {updateUser})(LocationScreen);

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
        height: 50
    }
});