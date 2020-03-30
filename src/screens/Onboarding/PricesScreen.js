import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { updateUser } from 'redux/actions/user';
import { connect } from 'react-redux';
import { minSalePrice, maxSalePrice, minRentPrice, maxRentPrice } from 'data';
import TopBar from './components/TopBar';
import Heading from './components/Heading';
import Slider from 'components/Slider';
import BottomBar from './components/BottomBar';
import Container from './components/Container';
import { createIconSetFromFontello } from '@expo/vector-icons';

class PricesScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedMinPrice: "No min",
      selectedMaxPrice: "No max",
      selectedRadius: 1,
      selectedType: props.preferences.type || 'rent',
      sale: {
        minPrice: minSalePrice,
        maxPrice: maxSalePrice
      }, 
      rent: {
        minPrice: minRentPrice, 
        maxPrice: maxRentPrice
      }, 
      searchRadius: [1, 3, 5, 10, 15, 20, 30, 40]
    }
  }

  componentDidMount(){
    console.log("PREFERENCES from price screen", this.props.preferences);
  }
  
  onSelect = (value, type) => {

    const { selectedMinPrice, selectedMaxPrice } = this.state;

    if (type === 'minPrice') {
      if(!isNaN(value) && value > selectedMaxPrice){
        selectedMinPrice = selectedMaxPrice;
        selectedMaxPrice = value;
        this.setState({selectedMinPrice, selectedMaxPrice})
      }
      this.setState({ selectedMinPrice: value })
    } else if(type === 'maxPrice'){
      if(!isNaN(value) && value < selectedMinPrice) {
        value = selectedMinPrice
        this.setState({ selectedMaxPrice: value })
      };
      this.setState({ selectedMaxPrice: value })
    }else {
      this.setState({ selectedRadius: value })
    }
  }

  onNextSelect = async () => {

  let { selectedMinPrice, selectedMaxPrice, selectedRadius, selectedType } = this.state;

  if(typeof(selectedMinPrice) === typeof(String())) selectedMinPrice = Number(selectedMinPrice.replace(/K/, "000"));
  if(typeof(selectedMaxPrice) === typeof(String())) selectedMaxPrice = Number(selectedMaxPrice.replace(/K/, "000"));
  if(selectedType === 'rent' && selectedMinPrice === 'No min') selectedMinPrice = 100;
  if(selectedType === 'rent' && selectedMaxPrice === 'No max') selectedMaxPrice = 10000;
  if(selectedType === 'sale' && selectedMinPrice === 'No min') selectedMinPrice = 10000;
  if(selectedType === 'sale' && selectedMinPrice === 'No max') selectedMaxPrice = 1000000;

    try {
      await this.props.updateUser({
        preferences: {
          minPrice:  selectedMinPrice || 100,
          maxPrice: selectedMaxPrice || 5000, 
          searchRadius: selectedRadius || 40 
        }
      });
    }
    catch (ex) {
      console.log('ERROR UPDATE', ex.message);
    }
    this.onNext();
  }

  onBack = () => {
    this.props.navigation.navigate('Property');
  }

  onNext = () => {
    this.props.navigation.navigate('Notifications');
  }

  render() {
      
  const { selectedType, selectedMinPrice, selectedMaxPrice, selectedRadius, searchRadius } = this.state;

  // if(!selectedType) return <Loader />;
  const minValue = this.state[selectedType].minPrice;
  const maxValue = this.state[selectedType].maxPrice;

    return (
        <Container>
          <TopBar onSkip={this.onNextSelect} />
          <Heading title={`Select price and ${'\n'}search radius?`} />

          <View style={[selectedType ? { opacity: 1 } : { opacity: 0.2 }, { marginBottom: 20 }]}>
              
            <Slider values={minValue} selectedValue={selectedMinPrice} title="Min price (£)" onPress={(el) => this.onSelect(el, 'minPrice')} scrollRef={(r) => this.scrollRef = r} />

            <View style={styles.separator} />

            <Slider values={maxValue} selectedValue={selectedMaxPrice} title="Max Price (£)" onPress={(el) => this.onSelect(el, 'maxPrice')} 
              scrollRef={(r) => this.scrollRef = r} />

            <View style={styles.separator} />

            <Slider values={searchRadius} selectedValue={selectedRadius} title="Search radius (mil)" onPress={(el) => this.onSelect(el, 'radius')} scrollRef={(r) => this.scrollRef = r} />

            <View style={styles.separator} />

          </View>

          <BottomBar selected='PricesScreen' onBack={this.onBack} onNext={this.onNextSelect} />
        </Container >
    );
  }
}

function mapStateToProps(state) {
  return {
      preferences: state.user && state.user.preferences || {}
  }
}

export default connect(mapStateToProps, { updateUser })(PricesScreen);

const styles = StyleSheet.create({
  
  separator: {
      borderWidth: 0.5,
      borderColor: '#eee',
      marginBottom: 25
  }, 
  actionButton: {
    width: '40%',
    height: 40
  }
  
});


