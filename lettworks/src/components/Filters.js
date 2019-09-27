import React from 'react'
import { View, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { Text, Button } from 'atoms'
import { HeaderMiddle } from 'components/Header'
import { Icon } from 'components'
import SelectBox from 'screens/Onboarding/components/SelectBox';
import { formatNumbers } from 'config/functions';
import { Slider } from 'react-native-elements';

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
      loading: props.loading, 
      selectedFilter: true, 
      total: 0,
      disableFilter: false,
      currFilters: props.preferences || defaultSale,
      renderFilters: {
        sale:[
          {minimumValue: 1, maximumValue: 6, step: 1, title: "Min Beds", name: "minBedroom"}, 
          {minimumValue: 1, maximumValue: 6, step: 1, title: "Max Beds", name: "maxBedroom"}, 
          {minimumValue: 10000, maximumValue: 1000000, step: 10000, title: "Min Price", name: "minPrice"}, 
          {minimumValue: 10000, maximumValue: 1000000, step: 10000, title: "Max Price", name: "maxPrice"}, 
          {minimumValue: 0, maximumValue: 40, step: 5, title: "Radius", name: "searchRadius"}
        ], 
        rent:[
          {minimumValue: 1, maximumValue: 6, step: 1, title: "Min Beds", name: "minBedroom"}, 
          {minimumValue: 1, maximumValue: 6, step: 1, title: "Max Beds", name: "maxBedroom"}, 
          {minimumValue: 100, maximumValue: 5000, step: 100, title: "Min Price", name: "minPrice"}, 
          {minimumValue: 100, maximumValue: 5000, step: 100, title: "Max Price", name: "maxPrice"}, 
          {minimumValue: 0, maximumValue: 40, step: 5, title: "Radius", name: "searchRadius"}
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
            thumbTouchSize={{width: 60, height: 60}}
            onSlidingComplete={(value) => this.swapValues(value, filter.name)}/>
        </View>
    )});
  }

  onSelect = (type) => {
    this.setState({type})
  }
  // swap values to make sure min !> max min price less than max price etc.
  swapValues = (value, name) => {
    
    if(name === 'searchRadius'){
      return this.setState({currFilters: {...this.state.currFilters, searchRadius: value}})
    };

    let { minBedroom, maxBedroom, minPrice, maxPrice } = this.state.currFilters;
    if(name === 'minBedroom' && (value > maxBedroom)){ //value = 5 and max = 3
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
    this.setState({currFilters: {...this.state.currFilters, minBedroom, maxBedroom, minPrice, maxPrice}});
  }

  onFilterSelected = (value, name, switchType) => {
    let newFilters = {}
    newFilters[name] = value;
    let copyFilters = {...this.state.currFilters};
    if(switchType && value === 'sale') {
      copyFilters = {...defaultSale}
    }else if(switchType && value === 'rent'){
      copyFilters = {...defaultRent}
    }
    const currFilters = {...copyFilters, ...newFilters}
    this.setState({currFilters}, () => this.props.onFilteresSelected(this.state.currFilters));
  }

  logResults = () => {
    // This function will run in the parent component and will take the selected filters object as argument
  }

  onReset = () => {
    const currFilters = {...defaultSale}
    this.setState({currFilters}, () => this.props.onFilteresSelected(this.state.currFilters));
  }

  onCloseMessage = () => {
    this.setState({error: false, errorMessage: null})
  }

  render() {  
    const { loading, selectedFilter } = this.state;
    const { total } = this.props;
    const { type } = this.state.currFilters;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            {/* {selectedFilter ? 
            <TouchableOpacity style={styles.buttonNoPadding} onPress={this.clearSelectedFilter}>
              <View>
                <NavBackArrow />
              </View>
            </TouchableOpacity>: */}
            <TouchableOpacity style={styles.filterButton} onPress={this.onDone}><View>
                <Icon.Ionicons size={20} name="md-close" color="#999CA4" /></View>
            </TouchableOpacity>

            <HeaderMiddle title="Filter" subtitle="Filters Applied" />

            <TouchableOpacity style={styles.filterButton} onPress={this.onReset}>
                <View><Text bold type="g" style={styles.textRight}>Reset</Text></View>
            </TouchableOpacity>
        </View>

        <ScrollView contentContainer={styles.filtersContainer}>
          <View style={{ flexDirection: 'row', marginVertical: 30}}>
            <SelectBox onPress={() => this.onFilterSelected('sale', 'type', true)} small active={type === 'sale'} type="sale" />
            <SelectBox onPress={() => this.onFilterSelected('rent', 'type', true)} small active={type === 'rent'} type="rent" />
          </View>

          <View style={styles.slidercontainer}>
            {this.renderFilters()}
          </View>
            
        </ScrollView>

        <View style={styles.actionButton}>
            <Button loading={loading} onPress={this.onDone}>View Items ({total || 0})</Button>
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
  }
});
