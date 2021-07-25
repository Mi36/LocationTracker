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
        <View style={styles.top}>
          <Text style={styles.header}>Welcome!</Text>
          <Text style={styles.content}>Sign in and get started</Text>
        </View>
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          inputStyle={styles.input}
          inputContainerStyle={styles.inputBox}
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          inputStyle={styles.input}
          inputContainerStyle={styles.inputBox}
          errorMessage={state.errorMessage}
        />

        <Button
          buttonStyle={styles.button}
          title="LOGIN"
          onPress={() => signin({email, password})}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={styles.switch}>
          <Text>No account? Sign Up</Text>
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
    backgroundColor: '#EFF0F8',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  switch: {
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    height: 50,
    borderColor: '#C3BCEF',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#525CDF',
    borderRadius: 20,
    height: 50,
    marginHorizontal: 10,
  },
  inputBox: {
    borderRadius: 20,
    borderWidth: 1,
  },
  top: {
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: '500',
    color: '#A2A8D3',
  },
  content: {
    fontWeight: '500',
    paddingVertical: 10,
  },
});
