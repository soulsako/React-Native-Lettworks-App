import React from 'react';
import { View, TouchableHighlight, StyleSheet, Image } from 'react-native';
import { Text } from 'atoms';
import { IconsGlobal } from 'config/AppIcons/AppIcons';

export default class QuickBadge extends React.PureComponent {

  state = {
    isSelected: false
  }

  onPress = () => {
    this.setState({isSelected: !this.state.isSelected}, this.props.onPress);
  }

  render() {
    const { large, curved, badgeStyle, City, Distance, Population, disabled } = this.props;
    const { isSelected } = this.state;
    console.log('====================================');
    console.log("basge", isSelected);
    console.log('====================================');
    return (
      <TouchableHighlight
        containerViewStyle={{ width: '100%' }}
        onPress={this.onPress}
        underlayColor="#4bd4b0"
        underlineColorAndroid="#4bd4b0"
        style={[
          styles.badge,
          disabled ? styles.disabled : null,
          badgeStyle
      ]}>
        <View style={[
          styles.content, 
          {backgroundColor: isSelected ? '#4bd4b0' : '#ffffff'}, 
          large ? styles.large : null,
          curved ? styles.curved : null,
          ]}>
            {/* <Image source={IconsGlobal.cityGreen} style={styles.icon} /> */}
            <Text small style={{color: isSelected ? '#fff' : '#111', marginBottom: 3}}>{City}</Text>
            {/* <Image source={IconsGlobal.distanceGreen} style={styles.icon} />   convert meteres to miles*/}
            <Text small style={{color: isSelected ? '#fff' : '#111'}}>{(Distance * 0.000621371).toFixed(2)} mil</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({

  badge: { 
    
  },
  content: {
    alignItems: 'center', 
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 5  
  },
  icon: {
    width: 10,
    height: 10, 
    marginRight: 3
  }, 
  disabled: {
    opacity: 0.8
  },
  large: {
      paddingHorizontal: 30
  },
  small: {
    minHeight: 24,
    paddingHorizontal: 7
  },
  curved: {
    borderRadius: 7
  }
});
