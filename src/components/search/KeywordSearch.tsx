import React, { useEffect, useState } from 'react'
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { API_ACCESS_TOKEN } from '@env'
import MovieItem from '../movies/MovieItem'
import { Movie } from '../../types/app'

const coverImageSize = {
  poster: {
    width: 100,
    height: 160,
  },
}

export default function KeywordSearch(): JSX.Element {
  const [keyword, setKeyword] = useState<string>('')
  const [previousKeywordLength, setPreviousKeywordLength] = useState<number>(0)
  const [searchList, setSearchList] = useState<Movie[]>([])
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (keyword.length > previousKeywordLength) {
      setSearchList([])
      setPage(1)
    }
    setPreviousKeywordLength(keyword.length)
  }, [keyword])

  const fetchResults = (): void => {
    if (isLoading || !keyword) {
      return
    }
    setIsLoading(true)

    const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=${page}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setSearchList((prevList) => [...prevList, ...response.results])
        setPage(page + 1)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
      })
  }

  const handleSubmit = (): void => {
    if (keyword) {
      fetchResults()
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Input title movie here"
          placeholderTextColor="#C4C4C4"
          value={keyword}
          onChangeText={setKeyword}
          onSubmitEditing={handleSubmit}
        />
        <FontAwesome name="search" size={20} color="#000" style={styles.icon} />
      </View>
      <FlatList
        data={searchList}
        renderItem={({ item }: { item: Movie }) => (
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
        onEndReached={fetchResults}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={
          <View>
            <Text>No results found.</Text>
          </View>
        }
        ListFooterComponent={
          isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
  listRow: {
    justifyContent: 'space-between',
  },
  listItem: {
    flex: 1,
    margin: 5,
  },
})
