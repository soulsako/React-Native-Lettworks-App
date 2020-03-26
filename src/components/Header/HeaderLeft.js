import React, { PureComponent } from 'react';
import { NavBackArrow } from 'atoms/icons';
import { TouchableOpacity } from 'react-native';

export default class HeaderLeft extends PureComponent {
    render() {
        const { backButton, onPress } = this.props;
        return (
            backButton &&
            <TouchableOpacity onPress={onPress}>
                <NavBackArrow />
            </TouchableOpacity>
        )
    }
};