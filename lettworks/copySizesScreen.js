import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from 'redux/actions/user';
import { StyleSheet, View, Image, ScrollView } from 'react-native';

import { Text } from 'atoms';
import { TouchableItem } from 'components';

import Container from './components/Container';
import Heading from './components/Heading';
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';

import { AppOnboarding } from 'config/AppOnboarding';
import Icons from 'config/Icons';
import Constants from 'config/constants';

import { salePrice, rentPrice } from 'data/prices';

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
        this.props.navigation.navigate('Prices');
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
        this.bedroomScroll.scrollTo({ x: xVal - ((Constants.screen.width - 30) / 2), animated: false });
    }

    propertyTypeLayout = (selectedType, selectedPropertyType) => {
        const location = this.state[selectedType ? selectedType : 'sale'].propertyType.indexOf(selectedPropertyType);
        const xVal = 60 * (location + 1);
  
        this.propertyTypeScroll.scrollTo({ x: xVal - ((Constants.screen.width - 80) / 2), animated: false });
    }
    minPriceLayout = (selectedType, selectedMinPrice) => {
      const location = this.state[selectedType ? selectedType : 'sale'].minPrice.indexOf(selectedMinPrice);
      const xVal = 60 * (location + 1);
      let animWidth;
      animWidth = selectedType === 'sale' ? 170 : 110;
      this.minPriceScroll.scrollTo({ x: xVal - ((Constants.screen.width - animWidth) / 2), animated: false });
    }
    maxPriceLayout = (selectedType, selectedMaxPrice) => {
      const location = this.state[selectedType ? selectedType : 'sale'].maxPrice.indexOf(selectedMaxPrice);
      const xVal = 60 * (location + 1);
      let animWidth;
      animWidth = selectedType === 'sale' ? 1370 : 290;

      this.maxPriceScroll.scrollTo({ x: xVal - ((Constants.screen.width - animWidth) / 2), animated: false });
    }
    
    onSelectType = (selectedType) => {

        let { selectedBedroom, selectedPropertyType, selectedMinPrice, selectedMaxPrice } = this.state;
        if (!selectedBedroom) selectedBedroom = 3;
        else if (!this.state[selectedType].bedroom.includes(selectedBedroom)) selectedBedroom = 3;
        if (!selectedPropertyType) selectedPropertyType = "House";
        else if (!this.state[selectedType].propertyType.includes(selectedPropertyType)) selectedPropertyType = 'House';
        if (!selectedMinPrice) selectedMinPrice = selectedType === 'sale' ? "100K" : 700;
        else if (!this.state[selectedType].minPrice.includes(selectedMinPrice)) selectedMinPrice = selectedType === 'sale' ? "100K" : 700;
        if (!selectedMaxPrice) selectedMaxPrice = selectedType === 'sale' ? "700K" : 2500;
        else if (!this.state[selectedType].maxPrice.includes(selectedMaxPrice)) selectedMaxPrice = selectedType === 'sale' ? "700K" : 2500;
        this.setState({ selectedBedroom, selectedPropertyType, selectedType, selectedMinPrice, selectedMaxPrice });
        this.bedroomsLayout(selectedType, selectedBedroom);
        this.propertyTypeLayout(selectedType, selectedPropertyType);
        this.minPriceLayout(selectedType, selectedMinPrice);
        this.maxPriceLayout(selectedType, selectedMaxPrice);
    }

    onNextSelect = async () => {
        try {
            await this.props.updateUser({
                preferences: {
                    type: this.state.selectedType || undefined,
                    bedrooms: this.state.selectedBedroom || undefined,
                    propertyType: this.state.selectedPropertyType || undefined
                }
            });
        }
        catch (ex) {
            console.log('ERROR UPDATE', ex.message);
        }
        this.onNext();
    }

    render() {
        const { selectedType, selectedBedroom, selectedPropertyType, selectedMinPrice, selectedMaxPrice } = this.state;
        const mapSizes = selectedType ? selectedType : 'sale';

        return (
            <Container>
                <TopBar onSkip={this.onNext} />
                <Heading title={`Search property${'\n'}for?`} />

                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                    
                <TouchableItem onPress={() => this.onSelectType('sale')} style={[{ marginRight: 20 }, styles.selectedType__link]}>
                        <View>
                            <View style={[styles.selectedType__boxWrap, selectedType === 'sale' ? styles.selectedType__boxWrap_active : null]}>

                                {/* <Image style={styles.selectedType__image} source={AppOnboarding.men} /> */}

                                <View style={styles.selectedType__box}>
                                  <Text extraLarge bold type='w'>For sale</Text>
                                </View>

                                {selectedType === 'sale' ?
                                    <View style={styles.selectedType__tickContainer}>
                                        <Image style={styles.selectedType__tick} source={Icons.solidTickWhite} />
                                    </View>
                                    : null
                                }
                            </View>
                        </View>
                    </TouchableItem>

                    <TouchableItem onPress={() => this.onSelectType('rent')} style={styles.selectedType__link}>
                        <View>
                            <View style={[styles.selectedType__boxWrap, selectedType === 'rent' ? styles.selectedType__boxWrap_active : null]}>

                                {/* <Image style={styles.selectedType__image} source={AppOnboarding.women} /> */}

                                <View style={styles.selectedType__box}>
                                  <Text extraLarge bold type='w'>To rent</Text>
                                </View>

                                {selectedType === 'rent' ?
                                    <View style={styles.selectedType__tickContainer}>
                                        <Image style={styles.selectedType__tick} source={Icons.solidTickWhite} />
                                    </View>
                                    : null
                                }
                            </View>

                            
                        </View>
                    </TouchableItem>
                   

                </View>

                <View style={[selectedType ? { opacity: 1 } : { opacity: 0.2 }, { marginBottom: 20 }]}>
                    <View style={styles.selectRow}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text bold extraLarge type='w'>Bedrooms</Text>
                        </View>
                        <View style={styles.selector}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={r => this.bedroomScroll = r}>
                                {this.state[mapSizes].bedroom.map(size => {
                                    return (
                                        <TouchableItem key={size} style={[styles.button, selectedType && selectedBedroom === size ? styles.buttonSelected : null]} onPress={() => this.onSelect(size, 'bedroom')}>
                                            <Text bold medium type='w'>{size}</Text>
                                        </TouchableItem>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.selectRow}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text bold extraLarge type='w'>Property type</Text>
                        </View>
                        <View style={styles.selector}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={r => this.propertyTypeScroll = r}>
                                {this.state[mapSizes].propertyType.map(type => {
                                    return (
                                        <TouchableItem key={type} style={[styles.button, selectedType && selectedPropertyType === type ? styles.buttonSelected : null]} onPress={() => this.onSelect(type, 'propertyType')}>
                                            <Text bold medium type='w'>{type}</Text>
                                        </TouchableItem>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.selectRow}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text bold extraLarge type='w'>Min price (£)</Text>
                        </View>
                        <View style={styles.selector}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={r => this.minPriceScroll = r}>
                                {this.state[mapSizes].minPrice.map(price => {
                                    return (
                                        <TouchableItem key={price} style={[styles.button, selectedType && selectedMinPrice === price ? styles.buttonSelected : null]} onPress={() => this.onSelect(price, 'minPrice')}>
                                            <Text bold medium type='w'>{price}</Text>
                                        </TouchableItem>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.selectRow}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text bold extraLarge type='w'>Max price (£)</Text>
                        </View>
                        <View style={styles.selector}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={r => this.maxPriceScroll = r}>
                                {this.state[mapSizes].maxPrice.map(price => {
                                    return (
                                        <TouchableItem key={price} style={[styles.button, selectedType && selectedMaxPrice === price ? styles.buttonSelected : null]} onPress={() => this.onSelect(price, 'maxPrice')}>
                                            <Text bold medium type='w'>{price}</Text>
                                        </TouchableItem>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </View>
                    
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
    selectRow: {
        marginVertical: 10
    },
    selector: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 10
    },

    selectedType__boxWrap_active: {
        opacity: 0.5,
    },


    selectedType__link: {
      flex: 1,
      width: Constants.screen.width / 2 - 25,
      position: 'relative'
    },
    selectedType__boxWrap: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },

    selectedType__box: {
        width: Constants.screen.width / 2 - 25,
        height: Constants.screen.width / 3 - 25,
        backgroundColor: '#4BD4B0', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: 3
    },
    selectedType__tickContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 55,
        bottom: 0,
        zIndex: 10
    },
    selectedType__tick: {
        position: 'relative',
        zIndex: 10,
        width: 20,
        height: 20
    },
    separator: {
        borderWidth: 0.5,
        borderColor: '#FFF',
        marginBottom: 5
    },
    button: {
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        width: 60,
        height: 40
    },
    buttonSelected: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#4BD4B0'
    }
});