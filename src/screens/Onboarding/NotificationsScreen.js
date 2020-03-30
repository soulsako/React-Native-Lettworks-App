import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button } from "atoms";

import Container from "./components/Container";
import Heading from "./components/Heading";
import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";
import Layout from "config/constants";
import { AppOnboarding } from "config/AppOnboarding";
import { isPermissionDenied } from "config/functions";
import { connect } from 'react-redux';

class NotificationsScreen extends React.PureComponent {
  onNext = () => {
    this.props.navigation.navigate("Home");
  };

  onBack = () => {
    this.props.navigation.navigate("Location");
  };

  onSelectNext = async () => {
    await isPermissionDenied("NOTIFICATIONS");
    this.onNext();
  };

  componentDidMount(){
    console.log("NOTIFICATIONS SCREEN", this.props.user);
  }

  render() {
    return (
      <Container>
        <TopBar onSkip={this.onNext} />
        <Heading
          title={`Enable${"\n"}notifications`}
          subtitle="Want to be kept up to dates about the latest arrivals and product launches? Then enable notifications for custom alerts"
        />

        <View style={styles.imageContainer}>
          <Image style={styles.image} source={AppOnboarding.notification} />
        </View>

        <View>
          <Button
            style={styles.buttonContainer}
            medium
            buttonStyle={styles.actionButton}
            onPress={this.onSelectNext}
            colour="black"
          >
            Enable notifications
          </Button>
        </View>

        <BottomBar
          selected="NotificationsScreen"
          onBack={this.onBack}
          onNext={this.onNext}
          hideNext
        />
      </Container>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(NotificationsScreen);

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center"
  },
  image: {
    resizeMode: "contain",
    width: Layout.window.width / (Layout.isSmallDevice ? 2 : 1.5),
    height: Layout.window.width / (Layout.isSmallDevice ? 2 : 1.5)
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  actionButton: {
    width: "70%",
    height: 50
  }
});
