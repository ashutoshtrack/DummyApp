import React from 'react';

import RegisterScreen from '../RegisterScreen/RegisterScreen';
import VisitorDisplayScreen from '../VisitorDisplayScreen/VisitorDisplayScreen';
import NewsFeedsScreen from '../NewsFeedsScreen/NewsFeedsScreen';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function AppContainer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Register">
        <Drawer.Screen
          name="Register"
          title="Register"
          component={RegisterScreen}
        />
        <Drawer.Screen name="VisitorLog" component={VisitorDisplayScreen} />
        <Drawer.Screen name="NewsFeeds" component={NewsFeedsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

//const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;
