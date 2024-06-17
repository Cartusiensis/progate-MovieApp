import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native'
import { MovieDetailProps, MovieListProps } from '../../types/app'
import { API_ACCESS_TOKEN } from '@env'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome } from '@expo/vector-icons'
import MovieList from './MovieList'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { HomeStackParamList } from '../../types/navigationTypes'
import AsyncStorage from '@react-native-async-storage/async-storage'

type MovieDetailScreenRouteProps = NativeStackScreenProps<
  HomeStackParamList,
  'MovieDetail'
>

export default function MovieDetail({
  route,
}: MovieDetailScreenRouteProps): JSX.Element {
  const { id } = route.params
  const [detail, setDetail] = useState<MovieDetailProps>({
    id: 0,
    title: '',
    overview: '',
    popularity: 0,
    backdrop_path: '',
    vote_average: 0,
    vote_count: 0,
    release_date: '',
    original_language: '',
  })
  const date = new Date(detail.release_date)
  const formattedDate = date.toDateString()

  const [isFavorite, setIsFavorite] = useState<Boolean>(false)

  const movieLists: MovieListProps[] = [
    {
      title: 'Recommendation',
      path: `/movie/${id}/recommendations`,
      coverType: 'poster',
    },
  ]

  const checkIsFavorite = async (id: number): Promise<boolean> => {
    let convertJSON: MovieDetailProps[] = []
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')

      convertJSON = JSON.parse(initialData || '[]')
    } catch (error) {
      console.error(error)
    } finally {
      return convertJSON.some((movie) => movie.id === id)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      getMovieDetail()
      setIsFavorite(await checkIsFavorite(id))
    }

    fetchData()
  }, [])

  const getMovieDetail = (): void => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => setDetail(response))
      .catch((err) => console.error(err))
  }

  const addFavorite = async (movie: MovieDetailProps): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')

      let favMovieList: MovieDetailProps[] = []
      if (initialData !== null) {
        favMovieList = [...JSON.parse(initialData), movie]
      } else {
        favMovieList = [movie]
      }

      await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList))
      setIsFavorite(true)
    } catch (error) {
      console.error(error)
    }
  }

  const removeFavorite = async (id: number): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')

      let removeFavorite: MovieDetailProps[] = JSON.parse(initialData || '[]')
      removeFavorite = removeFavorite.filter((movie) => movie.id !== id)

      await AsyncStorage.setItem(
        '@FavoriteList',
        JSON.stringify(removeFavorite),
      )
      setIsFavorite(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={styles.backgroundImage}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${detail.backdrop_path}`,
        }}
      >
        <LinearGradient
          colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
          locations={[0.6, 0.8]}
          style={styles.gradientStyle}
        >
          <Text style={styles.movieTitle}>{detail.title}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.ratingInfo}>
              <FontAwesome name="star" size={18} color="yellow" />
              <Text style={styles.rating}>
                {detail.vote_average.toFixed(1)}
              </Text>
            </View>
            <FontAwesome.Button
              name={isFavorite ? 'heart' : 'heart-o'}
              size={24}
              color="pink"
              backgroundColor="transparent"
              underlayColor="transparent"
              onPress={() => {
                isFavorite ? removeFavorite(detail.id) : addFavorite(detail)
              }}
            />
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.captionSection}>
        <Text style={styles.overview}>{detail.overview}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Original Language: </Text>
            <Text style={styles.infoValue}>{detail.original_language}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Popularity: </Text>
            <Text style={styles.infoValue}>{detail.popularity}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Release Date: </Text>
            <Text style={styles.infoValue}>{formattedDate}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Vote Count: </Text>
            <Text style={styles.infoValue}>{detail.vote_count}</Text>
          </View>
        </View>
      </View>
      {movieLists.map((movieList, index) => (
        <MovieList
          key={index}
          title={movieList.title}
          path={movieList.path}
          coverType={movieList.coverType}
        />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    width: '100%',
    height: 230,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  movieTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  gradientStyle: {
    padding: 10,
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 'auto',
    gap: 4,
  },
  rating: {
    color: 'yellow',
    fontWeight: '700',
    fontSize: 18,
  },
  captionSection: {
    padding: 10,
  },
  overview: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  infoRow: {
    width: '48%',
    marginVertical: 5,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 16,
  },
})
