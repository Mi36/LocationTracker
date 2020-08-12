import React, {useState, useContext, useRef} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import {Context as authContext} from '../context/AuthContext';
import {navigate} from '../navigationRef';
import {NavigationEvents} from 'react-navigation';

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
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={styles.container}>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require('../images/logo.png')}
              />
              <Text style={styles.title}>Account Information</Text>
            </View>
            <View style={styles.infoContainer}>
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
              />

              <Input
                label="Password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                ref={textInput}
              />

              {state.errorMessage ? <Text>{state.errorMessage}</Text> : null}
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => signup({email, password})}>
                <Text style={styles.buttonText}>SiGNUP</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.buttonText}>
                  Already have account? SignIn
                </Text>
              </TouchableOpacity>
            </View>
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
  scrollView: {
    backgroundColor: 'pink',
  },
  container: {
    flex: 1,
    backgroundColor: '#8a1a3d',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    //backgroundColor: 'grey',
  },
  logo: {
    width: 128,
    height: 56,
  },
  title: {
    color: '#f7c744',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.9,
  },
  infoContainer: {
    //backgroundColor: 'green',
  },
  buttonContainer: {
    backgroundColor: '#f7c744',
    paddingVertical: 15,
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
