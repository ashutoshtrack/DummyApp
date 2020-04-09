import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

export const Header = ({title, onMenuPress}) => (
  <View
    style={{
      height: 60,
      backgroundColor: 'teal',
      //justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
    }}>
    <TouchableOpacity onPress={onMenuPress} style={{width: 60}}>
      <Text style={{color: 'white', fontSize: 30, alignSelf: 'center'}}>
        |||
      </Text>
    </TouchableOpacity>

    <View style={{flex: 1, paddingRight: 60}}>
      <Text style={{alignSelf: 'center', fontSize: 20, color: 'white'}}>
        {title}
      </Text>
    </View>
  </View>
);

//this.props.navigation.openDrawer(
