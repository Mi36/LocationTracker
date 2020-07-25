import React from 'react';
import {View, Text, Button} from 'react-native';

export default function TrackList({navigation}) {
  return (
    <View>
      <Text>track list</Text>
      <Button
        title="next"
        onPress={() => {
          navigation.navigate('TrackDetails');
        }}
      />
    </View>
  );
}
