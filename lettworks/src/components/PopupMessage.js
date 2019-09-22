import React, { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';

import Layout from 'config/constants';

import { Text, BlankButton } from 'atoms';

export default class PopupMessage extends React.PureComponent {
    //The rendered state is because we need an initial render so the safearea can figure out its size
    state = {
        rendered: false
    }
    componentDidMount() {
        this.setState({ rendered: true })
    }
    render() {
        const { style, message, title, confirm, subtitle, center, leftContent, rightContent, onConfirm, colour, primary } = this.props;
        return (
            <View style={styles.modal}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.messageContainer}>
                        {this.state.rendered ?
                          <Fragment>
                              <View style={[styles.message, styles[colour]]}>
                                  <View style={styles.content}>
                                      {leftContent || null}
                                      <View style={{ flex: 1 }}>
                                          <View style={styles.top}>
                                              <Text style={styles.title} extraLarge bold type='w'>{title}</Text>
                                              {subtitle ? <Text type='w'>{subtitle}</Text> : null}
                                          </View>
                                          {message ? <Text type='w' medium lineHeight>{message}</Text> : this.props.children}
                                      </View>
                                      {rightContent || null}
                                  </View>
                                  <BlankButton style={styles.confirm} onPress={onConfirm}>
                                    <Text bold type='w'>{confirm}</Text>
                                  </BlankButton>
                              </View>
                              <View style={[styles.triangle, center ? styles.center : null, {borderBottomColor: primary ? '#4BD4B0' : "#C0392B"}]} />
                          </Fragment>
                          : null}
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: Layout.window.width,
        height: Layout.window.height,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    container: {
        position: 'relative',
        flex: 1
    },
    messageContainer: {
        position: 'relative',
        flex: 1
    },
    top: {
        flexDirection: 'row',
        flex: 1
    },
    content: {
        flexDirection: 'row',
        flex: 1,
        overflow: 'hidden'
    },
    title: {
        marginBottom: 5,
        marginRight: 5
    },
    confirm: {
        paddingHorizontal: 10,
        alignSelf: 'flex-end',
        paddingTop: 10, 
        borderWidth: 1, 
        borderColor: '#eee', 
        borderRadius: 7, 
        margin: 15
    },
    message: {
        marginHorizontal: 20,
        borderRadius: 10,
        padding: 10,
        paddingBottom: 0,
        position: 'absolute',
        bottom: 60,
        width: Layout.window.width - 40
    },
    primary: {
      backgroundColor: '#4BD4B0',
    }, 
    warning: {
      backgroundColor: "#C0392B"
    },
    triangle: {
        position: 'absolute',
        zIndex: 1,
        bottom: 50,
        right: Layout.window.width / 10 - 10,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        transform: [{ rotate: '180deg' }]
    },
    center: {
        right: Layout.window.width / 2 - 10
    }
})