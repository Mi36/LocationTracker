import React, {useContext} from 'react';
import {Input, Button} from 'react-native-elements';
import Spacer from './Spacer';
import {Context as LocationContext} from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';
import {StyleSheet} from 'react-native';

const TrackForm = () => {
  const {
    state: {name, recording, locations},
    startRecording,
    stopRecording,
    changeName,
  } = useContext(LocationContext);

  const [saveTrack] = useSaveTrack();
  const disabled = !name || name === '' ? true : false;

  return (
    <>
      <Spacer>
        <Input
          value={name}
          onChangeText={changeName}
          placeholder="Enter name"
          inputStyle={styles.input}
          inputContainerStyle={styles.inputBox}
        />
      </Spacer>
      <Spacer>
        {recording ? (
          <Button
            title="Stop"
            onPress={stopRecording}
            buttonStyle={styles.button}
          />
        ) : (
          <Button
            title="Start Recording"
            onPress={startRecording}
            buttonStyle={styles.button}
            disabled={disabled}
          />
        )}
      </Spacer>
      <Spacer>
        {!recording && locations.length ? (
          <Button
            title="Save Recording"
            onPress={saveTrack}
            buttonStyle={styles.button}
          />
        ) : null}
      </Spacer>
    </>
  );
};

export default TrackForm;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#525CDF',
    borderRadius: 20,
    height: 50,
    marginHorizontal: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    height: 50,
    borderColor: '#C3BCEF',
    paddingHorizontal: 10,
  },
  inputBox: {
    borderRadius: 20,
    borderWidth: 1,
  },
});
