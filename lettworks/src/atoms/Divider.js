import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from './Text';

export default class Divider extends React.PureComponent {
    render() {
        const { text, style } = this.props;
        return (
            <View style={[styles.container, style]}>
                <View style={styles.line} />
                <Text style={styles.text}>{text.toUpperCase()}</Text>
                <View style={styles.line} />
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    line: {
        width: '40%',
        height: '50%',
        borderColor: '#ECECEC',
        borderBottomWidth: 1
    },
    text: {
        color: '#000000',
        fontSize: 10,
        letterSpacing: 2,
        fontFamily: 'Bold'
    }
});