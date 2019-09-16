import React from 'react';
import { StyleSheet, ActivityIndicator, View, Platform } from 'react-native';

export default class Loader extends React.PureComponent {
    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <ActivityIndicator
                    style={styles.loader}
                    size={Platform.OS === 'ios' ? 'small' : (this.props.size || 24)}
                    color={this.props.colour || '#4BD4B0'}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: '100%',
        justifyContent: 'center'
    }
});