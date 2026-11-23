import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';



export default function topAnimesAllTime() {
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container]}>

          <Text style={{color: 'black', fontSize: 20}}>Top Animes of All Time</Text>


      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});