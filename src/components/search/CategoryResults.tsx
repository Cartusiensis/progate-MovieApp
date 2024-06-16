import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { SearchStackParamList } from '../../types/navigationTypes'
import { API_ACCESS_TOKEN } from '@env'
import { Movie } from '../../types/app'
import MovieItem from '../movies/MovieItem'

type CategoryResultsRouteProps = NativeStackScreenProps<
  SearchStackParamList,
  'CategoryResults'
>

const coverImageSize = {
  poster: {
    width: 100,
    height: 160,
  },
}

export default function CategoryResults({
  route,
}: CategoryResultsRouteProps): JSX.Element {
  const { id, name } = route.params.genre
  const [result, setResult] = useState<Movie[]>([])

  useEffect(() => {
    getGenreResults()
  }, [])

  const getGenreResults = () => {
    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${id}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => setResult(response.results))
      .catch((err) => console.error(err))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Result of {name} Genre</Text>
      <FlatList
        data={result}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <MovieItem
              movie={item}
              size={coverImageSize.poster}
              coverType="poster"
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        key={3}
        columnWrapperStyle={styles.listRow}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  listRow: {
    justifyContent: 'space-between',
  },
  listItem: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
})
