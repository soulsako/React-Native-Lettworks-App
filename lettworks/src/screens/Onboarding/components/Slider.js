import React, { Component } from 'react';
import { View, ScrollView ,StyleSheet } from 'react-native';
import { Text } from 'atoms';
import { TouchableItem } from 'components';

class Slider extends Component {

  render() {
    const { title, selectedType, currentSlider, type, onPress, selectedValue, scrollRef } = this.props;
    return (
      <View style={styles.selectRow}>
          <View style={{ flexDirection: 'row' }}>
              <Text bold extraLarge type='w'>{title}</Text>
          </View>
          <View style={styles.selector}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={scrollRef}>
              {currentSlider[type].map(el => {
                  return (
                    <TouchableItem key={el} style={[styles.button, selectedType && selectedValue === el ? styles.buttonSelected : null]} onPress={() => onPress(el, type)}>
                      <Text bold medium type='w'>{el}</Text>
                    </TouchableItem>
                  );
              })}
            </ScrollView>
          </View>
      </View>
    );
  }
}

export default Slider;

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
