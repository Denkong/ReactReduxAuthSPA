//REACT
import React, { Component } from 'react';
//REDUX
import {Provider} from 'react-redux';
import store from './store'
//COMPONENT
import Main from "./main"


class App extends Component {
  render() {
   return (
    <Provider store={store}>
      <Main/>
    </Provider>
  );
  }
}

export default App;
