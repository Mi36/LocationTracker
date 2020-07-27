import React from 'react';
import {View, Text, Button, SafeAreaView} from 'react-native';

export default function AccountScreen({navigation}) {
  return (
    <SafeAreaView>
      <Text>accountscreen</Text>
      <Button
        title="go auth flow"
        onPress={() => {
          navigation.navigate('loginFlow');
        }}
      />
    </SafeAreaView>
  );
}
