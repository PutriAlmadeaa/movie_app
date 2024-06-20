// screens/MovieDetail.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MovieDetail = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Movie Detail Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,           // Memungkinkan View untuk mengisi seluruh layar
    justifyContent: 'center',  // Mengatur konten secara vertikal ke tengah
    alignItems: 'center',      // Mengatur konten secara horizontal ke tengah
  },
  text: {
    marginBottom: 20,  // Jarak antara teks dan tombol
  },
});

export default MovieDetail;
