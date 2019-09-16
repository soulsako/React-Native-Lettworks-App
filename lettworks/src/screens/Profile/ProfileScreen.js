import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderMiddle } from 'components/Header';

export default class HomeScreen extends React.PureComponent {

  static navigationOptions = ({ navigation }) => {
    return {
        headerTitle: <HeaderMiddle title="Profile" />
    }
  };

  render(){
    return (
      <View style={styles.container}>
        <Text>Welcome to the Profile screen.</Text>
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

