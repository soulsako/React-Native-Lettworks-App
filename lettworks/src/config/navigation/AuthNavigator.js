import { createStackNavigator } from 'react-navigation';
import Login from 'screens/Login/Login';
import Register from 'screens/Login/Register';
// import Confirmation from 'screens/Login/Confirmation';
import Reset from 'screens/Login/ResetPassword';
import ForgotPassword from 'screens/Login/ForgotPassword';
import StartPage from 'screens/Login/StartPage';

const Navigator = createStackNavigator(
    {
        Start: { screen: StartPage },
        Login: { screen: Login },
        Register: { screen: Register },
        // Confirm: { screen: Confirmation },
        Reset: { 
          screen: Reset, 
          path: 'reset/:token'
         },
        Forgot: { 
          screen: ForgotPassword
        }
    }, {
        initialRouteName: 'Start',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export default Navigator; 