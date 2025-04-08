import { View, Text } from 'react-native'
import React from 'react'
import Router from './src/navigations/Router'
const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Router />
    </View>
  )
}

export default App