import React from 'react';
import { View, SafeAreaView, TouchableOpacity, StyleSheet, Platform, Image, Dimensions } from 'react-native';
import { Text } from 'atoms';
import { HeaderMiddle } from 'components/Header';
import { Icon } from 'components';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { expo } from '../../app.json';
import { googleInput } from 'services/globalStyles';
import { IconsPDP } from 'config/AppIcons/AppIcons';
import Api from 'services/api';
import { TabView, TabBar } from 'react-native-tab-view';
import FilterRent from './FilterRent';
import FilterSale from './FilterSale';
import { defaultRent, defaultSale } from 'data';

export default class FiltersScreen extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      filters: props.filters || {},
      totalFilters: props.totalFilters || [],
      currAddress: props.currAddress || '',
      index: props.type === 'sale' ? 0 : 1,
      type: props.type,
      routes: [
        { key: 'sale', title: 'For sale' },
        { key: 'rent', title: 'For rent' },
      ]
    };
  }

  onTotalFilters = (name) => {
    let totalFilters = [...this.state.totalFilters];
    const index = totalFilters.indexOf(name);
    if(index === -1) totalFilters.push(name);
    return totalFilters;
  }
  // swap values to make sure min !> max min price less than max price etc.
  onAdjustValues = (value, name) => {
    const { type } = this.state;
    if(name === 'searchRadius'){
      const totalFilters = this.onTotalFilters(name);
      const filters = {...this.state.filters}
      filters[type].searchRadius = value;
      return this.setState({filters, totalFilters}, () => this.props.onUpdate(filters[type],totalFilters));
    };

    let { minBedroom, maxBedroom, minPrice, maxPrice } = this.state.filters[type];
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
    const filters = {...this.state.filters};
    const selectedFilter = filters[type];
    const newFilters = {...selectedFilter, minBedroom, maxBedroom, minPrice, maxPrice}
    filters[type] = newFilters;
    this.setState({filters, totalFilters}, 
      () => this.props.onUpdate(newFilters, totalFilters));
  }

  // Takes value of slider and sets new currFilters
  onSliderSelected = (value, name) => {
    const { type } = this.state;
    const filters = {...this.state.filters};
    const selectedFilter = filters[type];
    selectedFilter[name] = value;
    filters[type] = selectedFilter;
    this.setState({filters});

  }

  onReset = () => {
    const filters = {...this.state.filters}
    const { type } = this.state;
    filters[type] = type === 'rent' ? {...defaultRent} : {...defaultSale}
    this.setState({filters, totalFilters: [], index: type === 'rent' ? 1 : 0}, () => this.props.onUpdate(filters[type], this.state.totalFilters));
  }

  onLocationSelected = async (data, details = null) => {
  // 'details' is provided when fetchDetails = true
    const searchCoords = await Api.google(data.place_id);
    const currAddress = data.description;
    const { lat, lng } = searchCoords.result.geometry.location;
    this.setState({currAddress}, 
    () => this.props.onUpdate(
      this.state.filters[this.state.type], 
      this.state.totalFilters,
      lat, 
      lng, 
      this.state.currAddress
    ));
  }

  renderScene = ({ route }) => {
    const { filters } = this.state;
    const { onDone, loading, totalProperties } = this.props;
    switch (route.key) {
      case 'sale':
        return <FilterSale 
                filters={filters.sale} 
                onSliderSelected={this.onSliderSelected} 
                onAdjustValues={this.onAdjustValues}
                totalProperties={totalProperties}
                onDone={onDone}
                loading={loading} />;
      case 'rent':
        return <FilterRent 
                filters={filters.rent} 
                onSliderSelected={this.onSliderSelected} 
                onAdjustValues={this.onAdjustValues}
                totalProperties={totalProperties}
                onDone={onDone} 
                loading={loading} />;
      default:
        return null;
    }
  };

  onTabPress = ({ route, preventDefault }) => {
    //route key is tab going => to
    let newFilters, type;
    const filters = {...this.state.filters}
    if(route.key === 'rent'){
      newFilters = filters['rent'];
      type = 'rent';
    }else {
      newFilters = filters['sale'];
      type = 'sale';
    }
    this.setState({type}, () => this.props.onUpdate(newFilters, this.state.totalFilters));
  }

  render() {  

    const { currAddress } = this.state;

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
        <View style={styles.searchContainer}>
          <GooglePlacesAutocomplete
            placeholder={currAddress}
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} 
            keyboardAppearance={'light'}
            listViewDisplayed={false} // true/false/undefined
            fetchDetails={false}
            onPress={this.onLocationSelected}
            getDefaultValue={() => ''}
            // renderDescription={row =>
            //   row.description || row.formatted_address || row.name
            // }
            query={{key: expo.android.config.googleMaps.apiKey,language: 'en', components: 'country:gb'}}
            styles={{...googleInput, textInputContainer: {marginTop: 10, justifyContent: 'center', backgroundColor: '#4bd4b0', borderRadius: Platform.OS === 'ios' ? 4 : 8}}}
            currentLocation={true} 
            currentLocationLabel="Use current location"
            debounce={200}
            enablePoweredByContainer={false}
            // nearbyPlacesAPI={'GoogleReverseGeocoding'}
            renderRightButton={() => <Image source={IconsPDP.tabs.locationWhite} style={[styles.icon, {alignSelf: 'center'}]}/>}
          />
        </View>

          <TabView
            navigationState={this.state}
            renderScene={this.renderScene}
            onIndexChange={index => this.setState({ index })}
            initialLayout={{ width: Dimensions.get('window').width }}
            swipeEnabled={false}
            renderTabBar={(props) => <TabBar
              {...props}
              style={styles.tabBar}
              indicatorStyle={styles.indicator}
              labelStyle={styles.label}
              onTabPress={this.onTabPress}
            />}
          />
    
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1, 
    position: 'relative'
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
  separator: {
    borderWidth: 0.5,
    borderColor: '#eee',
    marginBottom: 25
  }, 
  filtersContainer: {
    justifyContent: 'space-between', 
    flex: 1, 
  },  
  icon: {
    width: 20,
    height: 20,
    marginRight: 5
  }, 
  scene: {
    flex: 1
  }, 
  searchContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  indicator: {
      backgroundColor: '#4bd4b0',
  },
  label: {
      color: '#111',
      fontFamily: 'Regular',
  },
  tabBar: {
      backgroundColor: '#fff',
      position: 'relative',
      paddingVertical: 10, 
      borderTopWidth: 0.33, 
      borderTopColor: '#f7f7f7'
  }
});