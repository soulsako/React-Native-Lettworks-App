import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from 'redux/actions/user';
import { StyleSheet, View } from 'react-native';

import Container from './components/Container';
import Heading from './components/Heading';
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';

import Slider from 'components/Slider';
import SelectBox from './components/SelectBox';
import Constants from 'config/constants';
import { Button } from 'atoms';

class PropertyTypeScreen extends React.PureComponent {

    constructor(props) {
      super(props);
      this.state = {
        selectedType: null,
        selectedMinBedroom: "No min",
        selectedMaxBedroom: "No max",
        minBedroom: ["No min", 1, 2, 3, 4, 5, 6],
        maxBedroom: ["No max", 1, 2, 3, 4, 5, 6],
        }
      }

    onNext = (selectedType) => {
        if(!selectedType) return;
        this.props.navigation.navigate('Prices');
        
    }

    onBack = () => {
        this.props.navigation.navigate('Personalise');
    }

    onSelect = (value, type) => {
        if (type === 'minBedroom') {
          this.setState({ selectedMinBedroom: value })
        } else if(type === 'maxBedroom'){
          this.setState({ selectedMaxBedroom: value })
        }
    }
    
    onSelectType = (selectedType) => {
      this.setState({ selectedType });
    }

    onNextSelect = async () => {
      let { selectedType, selectedMinBedroom, selectedMaxBedroom } = this.state;
      if(!selectedType) selectedType = 'rent';
        try {
          await this.props.updateUser({
            preferences: {
              type: selectedType,
              minBedroom: selectedMinBedroom,
              maxBedroom: selectedMaxBedroom
            }
          });
        }
        catch (ex) {
            console.log('ERROR UPDATE', ex.message);
        }
        this.onNext(selectedType);
    }

    setRef = (ref) => {
      this.scrollRef = ref;
    }

    render() {

        const { selectedType, selectedMinBedroom, selectedMaxBedroom, minBedroom, maxBedroom } = this.state;

        return (
            <Container>
                <TopBar onSkip={this.onNextSelect} />
                <Heading title={`Search property${'\n'}for?`} />

                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <SelectBox onPress={() => this.onSelectType('sale')} active={selectedType === 'sale'} type="sale" />
                  <SelectBox onPress={() => this.onSelectType('rent')} active={selectedType === 'rent'} type="rent" />
                </View>
 
                <View style={[selectedType ? { opacity: 1 } : { opacity: 0.2 }, { marginBottom: 20 }]}>
                  <Slider values={minBedroom} selectedValue={selectedMinBedroom} title="Bedrooms (min)" onPress={(value) => this.onSelect(value,'minBedroom')} scrollRef={(r) => this.scrollRef = r} />
                  <View style={styles.separator} />
                  <Slider values={maxBedroom} selectedValue={selectedMaxBedroom} title="Bedrooms (max)" onPress={(value) => this.onSelect(value,'maxBedroom')} scrollRef={(r) => this.scrollRef = r} />
                  <View style={styles.separator} />
                </View>

                <View>
                  <Button style={styles.buttonContainer} disabled={!selectedType} buttonStyle={styles.actionButton} onPress={this.onNextSelect} colour='black'>Next</Button>
                </View>
                
                <BottomBar selected='PropertyTypeScreen' onBack={this.onBack} onNext={this.onNextSelect} hideNext />
            </Container >
        );
    }
}

export default connect(null, { updateUser })(PropertyTypeScreen);

const styles = StyleSheet.create({
    
  separator: {
      borderWidth: 0.5,
      borderColor: '#eee',
      marginBottom: 25
  }, 
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  actionButton: {
    width: '40%',
    height: 40
  }
});