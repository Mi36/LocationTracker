import React, {useContext} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, {Circle, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import {Context as LocationContext} from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
export default function TrackCreate() {
  const {
    state: {currentLocation},
    addLocation,
  } = useContext(LocationContext);

  const [err] = useLocation(addLocation);

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
