import createDataContext from './createDataContext';

const locationReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
const startRecording = (dispatch) => () => {};
const stopRecording = (dispatch) => () => {};
const addLocation = (dispatch) => () => {};

export const {Context, Provider} = createDataContext(
  locationReducer, //reducer
  {startRecording, stopRecording, addLocation}, //all actions
  {recording: false, locations: [], currentLocation: null}, //initial state
);
///after doing all of these wire up above provider in app.js file
// 1- import to app.js --->
//wrap the App.js 's return
