// AIM: to add ability to save a track and connect between two context files.

import {useContext} from 'react';
import {Context as TrackContext} from '../context/TrackContext';
import {Context as LocationContext} from '../context/LocationContext';
import {navigate} from '../navigationRef';

export default () => {
  const {createTrack} = useContext(TrackContext);
  const {
    state: {locations, name},
    reset,
  } = useContext(LocationContext);

  // we are not going to call create track directly here.
  //hook undakkan karanam ee code okke re use cheyyan vendi aanu. So

  const saveTrack = async () => {
    await createTrack(name, locations);
    // adiyil kodutha code run cheyyunnath mukalilathe code success response thanna shesham mathram
    reset();
    navigate('TrackList');
  };

  //ivide nammal cheyyunnath exposing a function that every component can use
  // ithanu nammal hook kond udheshikkunnath
  // ith evide ninnano call cheyyunnath avide vech saveTrack function run aakum
  //ath use cheyyunna arguments ippo nilavil ulla locations and name aayirikkum
  return [saveTrack];
};
