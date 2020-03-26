import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'atoms';
import ProgressDots from './ProgressDots';

export default class TopBar extends React.PureComponent {
    render() {
        const { hideBack, onBack, hideNext, onNext, selected } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.action}>
                    {hideBack ? null :
                        <TouchableWithoutFeedback onPress={onBack} hitSlop={hitSlop}>
                            <View>
                                <Text type='menuLink' style={styles.leftAction}>Back</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    }
                </View>

                <ProgressDots selected={selected} />

                <View style={styles.action}>
                    {hideNext ? null :
                        <TouchableWithoutFeedback onPress={onNext} hitSlop={hitSlop}>
                            <View>
                                <Text type='menuLink'>Next</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    }
                </View>
            </View>
        )
    }
}

const hitSlop = { top: 15, bottom: 15, left: 10, right: 10 };

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    action: {
        width: 50
    },
    leftAction: {
        textAlign: 'left'
    }
});