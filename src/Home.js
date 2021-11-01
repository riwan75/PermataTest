import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  Alert,
  ScrollView,
} from 'react-native';
import CatalogSlider from './catalog';

const API_KEY = '1e98de4dc7e896bd0e4d6191e8c3ccdf';

const Home = ({navigation}) => {
  // Logout & remove Token //
  const handleLogOut = () => {
    (async () => {
      await AsyncStorage.removeItem('access_token');
      navigation.navigate('LoginScreen');
    })();
  };

  // Handling Back Button //
  useEffect(() => {
    const backButtonAction = () => {
      Alert.alert('Alert', 'Exit App', [
        {text: 'Cancel', onPress: () => null, style: 'cancel'},
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };
    const handlerBackButton = BackHandler.addEventListener(
      'hardwareBackPress',
      backButtonAction,
    );
    return () => handlerBackButton.remove();
  }, []);

  // Content //

  const [popularMovieData, setPopularMovieData] = useState({results: []});
  const [latestMovieData, setLatestMovieData] = useState({results: []});

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=' +
        API_KEY +
        '&page=1',
    )
      .then(response => response.json())
      .then(response => setPopularMovieData(response))
      .catch(err => console.log(err));
    fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=' +
        API_KEY +
        '&page=2',
    )
      .then(response => response.json())
      .then(response => setLatestMovieData(response))
      .catch(err => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <CatalogSlider title="Trending Daily" data={popularMovieData} />
          <CatalogSlider title="Trending Weekly" data={latestMovieData} />
        </View>
      </ScrollView>
      <TouchableOpacity onPress={handleLogOut} style={styles.logOutButton}>
        <Text style={styles.logOutButtonText}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: 'relative',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  logOutButton: {
    backgroundColor: '#ff4757',
    // marginTop: 200,
    paddingVertical: 10,
    borderRadius: 4,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  logOutButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loginTitleText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  title: {
    color: 'white',
    fontSize: 30,
    padding: 5,
    textAlign: 'center',
  },
});
