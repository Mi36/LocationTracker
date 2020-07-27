import React, {useState, useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import {Context as authContext} from '../context/AuthContext';

export default function SignUp({navigation}) {
  const {state, signup} = useContext(authContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView style={{backgroundColor: 'pink'}}>
      <Input label="Email" value={email} onChangeText={setEmail} />
      <Input label="Password" value={password} onChangeText={setPassword} />
      <Button title="Sign Up" onPress={() => signup({email, password})} />

      {/* <Button
        title="press"
        onPress={() => {
          navigation.navigate('SignIn');
        }}
      /> */}
      {/* <Button
        title="GoTO MainFlow"
        onPress={() => {
          navigation.navigate('mainFlow');
        }}
      /> */}
    </SafeAreaView>
  );
}

SignUp.navigationOptions = () => {
  return {
    header: () => false,
  };
};
