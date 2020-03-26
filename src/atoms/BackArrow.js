import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import * as Icon from '@expo/vector-icons';
import TouchableItem from 'components/TouchableItem';

export default class BackArrow extends React.PureComponent {
    render() {
        return (
            <View style={styles.backContainer}>
                <TouchableItem borderless onPress={this.props.onPress}>
                    <View style={styles.back}>
                        <Icon.Ionicons name='ios-arrow-round-back' size={40} color="#000" />
                    </View>
                </TouchableItem>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    backContainer: {
        overflow: 'hidden',
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10,
        backgroundColor: '#fff',
        borderRadius: 100,
        ...Platform.select({
            ios: {
                top: 40
            }
        }),
    },
    back: {
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40
    }
})