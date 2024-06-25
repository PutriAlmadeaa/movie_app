import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MovieDetail from '../movies/MovieDetail'
import Favorite from '../screens/Favorite'

const Stack = createNativeStackNavigator()
const FavoriteStackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Favorite">
            <Stack.Screen
                name="Favorite"
                component={Favorite}
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

export default FavoriteStackNavigation
