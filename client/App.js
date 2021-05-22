import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Require cycle']);
import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import SignUp from './src/screens/SignUp';
import SignIn from './src/screens/SignIn';
import TrackList from './src/screens/TrackList';
import TrackCreate from './src/screens/TrackCreate';
import TrackDetails from './src/screens/TrackDetails';
import AccountScreen from './src/screens/AccountScreen';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {Provider as LocationProvider} from './src/context/LocationContext';
import {Provider as TrackProvider} from './src/context/TrackContext';
import {setNavigator} from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    SignUp: SignUp,
    SignIn: SignIn,
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow: createStackNavigator({
      TrackList: TrackList,
      TrackDetails: TrackDetails,
    }),
    TrackCreate: TrackCreate,
    Account: AccountScreen,
  }),
});
//export default createAppContainer(switchNavigator);

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    //ivide oro providers onninu mukalil onnayi kodukkuka
    // ee order enthayalum prashnamilla

    <LocationProvider>
      <AuthProvider>
        <TrackProvider>
          <App
            ref={(navigator) => {
              setNavigator(navigator);
            }}
          />
        </TrackProvider>
      </AuthProvider>
    </LocationProvider>
  );
};
