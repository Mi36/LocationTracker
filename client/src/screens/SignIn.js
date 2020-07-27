import React, {useState} from 'react';
import {View} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';

export default function SignIn({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{backgroundColor: 'pink'}}>
      <Input label="Email" value={email} onChangeText={setEmail} />
      <Input label="Password" value={password} onChangeText={setPassword} />
      <Button title="Sign Up" />
    </View>
  );
}
///
