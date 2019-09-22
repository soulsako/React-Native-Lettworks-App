import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Text } from 'atoms';
import { HeaderMiddle } from 'components/Header';
import { connect } from 'react-redux';
import * as Location from 'expo-location';
import Api from 'services/api'
import PropertyCard from 'components/PropertyCard';

class HomeScreen extends React.PureComponent {

  static navigationOptions = ({ navigation }) => {
    return {
        headerTitle: <HeaderMiddle title="Lettworks" />
    }
  };

  // state = {
  //   preferedProperties: null, 
  //   recentlyAddedProperties: null, 
  //   loading: true
  // }

  // componentDidMount(){
  //   this.getCurrentLocation();
  // }

  // getCurrentLocation = async () => {
  //   let location = await Location.getCurrentPositionAsync({});
  //   this.getPreferedProperties(location);
  //   this.getRecentlyAddedProperties(location);
  // }

  // fetchPreferedProperties = async (location) => {
  //   //We will make a request to fetch properties within miles radius of this location
  //   const preferedProperties = await Api.http({ ...this.props.preferences, ...location.coords});
  //   this.setState({ preferedProperties });
  // }
  // getRecentlyAddedProperties = async (location) => {
  //   const recentlyAddedProperties = await Api.http({ ...location.coords });
  //   this.setState({ recentlyAddedProperties });
  // }

  render(){
    const { user } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        {/* <ScrollView keyboardShouldPersistTaps='handled' style={styles.container}>
          <View style={styles.container_medium}>
              {user && user.firstName &&
                <View style={styles.header}>
                    <Text style={styles.title}>Hi {user.firstName}</Text>
                </View>
              }
            </View>
          <PropertyCard />
        </ScrollView> */}
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state){
  return {
    auth: state.auth, 
    preferences: state.user && state.user.preferences, 
    user: state.user
  }
}

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({

  container: { // section instead of container maybe
    flex: 1,
    backgroundColor: '#fff',
  },

});

