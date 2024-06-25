import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigation from './src/components/navigations/BottomTabNavigation'

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <BottomTabNavigation />
    </NavigationContainer>
  )
}