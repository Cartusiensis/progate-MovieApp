import React, { useState } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import MovieItem from '../components/movies/MovieItem'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Movie } from '../types/app'

const coverImageSize = {
  poster: {
    width: 100,
    height: 160,
  },
}

export default function Favorite(): JSX.Element {
  const [favoriteList, setFavoriteList] = useState<Movie[]>([])

  const getFavoriteList = async (): Promise<Movie[] | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem('@FavoriteList')
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (error) {
      console.error(error)
      return null
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const listData = await getFavoriteList()
        if (listData) {
          setFavoriteList(listData)
        }
      }

      fetchData()
    }, []),
  )

  return (
    <FlatList
      data={favoriteList}
      renderItem={({ item }) => (
        <View style={styles.item}>
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
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  item: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
})
