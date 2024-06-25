import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, Button, TouchableOpacity } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { API_ACCESS_TOKEN } from '@env';

const CategorySearch = (): JSX.Element => {
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [selectedGenreName, setSelectedGenreName] = useState<string>('');

  useEffect(() => {
    fetchGenreList();
  }, []);

  const fetchGenreList = (): void => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          setGenres(data.genres);
        } else {
          Alert.alert('Error', 'Failed to fetch genres');
        }
      })
      .catch((error) => {
        Alert.alert('Error', 'Something went wrong');
      });
  };

  const navigation = useNavigation();

  const handleGenrePress = (genreId: number, genreName: string): void => {
    setSelectedGenreId(genreId);
    setSelectedGenreName(genreName);
  };

  const handleSearchPress = async (): Promise<void> => {
    if (!selectedGenreId) {
      Alert.alert('Please select a genre to search');
      return;
    }
    
    const pushAction = StackActions.push('CategorySearchResult', { genreId: selectedGenreId, genreName: selectedGenreName });
    navigation.dispatch(pushAction);
  };

  const renderGenreItem = ({ item }: { item: { id: number; name: string } }) => {
    const isSelected = selectedGenreId === item.id;

    return (
      <TouchableOpacity
        style={[styles.genreCard, isSelected && styles.genreCardSelected]}
        onPress={() => handleGenrePress(item.id, item.name)}
      >
        <Text style={styles.genreText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const NUM_COLUMNS = 2;

  return (
    <View>
      <FlatList
        data={genres}
        renderItem={renderGenreItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={NUM_COLUMNS}
        columnWrapperStyle={styles.columnWrapper}
      />
      <View style={styles.buttonContainer}>
        <Button title='Search' onPress={handleSearchPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  columnWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  genreCard: {
    width: '48%',
    backgroundColor: '#e0d7ec',
    padding: 10,
    borderRadius: 15,
    marginBottom: 5,
  },
  genreCardSelected: {
    backgroundColor: '#9973ae',
  },
  genreText: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default CategorySearch;
