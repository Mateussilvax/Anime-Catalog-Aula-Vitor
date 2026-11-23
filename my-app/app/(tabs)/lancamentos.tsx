import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';



export default function lancamentos() {
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container]}>

          <Text style={{color: 'black', fontSize: 20}}>Lançamentos 2026</Text>


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