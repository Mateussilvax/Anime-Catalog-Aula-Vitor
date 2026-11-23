import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const gojoImg = require('../../assets/killua_telefone.jpg');

const CONTATO = {
  telefone: '(XX) 99999-9999',
  email: 'mateussilva@uniacademia.com',
  repoNome: 'Anime-Catalog-Aula-Vitor',
  repoLink: 'github.com/Mateussilvax/Anime-Catalog-Aula-Vitor',
};

export default function Contact() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.safeArea}
        edges={['bottom', 'left', 'right']}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          
          <View style={styles.header}>
            <View style={styles.imageFrame}>
              <Image
                source={gojoImg}
                style={styles.avatar}
                resizeMode="cover"
              />
            </View>

            <Text style={styles.title}>Entre em Contato</Text>
            <Text style={styles.subtitle}>
              Ficou com alguma dúvida ou quer acompanhar o código do projeto?
            </Text>
          </View>

          <View style={styles.cardsWrapper}>
            <View style={styles.card}>
              <View style={styles.iconBadge}>
                <Ionicons name="call-outline" size={22} color="#FFFFFF" />
              </View>
              <View style={styles.cardTextGroup}>
                <Text style={styles.cardLabel}>Telefone</Text>
                <Text style={styles.cardValue}>{CONTATO.telefone}</Text>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.iconBadge}>
                <Ionicons name="mail-outline" size={22} color="#FFFFFF" />
              </View>
              <View style={styles.cardTextGroup}>
                <Text style={styles.cardLabel}>E-mail</Text>
                <Text style={styles.cardValue}>{CONTATO.email}</Text>
              </View>
            </View>

            
            <View style={[styles.card, styles.repoCard]}>
              <View style={[styles.iconBadge, styles.repoIconBadge]}>
                <Ionicons name="logo-github" size={24} color="#000000" />
              </View>
              <View style={styles.cardTextGroup}>
                <Text style={[styles.cardLabel, styles.repoLabel]}>
                  Repositório do Projeto
                </Text>
                <Text style={[styles.cardValue, styles.repoValue]}>
                  {CONTATO.repoNome}
                </Text>
                <Text style={styles.repoLink}>{CONTATO.repoLink}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 26,
    paddingTop: 12,
    paddingBottom: 36,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  imageFrame: {
    width: 185,
    height: 185,
    borderRadius: 28,
    backgroundColor: 'rgba(205, 212, 220, 0.9)',
    overflow: 'hidden',
    marginBottom: 18,
    borderWidth: 3,
    borderColor: '#CDD4DC',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#555555',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 12,
  },
  cardsWrapper: {
    width: '100%',
    gap: 14,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(205, 212, 220, 0.9)',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardTextGroup: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#444444',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000000',
    marginTop: 2,
  },
  repoCard: {
    backgroundColor: '#111111',
    marginTop: 4,
  },
  repoIconBadge: {
    backgroundColor: '#FFFFFF',
  },
  repoLabel: {
    color: '#B5BDC6',
  },
  repoValue: {
    color: '#FFFFFF',
  },
  repoLink: {
    fontSize: 12,
    color: '#B5BDC6',
    marginTop: 3,
  },
});