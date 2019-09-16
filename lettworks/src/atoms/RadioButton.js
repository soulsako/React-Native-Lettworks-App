import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, View, Image } from 'react-native';
import Loader from 'components/Loader';
import Icons from 'config/Icons';

export default class RadioButton extends PureComponent {
    render() {
        const { loading, checked } = this.props;

        return (
            loading
                ? <Loader style={styles.loader} />
                : checked
                    ? <Image source={Icons.solidTickGreen} style={styles.radioChecked} />
                    : <View style={styles.radioButton} />
        )
    }
}

RadioButton.propTypes = {
    checked: PropTypes.bool
}

const styles = StyleSheet.create({
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 100,
        borderColor: '#999CA4',
        borderWidth: 1.5
    },
    radioChecked: {
        width: 20,
        height: 20
    },
    loader: {
        padding: 0,
        width: 20,
        justifyContent: 'flex-start'
    }
});