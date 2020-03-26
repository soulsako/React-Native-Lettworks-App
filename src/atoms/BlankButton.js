import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';

export default class BlankButton extends React.PureComponent {
    render() {
        const {children,style,...others}=this.props;
        return(
            <TouchableWithoutFeedback {...others}><View style={[styles.button,style]}>{children}</View></TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    button:{
        paddingVertical: 10
    }
})