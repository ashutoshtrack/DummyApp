/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {Text, View} from 'react-native';
import AppContainer from './src/router/MainRouter';

class App extends Component {
  render() {
    return <AppContainer />;
  }
}

export default App;

/*
 Accept visitor entry using a form on a page where the user can enter:
  Name
  Email
  Type of visit (Meeting / Delivery / Personal)
  Person to visit
  Date of entry (should be current date, user shouldn’t be able to update it, but he should be able to view it)
  Time of entry
  Time of exit
    
  Store this informatio

  n locally such that it can be accessed even if the app is killed and re-opened (i.e. persistent storage)





*/
