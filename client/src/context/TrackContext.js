// All about saving + retreiving existing track from our api
//locationContext contains locations array and name property. we want to fetch it from there and pass to this and finally to server
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const trackReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const fetchTracks = (dispatch) => async () => {};
const createTrack = (dispatch) => async (name, locations) => {
  // make a request to backend api from here
  const response = await trackerApi.post('/tracks', {name, locations});
};

export const {Provider, Context} = createDataContext(
  trackReducer,
  {fetchTracks, createTrack},
  [],
);
