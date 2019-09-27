import React, { Component } from 'react';
import { View, ScrollView ,StyleSheet } from 'react-native';
import { Text } from 'atoms';
import { TouchableItem } from 'components';

class Slider extends Component {

  render() {
    const { title, onPress, selectedValue, scrollRef, values } = this.props;
    return (
      <View style={styles.selectRow}>
          <View style={{ flexDirection: 'row' }}>
              <Text bold extraLarge black>{title}</Text>
          </View>
          <View style={styles.selector}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={scrollRef}>
              {values.map(el => {
                  return (
                    <TouchableItem key={el} style={[styles.button, selectedValue === el ? styles.buttonSelected : null]} onPress={() => onPress(el)}>
                      <Text bold medium black style={{textAlign: 'center'}}>{el}</Text>
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
    marginVertical: 10,
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
    width: 70,
    height: 40
  },
  buttonSelected: {
    borderRadius: 20,
    backgroundColor: '#4BD4B0'
  }
});
