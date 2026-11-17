import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native';
import { Link } from 'expo-router';


export default function index() {
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container]}>
          <Text style={{color: 'black', fontSize: 20}}>Home Page</Text>
          <StatusBar style="auto" />
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
