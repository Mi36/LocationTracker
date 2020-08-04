import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-community/async-storage';
import {navigate} from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'signup':
      return {errorMessage: '', token: action.payload};
    case 'signin':
      return {errorMessage: '', token: action.payload};
    case 'signout':
      return {errorMessage: '', token: null};
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    default:
      return state;
  }
};

const clearErrorMessage = (dispatch) => () => {
  console.log('ssssss');
  dispatch({type: 'clear_error_message'});
};

const tryLocalSignIn = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({type: 'signin', payload: token});
    navigate('TrackList');
  } else {
    navigate('SignIn');
  }
};

const signup = (dispatch) => {
  return async ({email, password}) => {
    try {
      const response = await trackerApi.post('/signup', {email, password});
      console.log(response);
      await AsyncStorage.setItem('token', response.data.token);
      dispatch({type: 'signup', payload: response.data.token});
      navigate('TrackList');
    } catch (e) {
      dispatch({
        type: 'add_error',
        payload: 'error, Something went wrong in signup',
      });
    }
  };
};

const signin = (dispatch) => {
  return async ({email, password}) => {
    try {
      const response = await trackerApi.post('/signin', {email, password});
      console.log(response);
      await AsyncStorage.setItem('token', response.data.token);
      dispatch({type: 'signin', payload: response.data.token});
      navigate('TrackList');
    } catch (e) {
      console.log(e);
      dispatch({
        type: 'add_error',
        payload: 'error, Something went wrong in signIn',
      });
    }
  };
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({type: 'signout'});
  navigate('SignIn');
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, signout, signup, clearErrorMessage, tryLocalSignIn},
  {token: null, errorMessage: ''},
);
