import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderMiddle } from 'components/Header';

export default class FindScreen extends React.PureComponent {

  static navigationOptions = ({ navigation }) => {
    return {
        headerTitle: <HeaderMiddle title="Find" />
    }
  };

  render(){
    return (
      <View style={styles.container}>
        <Text>Welcome to the Find screen.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }

});

