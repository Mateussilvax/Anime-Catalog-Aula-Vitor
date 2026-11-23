import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';



export default function search() {
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container]}>

          <Text style={{color: 'black', fontSize: 20}}>Search</Text>


      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});