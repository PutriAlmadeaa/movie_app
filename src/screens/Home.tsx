import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Home = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Go to Movie Detail" onPress={() => navigation.navigate('MovieDetail')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
