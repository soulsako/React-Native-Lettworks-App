import React from 'react';
import { StyleSheet, View } from 'react-native';

const screens = [
    'PersonaliseScreen',
    'LocationScreen',
    'PropertyTypeScreen',
    'PricesScreen',
    'NotificationsScreen',
];

export default class ProgressDots extends React.PureComponent {
    static defaultProps = {
        dots: screens.length,
        selected: 0
    }
    render() {
        const { dots, selected } = this.props;
        return (
            <View style={styles.dots}>
                {[...Array(dots)].map((x, i) => {
                    return <View key={i} style={[styles.dot, i === screens.indexOf(selected) ? styles.selected : null]} />
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    dots: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    dot: {
        width: 10,
        height: 10,
        backgroundColor: '#E7E8E9',
        borderRadius: 100,
        marginHorizontal: 5
    },
    selected: {
        backgroundColor: '#4BD4B0',
    }
})