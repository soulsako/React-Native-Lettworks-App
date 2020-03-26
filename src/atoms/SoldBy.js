import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import Text from './Text';
import { getFaciaName, getFaciaImage } from 'config/functions';

export default class SoldBy extends React.PureComponent {
    render() {
        const { style, facia } = this.props;
        return (
            <View style={[styles.container, style]}>
                <Text type='g'>Sold by</Text>
                <Image source={getFaciaImage(facia)} style={styles.image} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    image: {
        width: 15,
        height: 15,
        marginRight: 5
    }
})