import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';



export default function TopAnimesAllTime() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
          <Text>Top Animes All Time</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});