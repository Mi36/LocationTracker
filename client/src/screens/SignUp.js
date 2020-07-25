import React from 'react';
import {View, Text, Button} from 'react-native';

export default function SignUp({navigation}) {
  console.log('runmning');
  return (
    <View style={{backgroundColor: 'red'}}>
      <Text>signup</Text>
      <Button
        title="press"
        onPress={() => {
          navigation.navigate('SignIn');
        }}
      />
      <Button
        title="GoTO MainFlow"
        onPress={() => {
          navigation.navigate('mainFlow');
        }}
      />
    </View>
  );
}
