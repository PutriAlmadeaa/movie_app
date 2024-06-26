import React, { useCallback, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { Movie } from '../../types/app';
import MovieItem from '../movies/MovieItem';
import { useFocusEffect } from '@react-navigation/native'

const Favorite = (): JSX.Element => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([])
  const coverImageSize = {
    backdrop: {
        width: 280,
        height: 160,
    },
    poster: {
        width: 110,
        height: 160,
    },
  };

  const fetchFavoriteMovies = async (): Promise<void> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem('@FavoriteList')
      if (initialData !== null) {
        setFavoriteMovies(JSON.parse(initialData))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchFavoriteMovies()
    }, [])
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Movies</Text>
      {favoriteMovies.length > 0 ? (
        <FlatList
          data={favoriteMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.movieItemContainer}>
              <MovieItem
                movie={item}
                size={coverImageSize.poster}
                coverType="poster"
              />
            </View>
          )}
          numColumns={3}
          contentContainerStyle={styles.movieListContainer}
        />
      ) : (
        <Text style={styles.emptyMessage}>No favorite movies found</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  movieListContainer: {
    justifyContent: 'center',
  },
  movieItemContainer: {
    flex: 1,
    margin: 4,
    maxWidth: '33%',
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
})

export default Favorite
