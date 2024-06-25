import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Search from '../screens/Search'
import MovieDetail from '../movies/MovieDetail'
import CategorySearchResult from '../screens/CategorySearchResult'

const Stack = createNativeStackNavigator()
const SearchStackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Search">
            <Stack.Screen
                name="Search"
                component={Search}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MovieDetail"
                component={MovieDetail}
                options={{ headerTitle: 'Movie Detail' }}
            />
            <Stack.Screen
                name="CategorySearchResult"
                component={CategorySearchResult}
                options={{ headerTitle: 'Category Search Result' }}
            />
        </Stack.Navigator>
    )
}

export default SearchStackNavigation
