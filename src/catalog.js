/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const CatalogSlider = ({title, data}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View>
        <FlatList
          onEndreachedReached={d => {
            console.log('end reached' + d.toString());
          }}
          onEndReachedThreshold={0.5}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          data={data.results}
          renderItem={({item}) => {
            return (
              <View>
                <TouchableOpacity>
                  <Image
                    style={styles.movieImg}
                    source={{
                      uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path,
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
  },
  title: {
    color: 'white',
    padding: 10,
    fontSize: 20,
  },
  movieImg: {
    margin: 10,
    height: 200,
    width: 125,
    borderRadius: 15,
  },
});

export default CatalogSlider;
