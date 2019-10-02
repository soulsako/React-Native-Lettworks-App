import React from 'react';
import { View, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native';
import { Text, Button } from 'atoms';
import { HeaderMiddle } from 'components/Header';
import { Icon } from 'components';
import SelectBox from 'screens/Onboarding/components/SelectBox';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { formatNumbers } from 'config/functions';
import { Slider } from 'react-native-elements';
import { expo } from '../../app.json';
import { googleInput } from 'services/globalStyles';
import { IconsPDP } from 'config/AppIcons/AppIcons';
import Api from 'services/api';

const defaultRent = {
  maxBedroom: 6,
  maxPrice: 5000,
  minBedroom: 1,
  minPrice: 100,
  searchRadius: 40,
  type: "rent",
}

const defaultSale = {
  maxBedroom: 6,
  maxPrice: 1000000,
  minBedroom: 1,
  minPrice: 10000,
  searchRadius: 40,
  type: "sale",
}

export default class FiltersScreen extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      currFilters: props.filters || defaultSale,
      totalFilters: props.totalFilters || [],
      latitude: props.latitude || '', 
      longitude: props.longitude || '',
      currAddress: props.currAddress || '',
      renderFilters: {
        sale:[
          {minimumValue: 1, maximumValue: 6, step: 1, title: "Min Beds", name: "minBedroom"}, 
          {minimumValue: 1, maximumValue: 6, step: 1, title: "Max Beds", name: "maxBedroom"}, 
          {minimumValue: 10000, maximumValue: 1000000, step: 10000, title: "Min Price", name: "minPrice"}, 
          {minimumValue: 10000, maximumValue: 1000000, step: 10000, title: "Max Price", name: "maxPrice"}, 
          {minimumValue: 0, maximumValue: 40, step: 5, title: "Search radius", name: "searchRadius"}
        ], 
        rent:[
          {minimumValue: 1, maximumValue: 6, step: 1, title: "Min Beds", name: "minBedroom"}, 
          {minimumValue: 1, maximumValue: 6, step: 1, title: "Max Beds", name: "maxBedroom"}, 
          {minimumValue: 100, maximumValue: 5000, step: 100, title: "Min Price", name: "minPrice"}, 
          {minimumValue: 100, maximumValue: 5000, step: 100, title: "Max Price", name: "maxPrice"}, 
          {minimumValue: 0, maximumValue: 40, step: 5, title: "Search radius", name: "searchRadius"}
        ]
      } 
    };
  }

  renderFilters = () => {
    const { renderFilters, currFilters } =  this.state;
    return renderFilters[currFilters.type].map((filter, i) => {
      return (
        <View style={styles.slider} key={i}>
          <View style={styles.titlecontainer}>
            <Text black large bold>{filter.title}</Text>
            <Text black large bold>{filter.name === "minPrice" || filter.name === "maxPrice" ? `£${formatNumbers(currFilters[filter.name])}` : currFilters[filter.name]}</Text>
          </View>
          <Slider
            // style={styles.slider}
            onValueChange={(value) => this.onFilterSelected(value,filter.name)}
            minimumValue={filter.minimumValue}
            maximumValue={filter.maximumValue}
            minimumTrackTintColor="#4bd4b0"
            maximumTrackTintColor="#ddd"
            thumbTintColor="#4bd4b0"
            value={currFilters[filter.name]} //Initial value
            step={filter.step} 
            thumbStyle={styles.thumb}
            trackStyle={styles.track}
            animateTransitions={true}
            thumbTouchSize={{width: 80, height: 80}}
            onSlidingComplete={(value) => this.adjustValues(value, filter.name)}/>
        </View>
    )});
  }

  onSelect = (type) => {
    this.setState({type})
  }

  onTotalFilters = (name) => {
    let totalFilters = [...this.state.totalFilters];
    const index = totalFilters.indexOf(name);
    if(index === -1) totalFilters.push(name);
    return totalFilters;
  }
  // swap values to make sure min !> max min price less than max price etc.
  adjustValues = (value, name) => {
    
    if(name === 'searchRadius'){
      const totalFilters = this.onTotalFilters(name);
      return this.setState({currFilters: {...this.state.currFilters, searchRadius: value}, totalFilters}, () => this.props.onUpdate(this.state.currFilters, this.state.totalFilters));
    };

    let { minBedroom, maxBedroom, minPrice, maxPrice } = this.state.currFilters;
    if(name === 'minBedroom' && (value > maxBedroom)){ 
      minBedroom = value;
      // maxBedroom = value;
      maxBedroom = 6;
    }else if(name === 'maxBedroom' && (value < minBedroom)){
      maxBedroom = minBedroom;
      // minBedroom = value;
    }else if(name === 'minPrice' && (value > maxPrice)){
      minPrice = value;
      // maxPrice = value;
      maxPrice = 1000000;
    }else if(name === 'maxPrice' && (value < minPrice)){
      maxPrice = minPrice;
      // minPrice = value;
    }
    const totalFilters = this.onTotalFilters(name);
    this.setState({
      currFilters: {...this.state.currFilters, minBedroom, maxBedroom, minPrice, maxPrice}, totalFilters}, 
      () => this.props.onUpdate(this.state.currFilters, this.state.totalFilters));
  }

  onFilterSelected = (value, name) => {
    
    let newFilters = {}
    
    newFilters[name] = value;
    let copyFilters = {...this.state.currFilters};
    
    const currFilters = {...copyFilters, ...newFilters};
    
    this.setState({currFilters});
  }

  onSwitch = (type) => {
    let currFilters = {...this.state.currFilters};
    if(type === 'sale') {
      currFilters = {...defaultSale}
    }else {
      currFilters = {...defaultRent}
    }
    this.setState({currFilters, totalFilters: []}, () => this.props.onUpdate(this.state.currFilters, this.state.totalFilters));
  }

  onReset = () => {
    const currFilters = {...defaultSale}
    this.setState({currFilters, totalFilters: []}, () => this.props.onUpdate(this.state.currFilters, this.state.totalFilters));
  }

  onCloseMessage = () => {
    this.setState({error: false, errorMessage: null})
  }

  onLocationSelected = async (data, details = null) => {
  // 'details' is provided when fetchDetails = true
    const searchCoords = await Api.google(data.place_id);
    const { lat, lng } = searchCoords.result.geometry.location;
    this.setState({latitude: lat, longitude: lng}, 
    () => this.props.onUpdate(
      this.state.currFilters, 
      this.state.totalFilters,
      this.state.latitude, 
      this.state.longitude 
    ));
  }

  render() {  

    const { currFilters: {type}, currAddress } = this.state;
    const { loading, totalProperties, totalFilters } = this.props;

    return (
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity style={styles.filterButton} onPress={this.props.onDone}><View>
            <Icon.Ionicons size={20} name="md-close" color="#999CA4" /></View>
          </TouchableOpacity>

          <HeaderMiddle title="Filter" subtitle="Filters Applied" />

          <TouchableOpacity style={styles.filterButton} onPress={this.onReset}>
            <View><Text bold type="g" style={styles.textRight}>Reset</Text></View>
          </TouchableOpacity>
        </View>

        <GooglePlacesAutocomplete
          placeholder={currAddress.substring(0, 20)}
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} 
          keyboardAppearance={'light'}
          listViewDisplayed={false} // true/false/undefined
          fetchDetails={false}
          onPress={this.onLocationSelected}
          getDefaultValue={() => ''}
          renderDescription={row =>
            row.description || row.formatted_address || row.name
          }
          query={{key: expo.googleMaps.APIKey,language: 'en', components: 'country:gb'}}
          styles={{...googleInput, textInputContainer: {marginTop: 10, justifyContent: 'center', backgroundColor: '#4bd4b0', borderRadius: Platform.OS === 'ios' ? 4 : 8}}}
          currentLocation={true} 
          currentLocationLabel="Use current location"
          debounce={200}
          enablePoweredByContainer={false}
          // nearbyPlacesAPI={'GoogleReverseGeocoding'}
          renderRightButton={() => <Image source={IconsPDP.tabs.locationWhite} style={[styles.icon, {alignSelf: 'center'}]}/>}
        />

        <ScrollView contentContainerStyle={styles.filtersContainer}>
          <View style={{ flexDirection: 'row', marginVertical: 30}}>
            <SelectBox onPress={() => this.onSwitch('sale')} small active={type === 'sale'} type="sale" />
            <SelectBox onPress={() => this.onSwitch('rent')} small active={type === 'rent'} type="rent" />
          </View>

          <View style={styles.slidercontainer}>
            {this.renderFilters()}
          </View>
        </ScrollView>
      
      <View style={styles.actionButton}>
        <Button loading={loading} onPress={this.props.onDone}>View Properties ({totalProperties || 0})</Button>
      </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  header: {
      backgroundColor: '#fff',
      alignItems: 'center',
      width: '100%',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      paddingVertical: 10,
      flexDirection: 'row',
      zIndex: 20,
      ...Platform.select({
        ios: {
          paddingTop: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2
        },
        android: {
            elevation: 5,
        }
      })
  },
  filterButton: {
      paddingHorizontal: 10,
      minWidth: 70
  },
  buttonNoPadding: {
      minWidth: 70
  }, 
  textRight: {
    textAlign: 'right'
  }, 
  actionButton: {
    margin: 10
  }, 
  separator: {
    borderWidth: 0.5,
    borderColor: '#eee',
    marginBottom: 25
  }, 
  filtersContainer: {
    justifyContent: 'space-between', 
    flex: 1
  },
  slidercontainer: {
    paddingHorizontal: 15
  },
  slider: {
    marginBottom: 25
  }, 
  titlecontainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between'
  }, 
  thumb: {
    height: 17, 
    width: 17, 
    borderRadius: 17,
  }, 
  track: {
    height: 4
  }, 
  icon: {
    width: 20,
    height: 20,
    marginRight: 5
  }
});