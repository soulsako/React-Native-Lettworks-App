import React, { Fragment } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Platform, Image, Modal } from 'react-native';
import { Text, BlankButton } from 'atoms';
import { HeaderMiddle } from 'components/Header';
import { connect } from 'react-redux';
import * as Location from 'expo-location';
import Api from 'services/api'
import PropertyCard from 'components/PropertyCard';
import { distanceItems } from 'data';
import Picker from 'react-native-picker-select';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Icon } from 'components';
import { expo } from '../../../app.json';
import { IconsPDP } from 'config/AppIcons/AppIcons'
import Loader from 'components/Loader';
import Filters from 'components/Filters';
import * as Permissions from 'expo-permissions';
import { googleInput } from 'services/globalStyles';

class HomeScreen extends React.PureComponent {

  static navigationOptions = ({ navigation }) => {
    return {
        headerTitle: <HeaderMiddle title="Lettworks" />
    }
  };

  constructor(props){
    super(props);
    this.state = {
      loading: true, 
      distance:  props.preferences.searchRadius, 
      pickerItems: distanceItems,
      currAddress: "", 
      latitude: '',
      longitude: '',
      filters: props.preferences,
      properties: null, 
      showFilters: false,
      totalFilters: [],
      sortItems: [
        { label: 'Recommended', value: 'recommended' },
        { label: 'Price - High to low', value: '-sellingprice' },
        { label: 'Price - Low to high', value: 'sellingprice' },
        { label: 'Latest', value: 'date' },
      ]
    }
  }

  componentDidMount(){
    console.log('====================================');
    console.log("PREFERENCES: ", this.props.preferences);
    console.log('====================================');
    this.getCurrentLocation();
  }

  getCurrentLocation = async () => {

    const currLocation = await this.checkLocationAsync();
    if(!currLocation) return this.makeRequestToGetProperties();
   
    const { latitude, longitude } = currLocation.coords;
    const response = await Api.google({
      lat: latitude, 
      lng: longitude
    });
    const currAddress = response.results[0].formatted_address;
    this.setState({ currAddress, latitude, longitude }, () => this.makeRequestToGetProperties(this.state.latitude, this.state.longitude));
  }


  checkLocationAsync = async () => {

    const existingStatus = await Permissions.getAsync(Permissions.LOCATION);
    if (!existingStatus || existingStatus.status !== 'granted') {
       return false;
    }
    const currLocation = await Location.getCurrentPositionAsync({});
    return currLocation;
  }

  makeRequestToGetProperties = async (lat, lng, distance = this.props.preferences.searchRadius, query = '') => {
  
    let endpoint = `top-properties${query}`;
    if(lat && lng){
      endpoint = `within/${distance}/center/${lat},${lng}/unit/mil${query}`;
    }
    const response = await Api.http({
      method: 'GET',
      type: 'properties',
      endpoint
    });
    this.setState({loading: false, properties: response.documents, totalProperties: response.results});
  }

  onUpdate = (filters, totalFilters, latitude, longitude) => {
    //We have access to filters 
    //We need to build a query string and fetch properties
    const { maxBedroom, maxPrice, minBedroom, minPrice, searchRadius, type } = filters;
    // const { latitude, longitude } = this.state;
    const queryStr = `?bedrooms[gte]=${minBedroom}&bedrooms[lte]=${maxBedroom}&rent[gte]=${minPrice}&rent[lte]=${maxPrice}`;
    this.setState({loading: true, filters, totalFilters, distance: filters.searchRadius});
    this.makeRequestToGetProperties(latitude, longitude, searchRadius, queryStr);
    
  }

  onDistancePickerHandler = (distance, index) => {
    //Here we have access to the selected radius in miles
    this.setState({ distance, loading: true, filters: {...this.state.filters, searchRadius: distance}}, 
      () => this.makeRequestToGetProperties(this.state.latitude, this.state.longitude, this.state.distance));
  }

  onLocationSelectedHandler = async (data, details= null) => { 
    this.setState({loading: true})
  // 'details' is provided when fetchDetails = true
    const searchCoords = await Api.google(data.place_id);
    const { lat, lng } = searchCoords.result.geometry.location;
    // Make request to backend to fetch properties
    this.makeRequestToGetProperties(lat, lng);
    this.setState({latitude: lat, longitude: lng});
  }

  renderProperties = () => {
    return this.state.properties.map(property => (
      <Fragment key={property._id}>
        <PropertyCard {...property} />
        <View style={styles.seperator} />
      </Fragment>
    ));
  }

