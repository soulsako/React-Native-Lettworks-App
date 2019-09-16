import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'atoms';
import constants from 'config/constants';

export default class Heading extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const { title, subtitle } = this.props;
        return (
            <View>
                {title ? <Text style={styles.title} bold type='w'>{title}</Text> : null}
                {subtitle ? <Text medium type='w'>{subtitle}</Text> : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: constants.isSmallDevice ? 34 : constants.isLargeDevice ? 60 : 45,
        letterSpacing: -1,
        marginBottom: 10
    }
});