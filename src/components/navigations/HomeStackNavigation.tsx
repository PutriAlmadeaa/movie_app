import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import MovieDetail from '../movies/MovieDetail'

const Stack = createNativeStackNavigator()

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{ headerTitle: 'Movie Detail' }}
      />
    </Stack.Navigator>
  )
}

export default HomeStackNavigation
