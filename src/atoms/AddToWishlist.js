import React from 'react';
import { connect } from 'react-redux';
import { toggleItemInWishlist } from 'redux/actions/wishlist';
import { StyleSheet, Animated, View, Image } from 'react-native';

import { Text } from './Text';
import TouchableItem from 'components/TouchableItem';
import { IconsGlobal } from 'config/AppIcons/AppIcons';

class AddToWishlist extends React.PureComponent {
    state = {
        springValue: new Animated.Value(1)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.inWishlist !== this.props.inWishlist) {
            Animated.sequence([
                Animated.timing(this.state.springValue, { toValue: 1.2, duration: 50 }),
                Animated.timing(this.state.springValue, { toValue: 1, duration: 50 }),
                Animated.timing(this.state.springValue, { toValue: 1.2, duration: 50 }),
                Animated.timing(this.state.springValue, { toValue: 1, duration: 50 }),
            ]).start();
        }
    }

    onToggleWishlist = () => {
        this.props.toggleItemInWishlist({ ...this.props.product, productOptionID: this.props.productOptionID });
    }

    render() {
        const { justIcon, isPDP, inWishlist, hitSlop } = this.props;

        if (justIcon) {
            return (
                <TouchableItem hitSlop={hitSlop} onPress={this.onToggleWishlist}>
                    <Animated.View style={{ transform: [{ scale: this.state.springValue }] }}>
                        <Image source={inWishlist ? IconsGlobal.addToWishlistActive : IconsGlobal.addToWishlist} style={styles.icon} />
                    </Animated.View>
                </TouchableItem>
            )
        }

        if (isPDP) {
            return (
                <TouchableItem hitSlop={hitSlop} style={styles.pdpButton} onPress={this.onToggleWishlist}>
                    <View style={styles.extraButtonInner}>
                        <Animated.View style={{ transform: [{ scale: this.state.springValue }] }}>
                            <Image source={inWishlist ? IconsGlobal.addToWishlistActive : IconsGlobal.addToWishlist} style={styles.icon} />
                        </Animated.View>
                    </View>
                </TouchableItem>
            )
        }

        return (
            <TouchableItem style={styles.extraButton} onPress={this.onToggleWishlist}>
                <View style={styles.extraButtonInner}>
                    <Animated.View style={[styles.extraIconContainer, { transform: [{ scale: this.state.springValue }] }]}>
                        <Image source={inWishlist ? IconsGlobal.addToWishlistActive : IconsGlobal.addToWishlist} style={styles.icon} />
                    </Animated.View>
                    <Text type='g' bold>{inWishlist ? 'Remove from' : 'Add to'} Wishlist</Text>
                </View>
            </TouchableItem>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        inWishlist: state.wishlist.find(item => item.ID === props.product.ID)
    }
}

export default connect(mapStateToProps, { toggleItemInWishlist })(AddToWishlist)

const styles = StyleSheet.create({
    pdpButton: {
        height: 45,
        paddingHorizontal: 15,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '35%',
        marginHorizontal: 5,
        borderColor: '#E7E8E9',
        borderWidth: 1,
        borderRadius: 7
    },
    extraButton: {
        padding: 20,
        flexGrow: 1,
        flexBasis: 0
    },
    extraButtonInner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 20,
        height: 20
    },
    extraIconContainer: {
        marginRight: 10
    }
})