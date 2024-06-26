import React, { useEffect, useState } from 'react'
import { ImageBackground, Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesome } from '@expo/vector-icons'
import { Movie, MovieListProps } from '../../types/app'
import { API_ACCESS_TOKEN } from '@env'
import MovieList from './MovieList'

const MovieDetail = ({ route }: any): JSX.Element => {
  const { id } = route.params
  const [movie, setMovie] = useState<Movie>()
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  const recomendations: MovieListProps = {
    title: 'Recomendations',
    path: `movie/${id}/recommendations`,
    coverType: 'poster',
  }

  useEffect(() => {
    getMovie()
    checkIsFavorite()
  }, [])

  const getMovie = (): void => {
    const url = `https://api.themoviedb.org/3/movie/${id}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setMovie(response)
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
  }

  const checkIsFavorite = async (): Promise<void> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem('@FavoriteList')
      if (initialData !== null) {
        const favMovieList: Movie[] = JSON.parse(initialData)
        const isFav = favMovieList.some((favMovie) => favMovie.id === id)
        setIsFavorite(isFav)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addFavorite = async (movie: Movie): Promise<void> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem('@FavoriteList')
      let favMovieList: Movie[] = initialData !== null ? JSON.parse(initialData) : []
      favMovieList.push(movie)
      await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList))
      setIsFavorite(true)
    } catch (error) {
      console.log(error)
    }
  }

  const removeFavorite = async (id: number): Promise<void> => {
    try {
      const initialData: string | null = await AsyncStorage.getItem('@FavoriteList')
      if (initialData !== null) {
        let favMovieList: Movie[] = JSON.parse(initialData)
        favMovieList = favMovieList.filter((favMovie) => favMovie.id !== id)
        await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList))
        setIsFavorite(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFavoritePress = (): void => {
    if (isFavorite && movie) {
      removeFavorite(movie.id)
    } else if (movie) {
      addFavorite(movie)
    }
  }

  return (
    <ScrollView>
      <ImageBackground
        resizeMode="cover"
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`,
        }}
      ></ImageBackground>

      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.movieTitle}>{movie?.title}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="#fbbc05" />
            <Text style={styles.rating}>{movie?.vote_average.toFixed(1)}</Text>
            <TouchableOpacity onPress={handleFavoritePress}>
              <FontAwesome name={isFavorite ? "heart" : "heart-o"} size={25} color="#FB0505" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tagContainer}>
          <Text>{movie?.runtime && runtimeCalc(movie?.runtime)}</Text>
          <View style={styles.dot}></View>
          <Text>{movie?.genres[0].name}</Text>
          <View style={styles.dot}></View>
          <Text>
            {movie?.release_date && dateFormater(movie?.release_date)}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Story Line</Text>
        <Text style={{ paddingHorizontal: 8, marginBottom: 20 }}>{movie?.overview}</Text>
        <MovieList
          title={recomendations.title}
          path={recomendations.path}
          coverType={recomendations.coverType}
        ></MovieList>
      </View>
    </ScrollView>
  )
}

const runtimeCalc = (runtime: number) => {
  const hour = Math.floor(runtime / 60)
  const minutes = runtime % 60
  return `${hour}h ${minutes}m`
}

const dateFormater = (releaseDate: string) => {
  const date = new Date(releaseDate)
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }
  const formatter = new Intl.DateTimeFormat('en-GB', options)
  const formattedDate = formatter.format(date)
  return formattedDate
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: 250,
  },
  backgroundImageStyle: {
    resizeMode: 'cover',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingRight: 8,
  },
  tagContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  movieTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rating: {
    fontWeight: '700',
    fontSize: 15,
    color: '#fbbc05'
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: 'black',
    borderRadius: 50,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center'
  },
})

export default MovieDetail