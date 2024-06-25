import React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStackNavigation from './HomeStackNavigation'
import SearchStackNavigation from './SearchStackNavigation'
import FavoriteStackNavigation from './FavoriteStackNavigation'

const Tab = createBottomTabNavigator()

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigation}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../../assets/bottomTabIcons/home.png')}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('HomeStack', { screen: 'Home' });
          },
        })}
      />
      <Tab.Screen
        name="FavoriteStack"
        component={FavoriteStackNavigation}
        options={{
          headerShown: false,
          tabBarLabel: 'Favorite',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../../assets/bottomTabIcons/love.png')}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('FavoriteStack', { screen: 'Favorite' });
          },
        })}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchStackNavigation}
        options={{
          headerShown: false,
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../../../assets/bottomTabIcons/search.png')}
              style={{ tintColor: color, width: size, height: size }}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('SearchStack', { screen: 'Search' });
          },
        })}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigation
