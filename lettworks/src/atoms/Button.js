import React, { Fragment } from 'react';
import { TouchableHighlight, StyleSheet, Text, ActivityIndicator, View, Platform, Image } from 'react-native';

const tintColor = '#4BD4B0';

const Colors = {
    tintColor,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColor,
    tabBar: '#fefefe',
    errorBackground: 'red',
    errorText: '#fff',
    warningBackground: '#EAEB5E',
    warningText: '#666804',
    noticeBackground: tintColor,
    noticeText: '#fff',
    primary: '#4BD4B0',
    primaryHover: '#44b396',
    secondaryHover: '#E7E8E9',
    tertiary: '#FF6633',
    tertiaryHover: '#e47854',
    greyHover: '#A9A9A9',
    primaryInverseHover: '#f1f1f1',
    transparentHover: 'transparent',
    whiteHover: '#FFFFFF',
    plainHover: '#F7F7F7',
    noBorderBackgroundHover: 'transparent'
};

export default class Button extends React.PureComponent {
    render() {
        const { icon, colour, style, smallTextSize, buttonStyle, loading, children, content, disabled, large, small, medium, curved, loaderColour, isClean, ...others } = this.props;

        return (
            <View style={[styles.container, style]}>
                {!isClean ?
                    <TouchableHighlight
                        containerViewStyle={{ width: '100%' }}
                        onPress={this.onPress}
                        {...others}
                        underlineColorAndroid="#00000000"
                        underlayColor={Colors[colour + 'Hover']}
                        style={[
                            icon ? styles.iconButton : styles.button,
                            styles[colour],
                            disabled ? styles.disabled : null,
                            large ? styles.large : null,
                            small ? styles.small : null,
                            curved ? styles.curved : null,
                            buttonStyle
                        ]}>
                          <Fragment>
                            {icon ? <Image source={icon} style={styles.icon} /> : null}
                            {loading
                                ? <ActivityIndicator size={Platform.OS === 'ios' ? 'small' : 24} color={loaderColour || "#fff"} />
                                : content
                                    ? children
                                    : <Text 
                                            style={[
                                                styles.text, 
                                                styles[colour + 'Text'], 
                                                small ? styles.smallText : 
                                                medium ? styles.mediumText :
                                                smallTextSize ? styles.smallTextSize : 
                                                null ]}>
                                        {children}
                                    </Text>
                            }
                          </Fragment>
                    </TouchableHighlight>
                    :
                    <View style={[
                        styles.button,
                        styles[colour],
                        disabled ? styles.disabled : null,
                        large ? styles.large : null,
                        small ? styles.small : null,
                        curved ? styles.curved : null
                    ]}>
                        {children}
                    </View>
                }
            </View>
        )
    }
}

Button.defaultProps = {
    colour: 'primary',
    onPress: () => { },
    curved: true
}

const defaultStyles = {
  minHeight: 45,
  paddingHorizontal: 15,
  flexGrow: 1, 
  alignItems: 'center'
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1
    },
    button: {
        ...defaultStyles,
        justifyContent: 'center'
    },
    iconButton: {
        ...defaultStyles,
        flexDirection: 'row', 
        justifyContent: 'flex-start'
    },
    curved: {
        borderRadius: 7
    },
    primary: {
        backgroundColor: '#4BD4B0',
    },
    primaryInverse: {
        borderColor: '#4BD4B0',
        borderWidth: 1
    },
    secondary: {
        borderColor: '#E7E8E9',
        borderWidth: 1
    },
    secondaryHover: {
        backgroundColor: '#E7E8E9'
    },
    tertiary: {
        backgroundColor: '#FF6633'
    },
    secondaryHoverText: {
        color: '#999ca4'
    },
    secondaryText: {
        color: '#999CA4'
    },
    transparent: {
        borderColor: '#FFFFFF',
        borderWidth: 1
    },
    noBorderBackground: {
        backgroundColor: 'transparent',
        borderWidth: 0
    },
    transparentText: {
        color: '#FFFFFF'
    },
    white: {
        backgroundColor: '#FFFFFF'
    },
    whiteText: {
        color: '#000000'
    },
    plain: {
        borderColor: '#E7E8E9',
        borderWidth: 1
    },
    plainText: {
        color: '#000000',
        fontSize: 14
    },
    primaryInverseText: {
        color: '#4BD4B0',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        paddingVertical: 15,
        fontFamily: 'Medium',
        textAlign: 'center'
    },
    grey: {
        backgroundColor: '#F7F7F7'
    },
    darkblue: {
        backgroundColor: '#3e4555'
    },
    darkgrey: {
      backgroundColor: "#535a6b",
      borderColor: "#999ca4", 
      borderWidth: 1
    },
    disabled: {
        opacity: 0.8
    },
    large: {
        paddingHorizontal: 30
    },
    small: {
        minHeight: 24,
        paddingHorizontal: 7
    },
    smallText: {
        fontSize: 10,
        paddingVertical: 7
    },
    smallTextSize: {
        fontSize: 12,
        paddingVertical: 7
    },
    mediumText: {
        fontSize: 14,
        fontFamily: 'Medium',
        paddingVertical: 7
    },
    bagSubButton: {
        width: '35%',
        marginHorizontal: 5
    },
    plainHover: {
        backgroundColor: '#F7F7F7'
    },
    icon: {
      width: 20,
      height: 20, 
      marginRight: '12%'
    }
})