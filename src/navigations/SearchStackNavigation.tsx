import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Search from '../screens/Search'
import CategorySearch from '../components/search/CategorySearch'
import KeywordSearch from '../components/search/KeywordSearch'
import { SearchStackParamList } from '../types/navigationTypes'
import MovieDetail from '../screens/MovieDetail'
import CategoryResults from '../components/search/CategoryResults'

const Stack = createNativeStackNavigator<SearchStackParamList>()

const SearchStackNavigator = (): JSX.Element => (
  <Stack.Navigator initialRouteName="SearchScreen">
    <Stack.Screen
      name="SearchScreen"
      component={Search}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="KeywordSearch"
      component={KeywordSearch}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CategorySearch"
      component={CategorySearch}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="CategoryResults" component={CategoryResults} />
    <Stack.Screen name="MovieDetail" component={MovieDetail} />
  </Stack.Navigator>
)

export default SearchStackNavigator
