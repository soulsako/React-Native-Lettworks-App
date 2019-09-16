import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'atoms';
import { TouchableItem } from 'components';
import Constants from 'config/constants';
import { AppOnboarding } from 'config/AppOnboarding';
import Icons from 'config/Icons';

class SelectBox extends Component {
  
  render() {
    const { onPress, active, title } = this.props;
    return (
      <TouchableItem onPress={onPress} style={[{ marginRight: 20 }, styles.selectedType__link]}>
        <View>
            <View style={[styles.selectedType__boxWrap, active ? styles.selectedType__boxWrap_active : null]}>

              {/* <Image style={styles.selectedType__image} source={AppOnboarding.men} /> */}

              <View style={styles.selectedType__box}>
                <Text extraLarge bold type='w'>{title}</Text>
              </View>

              {active ?
                  <View style={styles.selectedType__tickContainer}>
                    <Image style={styles.selectedType__tick} source={Icons.solidTickWhite} />
                  </View>
                  : null
              }
            </View>
        </View>
      </TouchableItem>
    );
  }
}

export default SelectBox;

const styles = StyleSheet.create({

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
  }
});


