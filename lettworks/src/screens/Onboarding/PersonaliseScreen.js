import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from 'redux/actions/user';
import { StyleSheet, View } from 'react-native';
import { Button } from 'atoms';

import Container from './components/Container';
import Heading from './components/Heading';
import TopBar from './components/TopBar';

class PersonaliseScreen extends React.PureComponent {
    state = {
        user: {},
    }
   
    onNext = () => {
        this.props.navigation.navigate('Property');
    }

    render() {
        const { user } = this.props;

        return (
            <Container>
                <TopBar onSkip={this.onNext} />

                <Heading
                    title={(user && user.firstName ? `${user.firstName},${'\n'}` : null) + `Personalise${'\n'}your app`}
                    subtitle="Want to get exactly what you're after? Personalise your profile so we can bring you the best properties just for you."
                />

                <View>
                    <Button style={styles.buttonContainer} medium buttonStyle={styles.actionButton} onPress={this.onNext} colour='black'>Get Started</Button>
                </View>
                <View></View>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user, 
        auth: state.auth
    }
}

export default connect(mapStateToProps, { updateUser })(PersonaliseScreen);

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionButton: {
        width: '70%',
        height: 50
    }
});