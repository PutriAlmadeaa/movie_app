// navigations/BottomTabNavigation.tsx
import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigation from './HomeStackNavigation';
import Favorite from '../screens/Favorite';
import Search from '../screens/Search';


const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="HomeStack"
          component={HomeStackNavigation}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('../../assets/bottomTabIcons/home.png')}
                style={{ tintColor: color, width: size, height: size }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Favorite"
          component={Favorite}
          options={{
            tabBarLabel: 'Favorite',
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('../../assets/bottomTabIcons/love.png')}
                style={{ tintColor: color, width: size, height: size }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('../../assets/bottomTabIcons/search.png')}
                style={{ tintColor: color, width: size, height: size }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };
  
  export default BottomTabNavigation;