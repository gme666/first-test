import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyAtmB8d0mn5HNgn4ADP2Ov4iExZVFX9Imo',
      authDomain: 'energy-c0af4.firebaseapp.com',
      databaseURL: 'https://energy-c0af4.firebaseio.com',
      projectId: 'energy-c0af4',
      storageBucket: 'energy-c0af4.appspot.com',
      messagingSenderId: '703932440290'
    };

    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
