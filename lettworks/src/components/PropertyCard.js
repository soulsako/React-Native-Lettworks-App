import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button } from 'atoms';
import { IconsPDP, IconsProperty, IconsLaunch, IconsTaggstar, IconsGlobal } from 'config/AppIcons/AppIcons';

export default class PropertyCard extends React.PureComponent {

  render(){
    return (
      <View style={styles.card}>
          <View style={styles.top}>  
            <Image source={require('../assets/images/intro/home2.jpg')} style={styles.image}/>

            <View style={styles.priceContainer}>
              <Image source={IconsPDP.price.priceTagGreen} style={styles.icon}/>
              <Text mediumWeight style={styles.price}>£995 pcm</Text>
            </View>
          </View>
          
          <View style={styles.bottom}>
            <View style={styles.title}>
              <Text black mediumWeight large style={styles.heading}>5 Bedroom House in Chester County, PA</Text>
              <Image source={IconsGlobal.greenHeart} style={styles.icon}/>
            </View>

            <View style={styles.infoContainer}>

              <View style={[styles.infoBox, styles.borderRight]}>
                <Image source={IconsProperty.bedroom} style={[styles.icon, {marginBottom: 5}]}/>
                <Text black style={{textAlign: 'center'}}>5 Bedrooms</Text>
              </View>

              <View style={[styles.infoBox, styles.borderRight]}>
                <Image source={IconsProperty.bathroom} style={[styles.icon, {marginBottom: 5}]}/>
                <Text black style={{textAlign: 'center'}}>2 Bathrooms</Text>
              </View>

              <View style={styles.infoBox}>
                <Image source={IconsPDP.tabs.location} style={[styles.icon, {marginBottom: 5}]}/>
                <Text black>2.3 mil</Text>
              </View>

            </View>

            <View style={styles.scheduleContainer}>

              <View style={[styles.infoBox, styles.borderRight]}>
                <Image source={IconsLaunch.calendarGreen} style={[styles.icon, {marginBottom: 5}]}/>
                <Text black>Tommorow</Text>
              </View>

              <View style={[styles.infoBox, styles.borderRight]}>
                <Image source={IconsTaggstar.RAPGreen} style={[styles.icon, {marginBottom: 5}]}/>
                <Text black>3:45PM</Text>
              </View>

              <View style={[styles.infoBox, styles.borderRight]}>
                <Image source={IconsPDP.tabs.reviewsGreen} style={[styles.icon, {marginBottom: 5}]}/>
                <Text black>4.8</Text>
              </View>

            </View>

            <View style={styles.description}>
              <Text large black bold style={{marginBottom: 5}}>Description</Text>
              <Text black>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing...</Text>
            </View>

            <View style={styles.buttonContainer}>
              <Button medium buttonStyle={{marginRight: 10}}>Book now</Button>
              <Button medium colour="white" buttonStyle={{borderWidth: 1, borderColor: '#777'}}>More info</Button>
            </View>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  card: { 
    backgroundColor: '#ffffff',
    shadowColor: "#ddd",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  }, 
  top: {

  },
  image: {
    width: '100%', 
    height: 240
  }, 
  priceContainer: {
    position: 'absolute', 
    left: 0, 
    top: 200,
    backgroundColor: 'rgba(255, 255, 255, .9)', 
    padding: 5, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent:'center'
  }, 
  icon: {
    width: 25, 
    height: 25, 
    marginRight: 3
  }, 
  price: {

  },
  bottom: {
    padding: 15
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
  }, 
  heading: {
    width: '80%'
  }, 
  infoContainer: {
    borderTopWidth: 1, 
    borderBottomWidth: 1, 
    borderTopColor: '#eee',
    borderBottomColor: '#eee', 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 15, 
    justifyContent: 'center', 
  },
  scheduleContainer: {
    borderBottomWidth: 1, 
    borderBottomColor: '#eee', 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 15, 
    justifyContent: 'center', 
  } ,
  infoBox: {
    alignItems: 'center',
    justifyContent: 'space-between', 
    padding: 5, 
    width: '33.3%'
  }, 
  borderRight: {
    borderRightWidth: 1,
    borderRightColor: '#eee'
  }, 
  description: {

  }, 
  buttonContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: "space-evenly",
    marginTop: 15
  }
})