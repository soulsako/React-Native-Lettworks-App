import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from 'redux/actions/user';
import { StyleSheet, View } from 'react-native';

import Container from './components/Container';
import Heading from './components/Heading';
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';

import Slider from './components/Slider';
import SelectBox from './components/SelectBox';
import Constants from 'config/constants';

import { salePrice, rentPrice } from 'data';

class SizesScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedType: null,
            selectedBedroom: null,
            selectedPropertyType: null,
            selectedMinPrice: null,
            selectedMaxPrice: null,
            sale: {
              bedroom: [1, 2, 3, 4, 5, 6], 
              propertyType: ['Flat', 'House', 'All'], 
              minPrice: salePrice, 
              maxPrice: salePrice 
            },
            rent: {
              bedroom: [1, 2, 3, 4, 5, 6],
              propertyType: ['Flat', 'House', 'All'], 
              minPrice: rentPrice, 
              maxPrice: rentPrice
            }
        }


    }

    onNext = () => {
        this.props.navigation.navigate('Location');
    }

    onBack = () => {
        this.props.navigation.navigate('Personalise');
    }

    onSelect = (size, type) => {
        if (type === 'bedroom') {
          this.setState({ selectedBedroom: size })
        } else if(type === 'propertyType') {
          this.setState({ selectedPropertyType: size })
        } else if(type === 'minPrice'){
          this.setState({ selectedMinPrice: size })
        }else {
          this.setState({ selectedMaxPrice: size })
        }
    }

    bedroomsLayout = (selectedType, selectedBedroom) => {
      const location = this.state[selectedType ? selectedType : 'sale'].bedroom.indexOf(selectedBedroom); // it will be 1 at first
      const xVal = 60 * (location + 1); // 120 - half screen width
      this.scrollRef.scrollTo({ x: xVal - ((Constants.screen.width - 40) / 2), animated: false });
    }

    propertyTypeLayout = (selectedType, selectedPropertyType) => {
      const location = this.state[selectedType ? selectedType : 'sale'].propertyType.indexOf(selectedPropertyType);
      const xVal = 60 * (location + 1);
      this.scrollRef.scrollTo({ x: xVal - ((Constants.screen.width - 60) / 2), animated: false });
    }
    minPriceLayout = (selectedType, selectedMinPrice) => {
      const location = this.state[selectedType ? selectedType : 'sale'].minPrice.indexOf(selectedMinPrice);
      const xVal = 60 * (location + 1);
      this.scrollRef.scrollTo({ x: xVal - ((Constants.screen.width - 60) / 2), animated: false });
    }
    maxPriceLayout = (selectedType, selectedMaxPrice) => {
      const location = this.state[selectedType ? selectedType : 'sale'].maxPrice.indexOf(selectedMaxPrice);
      const xVal = 60 * (location + 1);
      this.scrollRef.scrollTo({ x: xVal - ((Constants.screen.width - 60) / 2), animated: false });
    }
    
    onSelectType = (selectedType) => {
        let { selectedBedroom, selectedPropertyType, selectedMinPrice, selectedMaxPrice } = this.state;
        //Set default values for selectors 
        if (!selectedBedroom) selectedBedroom = 3;

        // // Set default values for selectors when toggling between sale and rent
        else if (!this.state[selectedType].bedroom.includes(selectedBedroom)) selectedBedroom = 3;
        if (!selectedPropertyType) selectedPropertyType = "House";
        else if (!this.state[selectedType].propertyType.includes(selectedPropertyType)) selectedPropertyType = 'House';
        if (!selectedMinPrice) selectedMinPrice = selectedType === 'sale' ? "200K" : 700;
        else if (!this.state[selectedType].minPrice.includes(selectedMinPrice)) selectedMinPrice = selectedType === 'sale' ? "200K" : 700;
        if (!selectedMaxPrice) selectedMaxPrice = selectedType === 'sale' ? "700K" : 2500;
        else if (!this.state[selectedType].maxPrice.includes(selectedMaxPrice)) selectedMaxPrice = selectedType === 'sale' ? "700K" : 2500;
        this.setState({ selectedBedroom, selectedPropertyType, selectedType, selectedMinPrice, selectedMaxPrice });
        this.bedroomsLayout(selectedType, selectedBedroom);
        this.propertyTypeLayout(selectedType, selectedPropertyType);
        this.minPriceLayout(selectedType, selectedMinPrice);
        this.maxPriceLayout(selectedType, selectedMaxPrice);
    }

    onNextSelect = async () => {
      let { selectedType, selectedBedroom, selectedPropertyType, selectedMinPrice, selectedMaxPrice } = this.state;

      if(typeof(selectedMinPrice) === typeof(String())) selectedMinPrice = selectedMinPrice.replace(/K/, "000");
      if(typeof(selectedMaxPrice) === typeof(String())) selectedMaxPrice = selectedMaxPrice.replace(/K/, "000");
        try {
            await this.props.updateUser({
                preferences: {
                    type: selectedType || undefined,
                    bedrooms: selectedBedroom || undefined,
                    propertyType: selectedPropertyType || undefined, 
                    minPrice:  selectedMinPrice || undefined,
                    maxPrice: selectedMaxPrice|| undefined
                }
            });
        }
        catch (ex) {
            console.log('ERROR UPDATE', ex.message);
        }
        this.onNext();
    }

    setRef = (ref) => {
      this.scrollRef = ref;
    }

    render() {
        const { selectedType, selectedBedroom, selectedPropertyType, selectedMinPrice, selectedMaxPrice } = this.state;
        const mapSizes = selectedType ? selectedType : 'sale';
        const currentSlider= this.state[mapSizes];

        return (
            <Container>
                <TopBar onSkip={this.onNext} />
                <Heading title={`Search property${'\n'}for?`} />

                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    
                  <SelectBox onPress={() => this.onSelectType('sale')} active={selectedType === 'sale'} title="Sale" />
                  <SelectBox onPress={() => this.onSelectType('rent')} active={selectedType === 'rent'} title="Rent" />

                </View>

                <View style={[selectedType ? { opacity: 1 } : { opacity: 0.2 }, { marginBottom: 20 }]}>
                    
                  <Slider selectedType={selectedType} selectedValue={selectedBedroom} title="Bedrooms" type="bedroom" onPress={this.onSelect} scrollRef={(r) => this.scrollRef = r} currentSlider={currentSlider} />

                  <View style={styles.separator} />

                  <Slider selectedType={selectedType} selectedValue={selectedPropertyType} title="Property type" type="propertyType" onPress={this.onSelect} 
                    scrollRef={(r) => this.scrollRef = r} currentSlider={currentSlider} />

                  <View style={styles.separator} />

                  <Slider selectedType={selectedType} selectedValue={selectedMinPrice} title="Min price (£)" type="minPrice" onPress={this.onSelect} scrollRef={(r) => this.scrollRef = r} currentSlider={currentSlider} />

                  <View style={styles.separator} />

                  <Slider selectedType={selectedType} selectedValue={selectedMaxPrice} title="Max Price (£)" type="maxPrice" onPress={this.onSelect} scrollRef={(r) => this.scrollRef = r} currentSlider={currentSlider} />

                </View>

                <BottomBar selected='SizesScreen' onBack={this.onBack} onNext={this.onNextSelect} />
            </Container >
        );
    }
}

function mapStateToProps(state) {
    return {
        preferences: state.user && state.user.preferences || {}
    }
}

export default connect(mapStateToProps, { updateUser })(SizesScreen);

const styles = StyleSheet.create({
    
    separator: {
        borderWidth: 0.5,
        borderColor: '#FFF',
        marginBottom: 5
    },
    
});