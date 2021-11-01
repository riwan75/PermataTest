import React from 'react';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
import RootStackScreen from './src/Rootstack';

// Screen

const App = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};

export default App;
