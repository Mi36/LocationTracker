// AIM: to add ability to save a track and connect between two context files.

import {useContext} from 'react';
import {Context as TrackContext} from '../context/TrackContext';
import {Context as LocationContext} from '../context/LocationContext';

export default () => {
  const {createTrack} = useContext(TrackContext);
  const {
    state: {locations, name},
  } = useContext(LocationContext);

  // we are not going to call create track directly here.
  //hook undakkan karanam ee code okke re use cheyyan vendi aanu. So

  const saveTrack = () => {
    createTrack(name, locations);
  };

  //ivide nammal cheyyunnath exposing a function that every component can use
  // ithanu nammal hook kond udheshikkunnath
  // ith evide ninnano call cheyyunnath avide vech saveTrack function run aakum
  //ath use cheyyunna arguments ippo nilavil ulla locations and name aayirikkum
  return [saveTrack];
};
