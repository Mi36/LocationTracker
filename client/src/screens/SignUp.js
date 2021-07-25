import React, {useContext, useRef, useState} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Platform,
} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import {NavigationEvents} from 'react-navigation';
import {Context as authContext} from '../context/AuthContext';

export default function SignUp({navigation}) {
  const textInput = useRef(null);

  const {state, signup, clearErrorMessage} = useContext(authContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <NavigationEvents onWillFocus={clearErrorMessage} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={styles.container}>
          <View style={styles.container}>
            <View style={styles.top}>
              <Text style={styles.header}>New Account</Text>
              <Text style={styles.content}>Sign up and get started</Text>
            </View>
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              autoCorrect={false}
              onSubmitEditing={() => {
                textInput.current.focus();
              }}
              inputStyle={styles.input}
              inputContainerStyle={styles.inputBox}
            />

            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              ref={textInput}
              inputStyle={styles.input}
              inputContainerStyle={styles.inputBox}
              errorMessage={state.errorMessage}
            />
            <Button
              buttonStyle={styles.button}
              title="SIGNUP"
              onPress={() => signup({email, password})}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('SignIn')}
              style={{
                alignItems: 'center',
              }}>
              <Text style={styles.buttonText}>
                Already have account? Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

SignUp.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF0F8',
    marginHorizontal: 10,
    justifyContent: 'center',
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
});
