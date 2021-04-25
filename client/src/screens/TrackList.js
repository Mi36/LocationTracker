import React from 'react';
import {Button, SafeAreaView, Text, StyleSheet} from 'react-native';

export default function TrackList({navigation}) {
  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <Text style={styles.font}>Track List</Text>
      <Button
        title="next"
        onPress={() => {
          navigation.navigate('TrackDetails');
        }}
      />
    </SafeAreaView>
  );
}

TrackList.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  font: {
    fontSize: 48,
  },
});
