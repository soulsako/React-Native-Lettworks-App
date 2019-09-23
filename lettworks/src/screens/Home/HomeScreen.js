import React, { Fragment } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Platform, Image } from 'react-native';
import { Text } from 'atoms';
import { HeaderMiddle } from 'components/Header';
import { connect } from 'react-redux';
import * as Location from 'expo-location';
import Api from 'services/api'
import PropertyCard from 'components/PropertyCard';
import { distanceItems } from 'data';
import RNPickerSelect from 'react-native-picker-select';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Icon } from 'components';
import { expo } from '../../../app.json';
import { IconsPDP } from 'config/AppIcons/AppIcons'
import Loader from 'components/Loader';

class HomeScreen extends React.PureComponent {

  static navigationOptions = ({ navigation }) => {
    return {
        headerTitle: <HeaderMiddle title="Lettworks" />
    }
  };

  state = {
    loading: true, 
    distance: 10, 
    pickerItems: distanceItems,
    currAddress: "", 
    latitude: '',
    longitude: '', 
    properties: null
  }

  componentDidMount(){
    this.getCurrentLocation();
  }

  getCurrentLocation = async () => {
    let currLocation = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = currLocation.coords;
    const response = await Api.google({
      lat: latitude, 
      lng: longitude
    });
    const currAddress = response.results[0].formatted_address;
    this.setState({ currAddress, latitude, longitude }, this.getProperties);
  }

  getProperties = async () => {
    // Fetch properties from backend
    // How the end point should look => /within/:distance/center/:latlng/unit/:unit'
    const { latitude, longitude } = this.state;
    this.makeRequestToGetProperties(latitude, longitude);
  }

  onDistancePickerHandler = (distance, index) => {
    //Here we have access to the selected radius in miles
    this.setState({ distance, loading: true }, this.getProperties)
  }

  onLocationSelectedHandler = async (data, details= null) => { 
    this.setState({loading: true})
  // 'details' is provided when fetchDetails = true
    const searchCoords = await Api.google(data.place_id);
    const { lat, lng } = searchCoords.result.geometry.location;
    // Make request to backend to fetch properties
    this.makeRequestToGetProperties(lat, lng);
    this.setState({latitude: lat, longitude: lng})
    
  }

  makeRequestToGetProperties = async (lat, lng) => {
    const endpoint = `within/${this.state.distance}/center/${lat},${lng}/unit/mil`;
    const response = await Api.http({
      method: 'GET',
      type: 'properties',
      endpoint
    });
    console.log(response.properties);
    this.setState({loading: false, properties: response.properties});
  }

  renderProperties = () => {
    return this.state.properties.map(property => (
      <Fragment key={property._id}>
        <PropertyCard 
          rent={property.rent} 
          description={property.description}
          bedrooms={property.bedrooms}
          bathrooms={property.bathrooms}
          ratingsAverage={property.ratingsAverage}
          address={property.address}
          imageCover={property.imageCover}
        />
        <View style={styles.seperator} />
      </Fragment>
    ));
  }

  renderPickerIcon = () => <Icon.Ionicons name="md-arrow-down" size={22} color='#959595' />

  //Use rapid Api to fetch towns close by and render on top of screen for quick filters 
  quickFilters = () => {

  }

  render(){
    const { distance, pickerItems, currAddress, loading, properties } = this.state;
    const placeholder = { label: 'Search radius', value: null, color: '#9EA0A4'};
    return (
      <SafeAreaView style={styles.container}>

        <View style={styles.searchContainer}>

            <GooglePlacesAutocomplete
              placeholder={currAddress.substring(0, 20)}
              minLength={2} // minimum length of text to search
              autoFocus={false}
              returnKeyType={'search'} 
              keyboardAppearance={'light'}
              listViewDisplayed={false} // true/false/undefined
              fetchDetails={false}
              onPress={this.onLocationSelectedHandler}
              getDefaultValue={() => ''}
              query={{key: expo.googleMaps.APIKey,language: 'en', components: 'country:gb'}}
              styles={googleInput}
              currentLocation={true} 
              currentLocationLabel="Use current location"
              debounce={200} 
              renderRightButton={() => <Image source={IconsPDP.tabs.locationGrey} style={styles.icon}/>}
            />

          <View style={styles.pickerContainer}>
            <RNPickerSelect
              placeholder={placeholder}
              items={pickerItems}
              onValueChange={this.onDistancePickerHandler}
              style={{ ...pickerSelectStyles, iconContainer: { top: 12, right: 12 }}}
              value={distance}
              useNativeAndroidPickerStyle={false}
              textInputProps={{ underlineColor: 'yellow' }}
              Icon={this.renderPickerIcon}
            />
          </View>

        </View>
        {
          !loading && properties && properties.length === 0 ? 
          <View style={styles.noSearchResults}>
            <Text>0 search results.</Text>
            <Text>Please change search criteria.</Text>
          </View> : null
        }
        {loading || !properties ? <Loader /> : 
          <ScrollView keyboardShouldPersistTaps='handled' style={styles.scrollContainer}>
            {/* <View style={styles.container_medium}>
                {user && user.firstName &&
                  <View style={styles.header}>
                      <Text style={styles.title}>Hi {user.firstName}</Text>
                  </View>
                }
              </View> */}
            {this.renderProperties()}
          </ScrollView>
        }

      </SafeAreaView>
    );
  }
}

function mapStateToProps(state){
  return {
    auth: state.auth, 
    preferences: state.user && state.user.preferences, 
    user: state.user
  }
}

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({

  container: { // section instead of container maybe
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 10
  },
  searchContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pickerContainer:  {
    justifyContent: 'center', 
    alignItems: 'center', 
    alignSelf: 'flex-start'
  },
  scrollContainer: {
    paddingVertical: 10
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5
  }, 
  seperator: {
    height: 15
  }, 
  noSearchResults: {
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 50
  }
});

const googleInput = StyleSheet.create({

  textInputContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopWidth: 0.33,
    borderBottomWidth: 0.33, 
    borderLeftWidth: 0.33, 
    borderRightWidth: 0.33, 
    alignItems: 'center',
    borderRadius: Platform.OS === 'ios' ? 4 : 8,
    borderTopColor: '#ccc',
    borderBottomColor: '#ccc',
    borderLeftColor: '#ccc',
    borderRightColor: '#ccc',
  },
  description: {
    fontWeight: 'bold', 
    fontFamily: 'Regular'
  },
  predefinedPlacesDescription: {
    color: '#4BD4B0', 
    fontFamily: 'Regular'
  }, 

  textInput: {
    fontFamily: 'Regular', 
  },
  loader: {},
  listView: {},
  poweredContainer: {},
  powered: {},
  separator: {},
  row:{}
});

const defaultPickerStyles = {
  
  fontSize: 15,
  borderColor: '#ccc',
  color: 'black',
  fontFamily: 'Regular', 
  paddingRight: 30,
  flexDirection: 'row', 
  alignItems: 'center',
  justifyContent: 'space-between',
  width: 100, 
  borderWidth: 0.33, 
  marginLeft: 5, 
  backgroundColor: '#fff'
}

const pickerSelectStyles = StyleSheet.create({

  inputIOS: {
    ...defaultPickerStyles,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4
  },
  inputAndroid: {
    ...defaultPickerStyles,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8
  }

});