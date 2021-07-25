import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {Context as TrackContext} from '../context/TrackContext';
import MapView, {Polyline} from 'react-native-maps';
export default function TrackDetails({navigation}) {
  const {state} = useContext(TrackContext);

  const _id = navigation.getParam('_id');

  // nammal nokkunna sadhanam kittiyal iteration nirthum
  const track = state.find((t) => t._id === _id);
  const initialCoords = track.locations[0].coords;

  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <Text style={styles.font}>{track.name}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          ...initialCoords,
        }}>
        <Polyline coordinates={track.locations.map((loc) => loc.coords)} />
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  font: {
    fontSize: 38,
    alignSelf: 'center',
  },
  map: {
    height: '100%',
    padding: 10,
  },
});
