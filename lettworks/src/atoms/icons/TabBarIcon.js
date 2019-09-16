import React from 'react';
import { Image, StyleSheet } from 'react-native';

import { IconsBottomNav } from 'config/AppIcons/AppIcons';

const icons = {
  account: IconsBottomNav.navAccount,
  accountFocused: IconsBottomNav.navAccountFocused,



  wishlist: IconsBottomNav.wishlist,
  wishlistFocused: IconsBottomNav.wishlistActive,

  home: IconsBottomNav.home,
  homeFocused: IconsBottomNav.homeActive,


  stores: IconsBottomNav.store,
  storesFocused: IconsBottomNav.storeActive,

  shop: IconsBottomNav.shop,
  shopFocused: IconsBottomNav.shopActive,

  appointment: IconsBottomNav.appointment,
  appointmentFocused: IconsBottomNav.appointmentActive,

  profile: IconsBottomNav.profile,
  profileFocused: IconsBottomNav.profileActive,

  launch: IconsBottomNav.launch,
  launchActive: IconsBottomNav.launchActive
}

export default class TabBarIcon extends React.PureComponent {
  render() {
    const { name, focused } = this.props;
    return (
      <Image source={icons[`${name}${focused ? 'Focused' : ''}`]} style={[styles.tabIcon, name === 'shop' || name === 'wishlist' ? { height: 22 } : null]} />
    )
  }
}

const styles = StyleSheet.create({
  tabIcon: {
    marginBottom: -3,
    width: 24,
    height: 24
  }
})
