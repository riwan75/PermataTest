import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//screen
import LoginScreen from './Login';
import Home from './Home';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useNavigationState} from '@react-navigation/core';
import Splash from './Splash';

const Stack = createStackNavigator();

const RootStackScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');

        if (token) {
          navigation.navigate('Home');
        } else {
          navigation.navigate('LoginScreen');
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'Splash'}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Splash" component={Splash} />
    </Stack.Navigator>
  );
};
export default RootStackScreen;
