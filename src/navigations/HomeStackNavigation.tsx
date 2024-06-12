import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import MovieDetail from '../screens/MovieDetail'
import { HomeStackParamList } from '../types/navigationTypes'

const Stack = createNativeStackNavigator<HomeStackParamList>()

const HomeStackNavigator = (): JSX.Element => (
  <Stack.Navigator initialRouteName="HomeScreen">
    <Stack.Screen
      name="HomeScreen"
      component={Home}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="MovieDetail" component={MovieDetail} />
  </Stack.Navigator>
)

export default HomeStackNavigator
