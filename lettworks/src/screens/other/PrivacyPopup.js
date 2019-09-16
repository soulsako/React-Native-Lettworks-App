import React, { PureComponent } from 'react';
import { View, Modal, WebView, StatusBar } from 'react-native';

import { BackArrow } from 'atoms';

export default class PrivacyPopup extends PureComponent {
    render() {
        return (
            <View>
                <StatusBar hidden={true} />
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={true}
                    onRequestClose={this.props.onBack}>
                    <BackArrow onPress={this.props.onBack} />
                    <WebView source={{ uri: 'https://www.jdsports.co.uk/customer-service/privacy/' }} />
                </Modal>
            </View>
        );
    }
}