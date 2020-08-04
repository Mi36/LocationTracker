import React, {useContext} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Button} from 'react-native-elements';
import {Context as authContext} from '../context/AuthContext';
export default function AccountScreen({navigation}) {
  const {state, signout} = useContext(authContext);
  return (
    <SafeAreaView>
      <Text>accountscreen</Text>
      <Button title="go auth flow" onPress={signout} />
    </SafeAreaView>
  );
}
