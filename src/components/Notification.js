import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Animated } from 'react-native';

import { Text } from 'atoms';
import * as Icon from '@expo/vector-icons';

export default class Notification extends React.PureComponent {
    state = {
        height: new Animated.Value(0)
    }
    componentDidMount() {
        if (this.props.active) this.onOpen();
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.active && this.props.active) {
            this.onOpen();
        }
        else if (prevProps.active && !this.props.active) {
            this.onClose();
        }
    }

    onOpen = () => {
        Animated.timing(
            this.state.height,
            {
                toValue: 1,
                duration: 200
            }
        ).start(() => {
            if (this.props.autoClose) {
                this.timeout = setTimeout(this.onClose, this.props.delay);
            }
        });
    }

    onClose = () => {
        Animated.timing(
            this.state.height,
            {
                toValue: 0,
                duration: 200
            }
        ).start(() => {
            this.props.onClose()
        });
    }

    render() {
        const { type, message, active, autoClose, style } = this.props;
        if (!active) return null;
        return (
            <Animated.View style={[styles.container, styles[type], style, { transform: [{ scaleY: this.state.height }] }]}>
                <View style={styles.notification}>
                    {this.props.children ||
                        <View style={styles.text}>
                            <Text type={type === 'error' ? 'w' : null}>{message}</Text>
                        </View>}
                    {!autoClose ? <TouchableWithoutFeedback style={styles.close} onPress={this.onClose}>
                        <View style={styles.close}>
                            <Icon.Ionicons color={type !== 'info' ? "#fff" : "#000"} name="ios-close" size={20} />
                        </View>
                    </TouchableWithoutFeedback> : null}
                </View>
            </Animated.View>
        )
    }
}

Notification.defaultProps = {
    delay: 3000
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 10
    },
    text: {
        flexShrink: 1
    },
    notification: {
        paddingLeft: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 50
    },
    error: {
        backgroundColor: '#B03A2E'
    },
    success: {
        backgroundColor: '#DBF6EF'
    },
    info: {
        backgroundColor: '#EEEEEE'
    },
    close: {
        padding: 20
    }
})