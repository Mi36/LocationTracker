// All about saving + retreiving existing track from our api
//locationContext contains locations array and name property. we want to fetch it from there and pass to this and finally to server
import createDataContext from './createDataContext';

const trackReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const fetchTracks = (dispatch) => () => {};
const createTrack = (dispatch) => () => {};

export const {Provider, Context} = createDataContext(
  trackReducer,
  {fetchTracks, createTrack},
  [],
);
