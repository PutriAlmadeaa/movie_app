import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Alert, Button, FlatList } from 'react-native';
import { API_ACCESS_TOKEN } from '@env';
import type { Movie } from '../../types/app';
import MovieItem from '../movies/MovieItem';

const coverImageSize = {
  backdrop: {
    width: 280,
    height: 160,
  },
  poster: {
    width: 100,
    height: 160,
  },
};

const KeywordSearch: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [numColumns] = useState<number>(3);

  const getMovieList = (keyword: string): void => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&page=1`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        if (response.results) {
          setMovies(response.results);
        } else {
          Alert.alert('No results', 'No movies found for the given keyword');
        }
      })
      .catch((errorResponse) => {
        Alert.alert('Error', 'Something went wrong');
      });
  };

  const handleSubmit = (): void => {
    if (keyword.trim() === '') {
      Alert.alert('Error', 'Please enter a keyword');
      return;
    }
    getMovieList(keyword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Input title movie here"
          onChangeText={setKeyword}
          value={keyword}
          onSubmitEditing={handleSubmit}
        />
        <Button title="Search" onPress={handleSubmit} />
      </View>
      {movies.length > 0 && (
        <FlatList
          contentContainerStyle={styles.movieListContainer}
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              <MovieItem
                movie={item}
                size={coverImageSize.poster}
                coverType="poster"
              />
            </View>
          )}
          numColumns={numColumns}
          key={numColumns}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  inputRow: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 20,
    backgroundColor: '#EAE8E8',
    marginRight: 10,
  },
  movieListContainer: {
    paddingBottom: 80,
  },
  movieItem: {
    flex: 1,
    margin: 4,
  },
});

export default KeywordSearch;
