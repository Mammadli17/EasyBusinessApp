import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import Router from './src/navigations/Router'
const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor='transparent'/>
      <Router />
    </View>
  )
}

export default App