import React from 'react';
import { Animated, View } from 'react-native';
import { BottomTabBar } from 'react-navigation';

let tabBarOffset = 55;

export default class TabBar extends React.Component {
    state = {
        offset: new Animated.Value(0),
        position: 'relative'
    };

    componentWillReceiveProps(props) {
        let oldHideTabBar = false;
        let newHideTabBar = false;
        const oldState = this.props.navigation.state;
        const oldRoute = oldState.routes[oldState.index];
        const oldParams = oldRoute.routes[oldRoute.index].params;

        if (oldParams && oldParams.hasOwnProperty('hideTabBar')) {
            oldHideTabBar = oldParams.hideTabBar;
        }

<<<<<<< Updated upstream
=======
      state = {
        offset: new Animated.Value(0),
        position: 'relative'
     };

    componentWillReceiveProps(props) {
        let oldHideTabBar = false;
        let newHideTabBar = false;
        const oldState = this.props.navigation.state;
        const oldRoute = oldState.routes[oldState.index];
        const oldParams = oldRoute.routes[oldRoute.index].params;

        if (oldParams && oldParams.hasOwnProperty('hideTabBar')) {
            oldHideTabBar = oldParams.hideTabBar;
        }

>>>>>>> Stashed changes
        const newState = props.navigation.state;
        const newRoute = newState.routes[newState.index];
        const newParams = newRoute.routes[newRoute.index].params;

        if (newParams && newParams.hasOwnProperty('hideTabBar')) {
            newHideTabBar = newParams.hideTabBar;
        }

        if (oldHideTabBar && !newHideTabBar) {
            Animated.timing(this.state.offset, { toValue: 0, duration: 500 }).start();
            setTimeout(() => {
                if (this.state.offset._value === 0) this.setState({ position: 'relative' });
            }, 500);
        } else if (newHideTabBar && !oldHideTabBar) {
            this.setState({ position: 'absolute' });
            Animated.timing(this.state.offset, { toValue: tabBarOffset * -1, duration: 500 }).start();
        }
    }

<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
    onLayout(event) {
        if (event.nativeEvent.layout.height > tabBarOffset) {
            tabBarOffset = event.nativeEvent.layout.height;
        }
    }

    render() {
        return (
            <View onLayout={this.onLayout}>
                <BottomTabBar {...this.props} style={[styles.container, { bottom: this.state.offset, position: this.state.position }]} />
            </View >
        );
    }
}

const styles = {
    container: {
        height: 55,
        paddingTop: 5,
        paddingBottom: 5,
        overflow: 'hidden',
        bottom: 0,
        left: 0,
        right: 0
    },
};