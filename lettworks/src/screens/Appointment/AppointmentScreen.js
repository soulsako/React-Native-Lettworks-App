import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderMiddle } from 'components/Header';

export default class AppointmentScreen extends React.PureComponent {

  static navigationOptions = ({ navigation }) => {
    return {
        headerTitle: <HeaderMiddle title="Appointments" />
    }
  };

  render(){
    return (
      <View style={styles.container}>
        <Text>This is the Appointment screen.</Text>
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

