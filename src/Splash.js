import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.splashText}>This Is Splash Screen!!!!</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  splashText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
});
