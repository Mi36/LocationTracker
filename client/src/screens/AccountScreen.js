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
    <SafeAreaView
      forceInset={{top: 'always'}}
      style={{backgroundColor: '#E7E9F9', flex: 1, justifyContent: 'center'}}>
      <Spacer>
        <Button
          title="Sign Out"
          onPress={signout}
          buttonStyle={styles.button}
        />
      </Spacer>
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = {
  title: 'ACCOUNT',
};

const styles = StyleSheet.create({
  spacer: {
    margin: 15,
  },
  button: {
    backgroundColor: '#525CDF',
    borderRadius: 20,
    height: 50,
    marginHorizontal: 10,
  },
});

export default AccountScreen;
