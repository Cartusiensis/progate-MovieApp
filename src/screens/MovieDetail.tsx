import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native'
import { MovieDetailProps, MovieListProps } from '../types/app'
import { API_ACCESS_TOKEN } from '@env'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome } from '@expo/vector-icons'
import MovieList from '../components/movies/MovieList'

export default function MovieDetail({ route }: any): JSX.Element {
  const { id } = route.params
  const [detail, setDetail] = useState<MovieDetailProps>({
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

  const movieLists: MovieListProps[] = [
    {
      title: 'Recommendation',
      path: `/movie/${id}/recommendations`,
      coverType: 'poster',
    },
  ]

  useEffect(() => {
    getMovieDetail()
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
            <FontAwesome name="star" size={18} color="yellow" />
            <Text style={styles.rating}>{detail.vote_average.toFixed(1)}</Text>
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
      {movieLists.map((movieList) => (
        <MovieList
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
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
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
