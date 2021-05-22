// All about saving + retreiving existing track from our api
//locationContext contains locations array and name property. we want to fetch it from there and pass to this and finally to server
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const trackReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_tracks':
      return action.payload;
    default:
      return state;
  }
};

const fetchTracks = (dispatch) => async () => {
  // TODO:handle error
  const response = await trackerApi.get('/tracks');
  console.log(`response`, response);
  dispatch({type: 'fetch_tracks', payload: response.data});
};
const createTrack = (dispatch) => async (name, locations) => {
  // make a request to backend api from here
  // TODO:handle error
  const response = await trackerApi.post('/tracks', {name, locations});
};

export const {Provider, Context} = createDataContext(
  trackReducer,
  {fetchTracks, createTrack},
  [],
);
