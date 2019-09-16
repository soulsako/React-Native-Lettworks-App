import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'atoms';

export default class HeaderMiddle extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const { title, subtitle, subtitleType } = this.props;

        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.title}>{title}</Text>
                {subtitle ? <Text small type={subtitleType || "g"}>{subtitle}</Text> : null}
            </View>
        )
    }
};

const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        fontFamily: 'Bold',
        color: '#000'
    }
});