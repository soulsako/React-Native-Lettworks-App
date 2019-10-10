import React, { Fragment } from 'react';
import { View, StyleSheet, Image, Modal, TouchableHighlight } from 'react-native';
import { Text, Button } from 'atoms';
import { IconsPDP, IconsProperty, IconsLaunch, IconsTaggstar, IconsGlobal } from 'config/AppIcons/AppIcons';
import { formatNumbers } from 'config/functions';
import Constants from 'config/constants';
import Icons from '../config/Icons';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const sliderWidth = Constants.window.width - 20;

export default class PropertyCard extends React.PureComponent {

  state = {
    maxImages: this.props.images.slice(0, 4), // Max images set to 4
    activeSlide: 0 
  }

  // onImageClicked = () => {
  //   this.props.navigation.navigate("ProductDescription");
  // }

  renderItem = ({item, index}) => (
      <Image 
        style={{width: sliderWidth, height: 240}}
        source={{uri: item}} 
      />
    );

    renderPaginationDots = () => {
    const { maxImages, activeSlide } = this.state;
    return (
        <Pagination
          dotsLength={maxImages.length}
          activeDotIndex={activeSlide}
          containerStyle={{position: 'absolute', left: '30%', top: 180 }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 4,
            backgroundColor: 'rgba(255, 255, 255, .92)'
          }}
          inactiveDotStyle={{
              // Define styles for inactive dots here
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
    );
  }

  render(){
    const { price, bathrooms, bedrooms, description, images, ratingsAverage, ratingsQuantity, address, distance, type } = this.props;
    const { maxImages } = this.state;
    const afterPrice = type === 'rent' ? 'pcm' : "";
    console.log('====================================');
    console.log(images);
    console.log('====================================');
    return (
      <View style={styles.card}>
          <View style={styles.top}>
            {/* <TouchableHighlight onPress={this.onImageClicked}> */}
              <Fragment>
                <Carousel
                  data={maxImages}
                  renderItem={this.renderItem}
                  onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                  itemWidth={sliderWidth}
                  sliderWidth={sliderWidth}
                  itemHeight={240}
                  inactiveSlideScale={1}
                />
                { this.renderPaginationDots() }
              </Fragment>
              {/* <Image source={{uri: imageCover}} style={styles.image} /> */}
            {/* </TouchableHighlight> */}
            
          <View style={styles.priceContainer}>
              <Image source={IconsPDP.price.priceTagGreen} style={styles.icon}/>
              <Text mediumWeight style={styles.price}>£{`${formatNumbers(price)} ${afterPrice}`}</Text>
            </View>
            <View style={styles.imagecount}>
              <Image source={IconsPDP.viewProduct.camera} style={{marginRight: 10, width: 15, height: 15}}/>
              <Text large type="w" style={{alignSelf: 'flex-end',}}>{images.length + 1}</Text>
            </View>
          </View>
          
          <View style={styles.bottom}>
            <View style={styles.title}>
              <Text black mediumWeight large style={styles.heading}>{address}</Text>
              <Image source={IconsGlobal.greenHeart} style={styles.icon}/>
            </View>

            <View style={styles.infoContainer}>

              <View style={[styles.infoBox, styles.borderRight]}>
                <Image source={IconsProperty.bedroom} style={[styles.icon, {marginBottom: 5}]}/>
                <Text black style={{textAlign: 'center'}}>{bedrooms} Bedrooms</Text>
              </View>

              <View style={[styles.infoBox, styles.borderRight]}>
                <Image source={IconsProperty.bathroom} style={[styles.icon, {marginBottom: 5}]}/>
                <Text black style={{textAlign: 'center'}}>{bathrooms} Bathrooms</Text>
              </View>

              <View style={styles.infoBox}>
                <Image source={IconsPDP.tabs.location} style={[styles.icon, {marginBottom: 5}]}/>
                <Text black>{distance.toFixed(1)} mil</Text>
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
                <Text black>{ratingsAverage} ({ratingsQuantity})</Text>
              </View>

            </View>

            <View style={styles.description}>
              <Text large black bold style={{marginBottom: 5}}>Description</Text>
              <Text black>{description.substring(0, 120)}</Text>
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
    borderRadius: 5,
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  }, 
  top: {
    position: 'relative'
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
  imagecount: {
    position: 'absolute', 
    right: 0, 
    top: 200,
    backgroundColor: 'rgba(1, 1, 1, .7)', 
    paddingHorizontal: 15,
    paddingVertical: 5, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent:'center'
  },
  icon: {
    width: 25, 
    height: 25, 
    marginRight: 3
  }, 
  price: {},
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
  description: {}, 
  buttonContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: "space-evenly",
    marginTop: 15
  }
});

// {
//   this.state.showCarousel ? <Modal
//   animationType="slide"
//   transparent={false}
//   visible={true}
//   onRequestClose={this.onCloseCarousel || false}
//   >
//   <Carousel 
//     ref={(c) => { this.carousel = c; }}
//     data={images}
//     renderItem={this.renderItem}
//     sliderWidth={sliderWidth}
//     itemWidth={sliderWidth} />
//   </Modal> : null
//   }