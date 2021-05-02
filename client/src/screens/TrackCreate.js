import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState, useContext} from 'react';
import {
  PermissionsAndroid,
  Platform,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import MapView, {Polyline, PROVIDER_GOOGLE, Circle} from 'react-native-maps';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {Context as LocationContext} from '../context/LocationContext';
export default function TrackCreate() {
  const {
    state: {currentLocation},
    addLocation,
  } = useContext(LocationContext);

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
          Geolocation.watchPosition(
            (position) => {
              console.log('position', position);
              addLocation(position);
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
                  addLocation(position);
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

  let points = [];
  for (let i = 0; i < 20; i++) {
    points.push({
      latitude: 37.78825 + i * 0.001,
      longitude: -122.4324 + i * 0.001,
    });
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {currentLocation ? (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              ...currentLocation.coords,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            // usage of region : if we use regio in state and update from there, then for automatic map update and re-zoom and re-render
            region={{
              ...currentLocation.coords,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}>
            {/* <!--the code below is used for appil vara idan --> */}
            <Polyline coordinates={points} />
            <Circle
              center={currentLocation.coords}
              radius={40}
              strokeColor="rgba(158,158,255,1.0)"
              fillColor="rgba(158,158,255,0.3)"
            />
          </MapView>
        ) : (
          <ActivityIndicator size="large" style={styles.indicator} />
        )}
        {err ? <Text>Please enable location services</Text> : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
  },
  indicator: {
    marginTop: 200,
  },
});
