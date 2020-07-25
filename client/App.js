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

const switchNavigator = createSwitchNavigator({
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

export default createAppContainer(switchNavigator);
