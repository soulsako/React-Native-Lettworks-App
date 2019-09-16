import React from 'react';
import { View, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'atoms';

export default class TopBar extends React.PureComponent {
    render() {
        const { hideSkip, onSkip } = this.props;

        return (
            <View>
                <StatusBar barStyle="light-content" />
                {hideSkip ? null :
                    <TouchableWithoutFeedback onPress={onSkip} hitSlop={hitSlop}>
                        <View>
                            <Text type='menuLink'>Skip</Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
            </View>
        )
    }
}

const hitSlop = { top: 15, bottom: 15, left: 10, right: 10 };