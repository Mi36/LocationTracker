import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {Text, StyleSheet} from 'react-native';
import {Context as TrackContext} from '../context/TrackContext';

export default function TrackDetails({navigation}) {
  const {state} = useContext(TrackContext);

  const _id = navigation.getParam('_id');

  // nammal nokkunna sadhanam kittiyal iteration nirthum
  const track = state.find((t) => t._id === _id);

  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <Text style={styles.font}>{track.name}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  font: {
    fontSize: 48,
  },
});
