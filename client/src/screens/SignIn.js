import React, {useState, useContext} from 'react';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';
import {Context as authContext} from '../context/AuthContext';
import {NavigationEvents} from 'react-navigation';

export default function SignIn({navigation}) {
  const {state, signin, clearErrorMessage} = useContext(authContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.inputContainer}>
        <NavigationEvents onWillFocus={clearErrorMessage} />
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
        {state.errorMessage ? <Text>{state.errorMessage}</Text> : null}
        <Button title="LOGIN" onPress={() => signin({email, password})} />
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={styles.switch}>
          <Text>No account? SignUp</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
SignIn.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8a1a3d',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  switch: {
    alignItems: 'center',
    marginTop: 10,
  },
});
