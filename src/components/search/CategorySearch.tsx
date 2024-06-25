import { API_ACCESS_TOKEN } from '@env'
import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { GenreListProps } from '../../types/app'
import { useNavigation, StackActions } from '@react-navigation/native'

export default function CategorySearch(): JSX.Element {
  const [genres, setGenres] = useState<GenreListProps[]>([])
  const [selectedGenre, setSelectedGenre] = useState<GenreListProps>({
    id: 0,
    name: '',
  })
  const navigation = useNavigation()
  const pushAction = StackActions.push('CategoryResults', {
    genre: { id: selectedGenre.id, name: selectedGenre.name },
  })

  useEffect(() => {
    getGenreList()
  }, [])

  const getGenreList = (): void => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then((response) => response.json())
      .then((response) => setGenres(response.genres))
      .catch((err) => console.error(err))
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {genres.map((genre) => (
        <TouchableOpacity
          key={genre.id}
          style={[
            styles.genreButton,
            selectedGenre.id === genre.id && styles.selectedButton,
          ]}
          onPress={() => setSelectedGenre(genre)}
        >
          <Text style={styles.genreLabel}>{genre.name}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => navigation.dispatch(pushAction)}
      >
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    height: 45,
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: '#E0D7EC',
  },
  selectedButton: {
    backgroundColor: '#8C77A7',
  },
  genreLabel: {
    color: 'black',
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#8C77A7',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: '100%',
    marginTop: 16,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
})
