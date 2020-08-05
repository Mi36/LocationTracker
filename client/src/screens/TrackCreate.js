import React, {useEffect, useState} from 'react';
import {View, PermissionsAndroid, Button, Text, Platform} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';

export default function TrackCreate() {
  const [err, setErr] = useState(null);

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
      request(PERMISSIONS.IOS.LOCATION_ALWAYS)
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
    <View>
      <MapView
        style={{
          height: 400,
          width: 400,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {/* <!--the code below is used for appil vara idan --> */}
        <Polyline coordinates={points} />
      </MapView>
      <Button title="request permissions" onPress={requestLocationPermission} />
      {err ? <Text>Please enable location services</Text> : null}
    </View>
  );
}
