import React from 'react';
import { TextInput, StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native';

import Text from './Text';
import Icons from 'config/Icons';
import { IconsInput } from 'config/AppIcons/AppIcons';

export default class Input extends React.PureComponent {
    state = {
        focus: false,
        isSecureEntry: true,
    }

    onBlur = () => {
        this.setState({ focus: false, touched: true });
        if (this.props.onBlur) this.props.onBlur();
    }

    onFocus = () => {
        this.setState({ focus: true });
        if (this.props.onFocus) this.props.onFocus();
    }

    blur = () => {
        this.input.blur();
    }

    onTogglePasswordVisibility = () => {
        this.setState({ isSecureEntry: !this.state.isSecureEntry })
    }

    isImageToggle = () => {
        const { iconColour } = this.props;
        if (this.state.isSecureEntry) {
            return iconColour === 'white' ? IconsInput.eyeHiddenWhite : IconsInput.eyeHidden;
        } else {
            return iconColour === 'white' ? IconsInput.eyeVisibleWhite : IconsInput.eyeVisible;
        }
    }

    renderSecureIcon = () => {
        return (
            <TouchableWithoutFeedback onPress={this.onTogglePasswordVisibility}>
                <View style={[styles.icon, styles.rightIcon]}>
                    <Image style={styles.secureIcon} source={this.isImageToggle()} />
                </View>
            </TouchableWithoutFeedback>
        )
    }

    render() {
        const { textArea, secureEntry, square, style, leftIcon, rightIcon, onFocus, onBlur, containerStyle, v1, error, enabled, ...others } = this.props;
        const { label, labelStyle, inputValid, charCount, charMax } = this.props;
        const { focus, isSecureEntry } = this.state;

        return (
            <View style={[styles.container, containerStyle, v1 ? styles.v1Container : null]}>
                {label &&
                    <View style={styles.labelContainer}>
                        <Text style={[styles.label, labelStyle]}>{label.toUpperCase()}</Text>
                        {charCount && charMax ? <Text style={[styles.label, labelStyle, charCount > charMax ? styles.error : null]}>{` (${charCount}/${charMax})`}</Text> : null}
                        {inputValid ? <Image style={styles.labelValidIcon} source={Icons.solidTickGreen} /> : null}
                    </View>
                }

                <View style={styles.inputContainer}>
                    {leftIcon && <View style={[styles.icon, styles.leftIcon]}>{leftIcon}</View>}

                    <TextInput
                        editable={enabled}
                        selectTextOnFocus={enabled}
                        ref={r => this.input = r}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur} {...others}
                        placeholderTextColor={error ? "red" : "#818181"}
                        underlineColorAndroid="transparent"
                        secureTextEntry={secureEntry ? isSecureEntry : false}
                        style={[
                            styles.input,
                            v1 ? styles.v1 : null,
                            textArea ? styles.textArea : null,
                            style,
                            leftIcon ? styles.leftIconInput : null,
                            square ? styles.square : styles.curved,
                            focus && (v1 || textArea) ? styles.focus : null,
                            error ? styles.error : null
                        ]}
                    />

                    {rightIcon ? <View style={[styles.icon, styles.rightIcon]}>{rightIcon}</View> : null}

                    {secureEntry ? this.renderSecureIcon() : null}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 10
    },
    label: {
        letterSpacing: 2,
        fontSize: 10,
        fontFamily: 'Bold',
        color: '#999CA4'
    },
    labelValidIcon: {
        marginLeft: 10,
        width: 12,
        height: 12
    },
    labelContainer: {
        flexDirection: 'row'
    },
    inputContainer: {
        position: 'relative'
    },
    icon: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        height: '100%',
        zIndex: 1
    },
    leftIcon: {
        left: 12,
    },
    rightIcon: {
        right: 10
    },
    input: {
        alignSelf: 'center',
        color: 'black',
        fontSize: 16,
        height: 50,
        borderWidth: 1,
        borderColor: '#d5d5d5',
        padding: 15,
        width: '100%',
        backgroundColor: '#fff',
        opacity: 0.7,
        fontFamily: 'Regular'
    },
    curved: {
        borderRadius: 5,
    },
    square: {
        borderRadius: 0
    },
    leftIconInput: {
        paddingLeft: 35
    },
    focus: {
        borderColor: '#4BD4B0'
    },
    v1: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: '#E7E8E9',
        padding: 10,
        paddingHorizontal: 0,
        height: 40,
        opacity: 1
    },
    textArea: {
        borderWidth: 1,
        paddingHorizontal: 12,
        marginBottom: 0
    },
    v1Container: {
        marginBottom: 10
    },
    error: {
        borderColor: 'red',
        color: 'red'
    },
    secureIcon: {
        height: 22,
        width: 22
    }
})