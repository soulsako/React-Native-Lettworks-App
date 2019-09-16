import React, { PureComponent } from 'react';
import { StyleSheet, Image, View, Platform } from 'react-native';

import { IconsMainHeader } from 'config/AppIcons/AppIcons';

export default class NavBackArrow extends PureComponent {
    render() {
        const { mainNav } = this.props;
        return (
            <View style={[styles.wrapper, mainNav && Platform.OS === 'android' ? { marginLeft: 0 } : null]}>
                <Image style={styles.backIcon} source={IconsMainHeader.backArrow} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backIcon: {
        width: 24,
        height: 9
    },
    wrapper: {
        paddingVertical: 7,
        marginLeft: 10
    }
});