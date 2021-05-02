import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

export default (callback) => {
  const [err, setErr] = useState(null);
  useEffect(() => {
    startWatching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
          Geolocation.watchPosition(
            (position) => {
              console.log('position', position);
              callback(position);
            },
            (_err) => {
              console.log('error', _err);
            },
            {enableHighAccuracy: false, timeout: 5000},
          );
          Geolocation.getCurrentPosition(
            (position) => {
              console.log('current', position);
            },
            (_err) => {
              console.log(_err);
            },
            {enableHighAccuracy: false, timeout: 5000},
          );
        } else {
          console.log('location permission denied');
        }
      } catch (e) {
        setErr(e);
      }
    }
    if (Platform.OS === 'ios') {
      request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        .then((result) => {
          console.log(result);
        })
        .catch((e) => {
          console.log(e);
        });
      check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        .then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log(
                'This feature is not available (on this device / in this context)',
              );
              break;
            case RESULTS.DENIED:
              console.log(
                'The permission has not been requested / is denied but requestable',
              );
              break;
            case RESULTS.GRANTED:
              console.log('The permission is granted');
              Geolocation.watchPosition(
                (position) => {
                  console.log('position', position);
                  callback(position);
                },
                (_err) => {
                  console.log('error', _err);
                },
                {enableHighAccuracy: false, timeout: 5000},
              );
              Geolocation.getCurrentPosition(
                (position) => {
                  console.log('current', position);
                },
                (_err) => {
                  console.log(_err);
                },
                {enableHighAccuracy: false, timeout: 5000},
              );
              break;
            case RESULTS.BLOCKED:
              console.log(
                'The permission is denied and not requestable anymore',
              );
              break;
          }
        })
        .catch((error) => {
          setErr(error);
        });
    }
  };

  const startWatching = async () => {
    try {
      await requestLocationPermission();
    } catch (e) {
      setErr(e);
    }
  };

  // it returns error if ther error

  return [err];
};
