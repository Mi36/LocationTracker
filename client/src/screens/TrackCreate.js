import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {PermissionsAndroid, Platform, Text, View} from 'react-native';
import MapView, {Polyline, PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

export default function TrackCreate() {
  const [err, setErr] = useState(null);
  const startWatching = async () => {
    try {
      await requestLocationPermission();
    } catch (e) {
      setErr(e);
    }
  };

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
          Geolocation.getCurrentPosition(
            (position) => {
              console.log(position);
            },
            (err) => {
              console.log(err);
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
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

  let points = [];
  for (let i = 0; i < 20; i++) {
    points.push({
      latitude: 37.78825 + i * 0.001,
      longitude: -122.4324 + i * 0.001,
    });
  }

  return (
    <SafeAreaView>
      <View style={{position: 'relative', height: '100%'}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{left: 0, right: 0, top: 0, bottom: 0, position: 'absolute'}}
          initialRegion={{
            latitude: 10.8505,
            longitude: 76.2711,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {/* <!--the code below is used for appil vara idan --> */}
          <Polyline coordinates={points} />
        </MapView>
        {err ? <Text>Please enable location services</Text> : null}
      </View>
    </SafeAreaView>
  );
}
