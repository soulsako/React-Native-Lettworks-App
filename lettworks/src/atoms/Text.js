import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default class AppText extends React.PureComponent {
    render() {
        const {
            type,
            strike,
            bold,
            mediumWeight,
            small,
            medium,
            large,
            extraLarge,
            style,
            red,
            black,
            underline,
            lineHeight,
            megaLarge,
            smallMedium,
            subText,
            greyDefault,
            book,
            mini,
            spacedTitle
        } = this.props;

        let children = this.props.children;
        if (type && type === 'spacedTitle') children = children.toUpperCase();

        return (
            <Text
                style={[
                    styles.text,
                    styles[type],
                    strike ? styles.strikethrough : null,
                    red ? styles.red : null,
                    bold ? styles.bold : null,
                    mediumWeight ? styles.mediumWeight : null,
                    medium ? styles.medium : null,
                    large ? styles.large : null,
                    extraLarge ? styles.extraLarge : null,
                    black ? styles.black : null,
                    underline ? styles.underline : null,
                    megaLarge ? styles.megaLarge: null,
                    greyDefault ?  styles.greyDefault: null,
                    smallMedium?  styles. smallMedium: null,
                    small ? styles.small : null,
                    subText ? styles.subText: null,
                    book ? styles.book : null,
                    lineHeight? styles.lineHeight: null,
                    mini ? styles.mini : null,
                    spacedTitle ? styles.spacedTitle: null,
                    style,
                ]}>
                {children}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        fontFamily: 'Regular'
    },
    subText: {
        fontSize: 12,
        fontFamily: 'Regular',
        color: '#999CA4'
    },
    spacedTitle: {
        letterSpacing: 2,
        color: '#000000',
        fontSize: 12,
        fontFamily: 'Bold'
    },
    menuLink: {
        fontSize: 12,
        color: '#4BD4B0',
        textAlign: 'right',
        fontFamily: 'Medium'
    },
    mini: {
        fontSize: 8
    },
    megaLarge: {
        fontSize: 22,
    },
    small: {
        fontSize: 10
    },
    medium: {
        fontSize: 12
    },
    large: {
        fontSize: 16
    },
    extraLarge: {
        fontSize: 18
    },
    // Font Weights
    bold: {
        fontFamily: 'Bold'
    },
    mediumWeight: {
        fontFamily: 'Medium'
    },
    book: {
        fontFamily: 'Regular'
    },

    lineHeight: {
        lineHeight: 16
    },

    // Text Decoration
    strikethrough: {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    },
    underline: {
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid'
    },

    // Colors
    primary: {
        color: '#4BD4B0'
    },
    black: {
        color: '#000'
    },
    greyDefault: {
        color: '#999CA4'
    },
    o: {
        color: '#FF6633'
    },
    w: {
        color: '#fff'
    },
    error: {
        color: 'red'
    },
    red: {
        color: '#e44545'
    }
});
