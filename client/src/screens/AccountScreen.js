import React, {useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {SafeAreaView} from 'react-navigation';
import {Context as AuthContext} from '../context/AuthContext';
const Spacer = ({children}) => {
  return <View style={styles.spacer}>{children}</View>;
};

const AccountScreen = () => {
  const {signout} = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{top: 'always'}}>
      <Text style={{fontSize: 48}}>AccountScreen</Text>
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = {
  title: 'Account',
};

const styles = StyleSheet.create({
  spacer: {
    margin: 15,
  },
});

export default AccountScreen;
