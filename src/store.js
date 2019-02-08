import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
//Reducers
// todo

const firebaseConfig = {
  apiKey: "AIzaSyCTEDXPW1-wi6aQJJAlz8skxq3u_RbeO9Q",
  authDomain: "reactclientproject-b3e4c.firebaseapp.com",
  databaseURL: "https://reactclientproject-b3e4c.firebaseio.com",
  projectId: "reactclientproject-b3e4c",
  storageBucket: "reactclientproject-b3e4c.appspot.com",
  messagingSenderId: "134334620209"
};

// React redux firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
  // Firestore for Profile instead of Realtime DB
};

// Init firebas instance
firebase.initializeApp(firebaseConfig);

// Init firestore
// const firestore = firebase.firestore();
// const settings = { timestampsInSnapshots: true };
// firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

// Create initial state
const initialState = {};

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
