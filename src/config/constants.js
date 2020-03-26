import { Dimensions } from 'react-native';

export default {
    window: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    screen: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
    isSmallDevice: Dimensions.get('window').width < 375,
    isLargeDevice: Dimensions.get('window').width > 575,
};