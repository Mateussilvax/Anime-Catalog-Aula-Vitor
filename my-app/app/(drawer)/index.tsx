import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

const backgroundImg = require('../../assets/imagem_de_fundo_home.webp');
const logoImg = require('../../assets/selo_naruto.png');

export default function Home() {
  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        
        <Image
          source={backgroundImg}
          style={styles.backgroundImage}
          resizeMode="contain"
        />

        <SafeAreaView
          style={styles.container}
          edges={['bottom', 'left', 'right']}
        >
          <View style={styles.card}>
            <Image
              source={logoImg}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.description}>
              Esse App é um Catálogo de animes desenvolvido com finalidade
              acadêmica orientado pelo professor Victor Vidgal.
            </Text>

            <Text style={[styles.description, styles.secondParagraph]}>
              Os dados utilizados são da Api gratuita do MyAnimeList!
            </Text>
          </View>

          <Link href="/topAnimesAllTime" asChild>
            <TouchableOpacity style={styles.button} activeOpacity={0.8}>
              <Text style={styles.buttonText}>IR PARA O APP -&gt;</Text>
            </TouchableOpacity>
          </Link>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingTop: 16,
    paddingBottom: 190,
  },
  card: {
    width: '100%',
    backgroundColor: 'rgba(205, 212, 220, 0.9)',
    borderRadius: 22,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 16,
  },
  description: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 22,
  },
  secondParagraph: {
    marginTop: 22,
  },
  button: {
    backgroundColor: 'rgba(205, 212, 220, 0.95)',
    width: '78%',
    paddingVertical: 22,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '700',
  },
});