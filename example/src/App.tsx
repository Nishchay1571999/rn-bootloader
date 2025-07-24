import { StyleSheet, Text, View } from 'react-native'
import { AppReadyGate } from 'rn-bootloader'

const App = () => {
  return (
      <View style={{paddingTop:100}}>
        <Text>App</Text>
        <AppReadyGate/>
      </View>
  )
}

export default App

const styles = StyleSheet.create({})