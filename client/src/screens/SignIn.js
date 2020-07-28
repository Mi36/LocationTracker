import React, {useState, useContext} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';
import {Context as authContext} from '../context/AuthContext';

export default function SignIn({navigation}) {
  const {state, signin} = useContext(authContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{backgroundColor: 'pink'}}>
      <Input label="Email" value={email} onChangeText={setEmail} />
      <Input label="Password" value={password} onChangeText={setPassword} />
      {state.errorMessage ? <Text>{state.errorMessage}</Text> : null}
      <Button title="LOGIN" onPress={() => signin({email, password})} />
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text>No account? SignUp</Text>
      </TouchableOpacity>
    </View>
  );
}
///
