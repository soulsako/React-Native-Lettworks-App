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

      componentDidMount(){
        console.log("USER from propertytype screen", this.props.user);
      }

    onNext = (selectedType) => {
        if(!selectedType) return;
        this.props.navigation.navigate('Prices');
        
    }

    onBack = () => {
        this.props.navigation.navigate('Location');
    }

    onSelect = (value, type) => {

      let { selectedMaxBedroom, selectedMinBedroom } = this.state;
      if (type === 'minBedroom') {
        if(!isNaN(value) && value > selectedMaxBedroom){
          selectedMinBedroom = selectedMaxBedroom;
          selectedMaxBedroom = value;
          this.setState({selectedMinBedroom, selectedMaxBedroom})
        }
        this.setState({ selectedMinBedroom: value })
      } else if(type === 'maxBedroom'){
        if(!isNaN(value) && value < selectedMinBedroom){
          selectedMaxBedroom = selectedMinBedroom;
          selectedMinBedroom = value;
          this.setState({selectedMaxBedroom, selectedMinBedroom})
        }
        this.setState({ selectedMaxBedroom: value })
      }
    }
    
    onSelectType = (selectedType) => {
      this.setState({ selectedType });
    }

    onNextSelect = async () => {
      let { selectedType, selectedMinBedroom, selectedMaxBedroom } = this.state;
      if(selectedMinBedroom === 'No min')selectedMinBedroom = 1;
      if(selectedMaxBedroom === 'No max')selectedMaxBedroom = 6;
        try {
          await this.props.updateUser({
            preferences: {
              type: selectedType || 'rent',
              minBedroom: selectedMinBedroom || 1,
              maxBedroom: selectedMaxBedroom || 6
            }
          });
        }
        catch (ex) {
            console.log('ERROR UPDATE', ex.message);
        }
        if(!selectedType){
          return this.props.navigation.navigate('Location');
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
                <TopBar onSkip={this.onNextSelect} hideSkip={!!selectedType} />
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
                
                <BottomBar selected='PropertyTypeScreen' onBack={this.onBack} onNext={this.onNextSelect} hideNext={!selectedType} />
            </Container>
        );
    }
}

function mapStateToprops(state){
  return {
    user: state.user
  }
}

export default connect(mapStateToprops, { updateUser })(PropertyTypeScreen);

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