  renderPickerIcon = () => <Icon.Ionicons name="md-arrow-down" size={22} color='#959595' />
  //Use rapid Api to fetch towns close by and render on top of screen for quick filters 

  quickFilters = () => {

  }

  onCloseFilters = () => this.setState({ showFilters: false });

  // Sort properties 
  onSortSelect = () => {

  }

  onOpenFilters = () => {
    this.setState({showFilters: true})
  }

  render(){
    const { distance, pickerItems, currAddress, loading, properties, filters, showFilters, sortItems, totalFilters, totalProperties, latitude, longitude } = this.state;
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
            getDefaultValue={() => this.state.currAddress}
            query={{key: expo.googleMaps.APIKey,language: 'en', components: 'country:gb'}}
            styles={{...googleInput, textInputContainer: {marginTop: 10, justifyContent: 'center', backgroundColor: '#4bd4b0', borderRadius: Platform.OS === 'ios' ? 4 : 8}}}
            currentLocation={true} 
            currentLocationLabel="Use current location"
            debounce={200}
            enablePoweredByContainer={false}
            renderRightButton={() => <Image source={IconsPDP.tabs.locationWhite} style={[styles.icon, {alignSelf: 'center'}]}/>}
          />

          <View style={styles.pickerContainer}>
            <Picker
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
        <View style={styles.filters}>
          <Picker
            placeholder={{}}
            hideIcon
            style={{ ...pickerStyles }}
            onValueChange={this.onSortSelect}
            items={sortItems}
            >
            <View style={styles.sort}>
              <Icon.Ionicons name="ios-arrow-down" size={14} color="#999ca4" />
              <Text style={styles.filterText} black mediumWeight>
                Sort
              </Text>
            </View>
          </Picker>         
          <BlankButton style={styles.filter} onPress={this.onOpenFilters}>
              <View style={styles.numFilters}>
                <Text small type="w">
                  {totalFilters.length}
                </Text>
              </View>
            <Text style={styles.filterText} black mediumWeight>
              Filter
            </Text>
            <Icon.Ionicons name="ios-arrow-down" size={19} color="#999ca4" />
          </BlankButton>
        </View>
        {
        !loading && properties && properties.length === 0 ? 
        <View style={styles.noSearchResults}>
          <Text>0 search results.</Text>
          <Text>Please change search criteria.</Text>
        </View> : null
        }
        {loading || !properties ? <Loader /> : 
        //This should be flat list
          <ScrollView keyboardShouldPersistTaps='handled' style={styles.scrollContainer}>
            {this.renderProperties()}
          </ScrollView>
        }
        {showFilters ? (
        <Modal
          animationType="slide"
          transparent={false}
          visible={true}
          onRequestClose={this.onCloseFilters || false}
          >
          <Filters
            loading={loading}
            onUpdate={this.onUpdate}
            onDone={this.onCloseFilters}
            totalProperties={totalProperties}
            filters={filters}
            totalFilters={totalFilters}
            currAddress={currAddress}
            onLocationSelect={this.onLocationSelectedHandler}
            latitude={latitude}
            longitude={longitude}
          />
        </Modal>
        ) : null}
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
    paddingTop: 10,
    paddingHorizontal: 10
  },
  searchContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pickerContainer:  {
    justifyContent: 'center', 
    alignItems: 'center', 
    alignSelf: 'flex-start', 
    marginTop: 10
  },
  scrollContainer: {
    paddingBottom: 10
  },
  filterText: {
    marginHorizontal: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  }, 
  seperator: {
    height: 15
  }, 
  noSearchResults: {
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 50
  }, 
  filters: {
  paddingHorizontal: 15,
  marginVertical: 10,
  borderRadius: 5,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  backgroundColor: '#fff',
  zIndex: 20,
  ...Platform.select({
      ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
      },
      android: {
          elevation: 1,
      },
  })
  },
  sort: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  numFilters: {
    height: 20,
    width: 20,
    backgroundColor: '#4BD4B0',
    alignItems: 'center',
    marginRight: 2,
    justifyContent: 'center',
    borderRadius: 100,
},
});
// Filter picker 
const pickerStyles = StyleSheet.create({
  viewContainer: {
      borderWidth: 0,
  },
  underline: {
      borderTopWidth: 0,
  },
  icon: {},
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
// Google search radius picker 
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