import React from 'react';
import {SafeAreaView} from 'react-native';
import {Text, StyleSheet} from 'react-native';

export default function TrackDetails() {
  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <Text style={styles.font}>Track Details</Text>
    </SafeAreaView>
  );
}

TrackDetails.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  font: {
    fontSize: 48,
  },
});
