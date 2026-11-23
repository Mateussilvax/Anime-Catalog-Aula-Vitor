import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';


export default function index() {
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container]}>
          
          
          <Text style={{color: 'black', fontSize: 20}}>Home Page</Text>

          <Link href="/topAnimesAllTime"> VÁ PARA O APP</Link>
        





          
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
