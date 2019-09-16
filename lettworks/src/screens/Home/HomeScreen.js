import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderMiddle } from 'components/Header';
import { connect } from 'react-redux';
import * as Location from 'expo-location';

class HomeScreen extends React.PureComponent {

  static navigationOptions = ({ navigation }) => {
    return {
        headerTitle: <HeaderMiddle title="Lettworks" />
    }
  };

  state = {
    location: null, 
    errorMessage: null
  }

  componentDidMount(){
    console.log("Auth: ", this.props.auth);
    console.log("User: ", this.props.user);
  }

  componentWillMount(){
    this.getLocationAsync();
  }

  getLocationAsync = async () => {
    let location = Location.getCurrentPositionAsync({});
    this.setState({location})
  }

  render(){
    return (
      <View style={styles.container}>
        <Text>Welcome to the home screen. This means you have already completed onboarding and are authenticated</Text>
        <Text>{JSON.stringify(this.state.location)}</Text>
      </View>
    );
  }
}
function mapStateToProps(state){
  return {
    auth: state.auth, 
    user: state.user
  }
}

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({

  container: {
    flex: 1, 
    backgroundColor: '#fff'
  }

});

