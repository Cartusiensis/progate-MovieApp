import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

export default function MovieDetail({ navigation }): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Movie Detail Page</Text>
      <Button
        title="Kembali"
        onPress={() => {
          navigation.navigate('Home')
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
