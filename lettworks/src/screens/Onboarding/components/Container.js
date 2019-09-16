import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';

export default Container = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            {props.children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        justifyContent: 'space-between',
        backgroundColor: '#111111',
        paddingTop: 40,
        padding: 20
    }
});