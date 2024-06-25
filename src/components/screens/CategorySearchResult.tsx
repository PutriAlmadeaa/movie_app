import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { API_ACCESS_TOKEN } from '@env';
import type { Movie } from '../../types/app';
import MovieItem from '../movies/MovieItem';

const CategorySearchResult = ({ route }: any): JSX.Element => {
    const { genreId, genreName } = route.params;
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [numColumns] = useState<number>(3);

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

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }

            const data = await response.json();
            setMovies(data.results);
            setLoading(false);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to fetch movies');
            setLoading(false);
        }
    };


    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Genre : "{ genreName }"</Text>
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
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

export default CategorySearchResult;