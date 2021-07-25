import React, {useContext} from 'react';
import {
  Button,
  SafeAreaView,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {Context as TrackContext} from '../context/TrackContext';

export default function TrackList({navigation}) {
  const {state, fetchTracks} = useContext(TrackContext);
  return (
    <SafeAreaView
      forceInset={{top: 'always'}}
      style={{backgroundColor: '#F5F6FA', flex: 1}}>
      {/* ith nammal evidennenkilum ingot navigate cheyyunna samayath call cheyyappedum */}
      <NavigationEvents onWillFocus={fetchTracks} />
      <Text style={styles.font}>Track List</Text>
      <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.list}
              onPress={() => {
                navigation.navigate('TrackDetails', {_id: item._id});
              }}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

TrackList.navigationOptions = {
  tabBarLabel: 'TRACK LIST',
};

const styles = StyleSheet.create({
  font: {
    fontSize: 40,
    alignSelf: 'center',
  },
  list: {
    marginHorizontal: 20,
    backgroundColor: '#9DC4EA',
    marginVertical: 10,
    height: 30,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
