import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const instance = axios.create({
  baseURL: 'https://track-my-path.herokuapp.com/',
});

// below code added to send token automatically to request if there is token available
// by default there is a confi we sending while making axios request above.
// by writing below code we updating that config and pass header through that.
//2 functions as argument in below intercepter.
// first one called automatically any time made a request
// second one called if there is an error

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    // TODO: verify whether this error gets returned to original place we calling api
    return Promise.reject(err);
  },
);
