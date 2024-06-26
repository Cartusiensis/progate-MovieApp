import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
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
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    getGenreResults()
  }, [page])

  const getGenreResults = (): void => {
    if (isLoading) {
      return
    }
    setIsLoading(true)

    const url: string = `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&page=${page}`
    const options: object = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        setResult((prevResult) => [...prevResult, ...response.results])
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
      })
  }

  const loadNextPage = (): void => {
    if (!isLoading) {
      setPage((prevPage) => prevPage + 1)
    }
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
        onEndReached={loadNextPage}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          isLoading ? <ActivityIndicator size="large" /> : null
        }
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
