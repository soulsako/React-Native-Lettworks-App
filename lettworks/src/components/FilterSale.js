import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { formatNumbers } from 'config/functions';
import { Slider } from 'react-native-elements';
import { Text, Button } from 'atoms';

export default class FilterSale extends Component {

  constructor(props) {
    super(props);
    this.state = {
      saleSliders:[
        {minimumValue: 1, maximumValue: 6, step: 1, title: "Min Beds", name: "minBedroom"}, 
        {minimumValue: 1, maximumValue: 6, step: 1, title: "Max Beds", name: "maxBedroom"}, 
        {minimumValue: 10000, maximumValue: 1000000, step: 10000, title: "Min Price", name: "minPrice"}, 
        {minimumValue: 10000, maximumValue: 1000000, step: 10000, title: "Max Price", name: "maxPrice"}, 
        {minimumValue: 0, maximumValue: 40, step: 5, title: "Search radius", name: "searchRadius"}
      ],
    };
  }

  renderFilters = () => {
    const { filters } = this.props;
    return this.state.saleSliders.map((slider, i) => {
      return (
        <View style={styles.slider} key={i}>
          <View style={styles.titlecontainer}>
            <Text black large bold>{slider.title}</Text>
            <Text black large bold>{slider.name === "minPrice" || slider.name === "maxPrice" ? `£${formatNumbers(filters[slider.name])}` : filters[slider.name]}</Text>
          </View>
          <Slider
            // style={styles.slider}
            onValueChange={(value) => this.props.onSliderSelected(value, slider.name)}
            minimumValue={slider.minimumValue}
            maximumValue={slider.maximumValue}
            minimumTrackTintColor="#4bd4b0"
            maximumTrackTintColor="#ddd"
            thumbTintColor="#4bd4b0"
            value={filters[slider.name]} //Initial value
            step={slider.step} 
            thumbStyle={styles.thumb}
            trackStyle={styles.track}
            animateTransitions={true}
            thumbTouchSize={{width: 80, height: 80}}
            onSlidingComplete={(value) => this.props.onAdjustValues(value, slider.name)}/>
        </View>
    )});
  }

  render() {
    const { loading, totalProperties } = this.props;
    return (
      <View style={styles.slidercontainer}>
        {this.renderFilters()}
        <View style={styles.actionButton}>
          <Button loading={loading} onPress={this.props.onDone}>View Properties ({totalProperties || 0})</Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  slidercontainer: {
    paddingHorizontal: 15, 
    marginTop: 30
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
  actionButton: {
    margin: 10
  }, 
  slider: {
    marginBottom: 25
  }
});
