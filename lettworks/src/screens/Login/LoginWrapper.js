import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    StatusBar,
    Platform,
} from 'react-native';
import Layout from 'config/constants';

import { ImagesLogos } from 'config/AppIcons/AppLogos';
import { ImagesIntro } from 'config/AppIntro';

export default class LoginWrapper extends React.PureComponent {
    render() {
        return (
            <ImageBackground style={styles.container} source={ImagesIntro.main}>
                <View style={styles.fullScreenOverlay}>
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        ref={r => (this.scroll = r)}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ overflow: 'hidden', flexGrow: 1 }}>
                        <View style={[styles.container, styles.scrollContainer]}>
                            <View style={[styles.form, styles.center]}>
                                <View style={styles.image}>
                                    <Image style={styles.logo} source={ImagesLogos.logo} />
                                </View>

                                <KeyboardAvoidingView
                                    behavior={'padding'}
                                    keyboardVerticalOffset={this.props.offset || 0}
                                    enabled>
                                    <View>{this.props.children}</View>
                                </KeyboardAvoidingView>
                            </View>
                            <View style={styles.actions}>{this.props.actions}</View>
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    scrollContainer: {
        height: '100%',
        flex: 1,
        //minHeight: Layout.screen.height - (Layout.screen.height - Layout.window.height),
    },
    text: {
        color: '#fff',
    },
    form: {
        width: '100%',
        padding: 20,
        marginTop: StatusBar.currentHeight || 20,
    },
    image: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        marginBottom: 40,
    },
    logo: {
        width: 120,
        height: 120,
    },
    center: {
        justifyContent: 'center',
        flex: 1,
    },
    actions: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 20,
        paddingTop: 10,
    },
    fullScreenOverlay: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.80)',
        flex: 1,
    },
    fullScreen: {
        width: '100%',
        height: '100%',
    },
});
