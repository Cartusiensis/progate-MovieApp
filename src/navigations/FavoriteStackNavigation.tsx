import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Favorite from '../screens/Favorite'
import MovieDetail from '../screens/MovieDetail'
import { FavoriteStackParamList } from '../types/navigationTypes'

const Stack = createNativeStackNavigator<FavoriteStackParamList>()

const FavoriteStackNavigator = (): JSX.Element => (
  <Stack.Navigator initialRouteName="FavoriteScreen">
    <Stack.Screen
      name="FavoriteScreen"
      component={Favorite}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="MovieDetail" component={MovieDetail} />
  </Stack.Navigator>
)

export default FavoriteStackNavigator
