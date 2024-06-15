import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import CategorySearch from '../components/search/CategorySearch'
import KeywordSearch from '../components/search/KeywordSearch'

export default function Search(): JSX.Element {
  const [selectedBar, setSelectedBar] = useState<string>('keyword')

  return (
    <View style={styles.container}>
      <View style={styles.topBarContainer}>
        {['keyword', 'category'].map((item: string, index: number) => (
          <TouchableOpacity
            key={item}
            activeOpacity={0.9}
            style={{
              ...styles.topBar,
              backgroundColor: item === selectedBar ? '#8978A4' : '#C0B4D5',
              borderTopLeftRadius: index === 0 ? 100 : 0,
              borderBottomLeftRadius: index === 0 ? 100 : 0,
              borderTopRightRadius: index === 1 ? 100 : 0,
              borderBottomRightRadius: index === 1 ? 100 : 0,
            }}
            onPress={() => {
              setSelectedBar(item)
            }}
          >
            <Text style={styles.topBarLabel}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedBar === 'keyword' ? <KeywordSearch /> : <CategorySearch />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  topBar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 60,
  },
  topBarLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
})
