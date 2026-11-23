import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';



export default function lancamentosProxTemp() {
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container]}>

          <Text style={{color: 'black', fontSize: 20}}>Lançamentos 2027</Text>


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