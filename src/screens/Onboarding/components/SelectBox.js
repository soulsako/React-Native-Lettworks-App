import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'atoms';
import { TouchableItem } from 'components';
import Constants from 'config/constants';
import { AppOnboarding } from 'config/AppOnboarding';
import Icons from 'config/Icons';

class SelectBox extends Component {
  
  render() {
    const { onPress, active, type, small } = this.props;
    return (
      <TouchableItem onPress={onPress} style={[{ marginRight: 20 }, styles.selectedType__link]}>
        <View>
            <View style={[styles.selectedType__boxWrap, active ? styles.selectedType__boxWrap_active : null]}>

              <Image style={[styles.selectedType__image, small ? styles.selectedType__image__small: null]} source={AppOnboarding[type]} />

              {/* <View style={styles.selectedType__box}>
                <Text extraLarge bold type='w'>{title}</Text>
              </View> */}

              {active ?
                <View style={[styles.selectedType__tickContainer, small ? styles.selectedType__tickContainer__small : null]}>
                  <Image style={styles.selectedType__tick} source={Icons.solidTickGreen} />
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
    opacity: 1,
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
      opacity: 0.5
  },
  selectedType__image: {
    width: Constants.screen.width / 3 - 25,
    height: Constants.screen.width / 3 - 25
  },
  selectedType__image__small: {
    width: Constants.screen.width / 4 - 25,
    height: Constants.screen.width / 4 - 25
  },
  selectedType__tickContainer__small: {
    top: 65,
  },
  selectedType__tickContainer: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      top: 85,
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


