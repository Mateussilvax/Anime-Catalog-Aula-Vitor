import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';

function formatarData(data?: string) {
  if (!data) return 'A definir';
  const partes = data.split('-');
  if (partes.length === 3) {
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }
  if (partes.length === 2) {
    return `${partes[1]}/${partes[0]}`;
  }
  return data;
}

function AnimeCard({ item, index }: { item: any; index: number }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    const delay = index < 8 ? index * 80 : 50;

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, opacity, translateY]);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.leftColumn}>
        <Image
          source={{ uri: item.node.main_picture?.medium }}
          style={styles.poster}
          resizeMode="cover"
        />

        <View style={styles.metaContainer}>
          <View style={styles.metaRow}>
            <Ionicons name="star" size={12} color="#111111" />
            <Text style={styles.metaText} numberOfLines={1}>
              {item.node.mean ?? 'Sem nota'}
            </Text>
          </View>

          <View style={styles.metaRow}>
            <Ionicons name="film" size={12} color="#111111" />
            <Text style={styles.metaText} numberOfLines={1}>
              {item.node.studios?.[0]?.name ?? 'Não inf.'}
            </Text>
          </View>

          <View style={styles.metaRow}>
            <Ionicons name="calendar" size={12} color="#111111" />
            <Text style={styles.metaText} numberOfLines={1}>
              {formatarData(item.node.start_date)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.animeTitle} numberOfLines={2}>
          {item.node.title}
        </Text>

        <Text style={styles.synopsisText} numberOfLines={8}>
          {item.node.synopsis || 'Sinopse não disponível.'}
        </Text>
      </View>
    </Animated.View>
  );
}

export default function Search() {
  const [busca, setBusca] = useState('');
  const [animesIniciais, setAnimesIniciais] = useState<any[]>([]);
  const [resultadosBusca, setResultadosBusca] = useState<any[]>([]);
  const [carregandoInicial, setCarregandoInicial] = useState(true);
  const [buscando, setBuscando] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setAnimKey(prev => prev + 1);
    }, [])
  );

  // 1. Roda uma vez ao abrir a tela: busca o catálogo inicial e ordena de A-Z
  useEffect(() => {
    fetch(
      'https://api.myanimelist.net/v2/anime/ranking?ranking_type=bypopularity&limit=50&fields=synopsis,mean,studios,start_date',
      {
        headers: {
          'X-MAL-CLIENT-ID': process.env.EXPO_PUBLIC_MAL_CLIENT_ID ?? '',
        },
      }
    )
      .then(res => res.json())
      .then(data => {
        const ordenados = (data.data || []).sort((a: any, b: any) =>
          a.node.title.localeCompare(b.node.title)
        );
        setAnimesIniciais(ordenados);
      })
      .catch(error => console.log('Erro ao carregar catálogo inicial:', error))
      .finally(() => setCarregandoInicial(false));
  }, []);

  // 2. Roda quando o usuário digita pelo menos 3 letras na busca
  useEffect(() => {
    if (busca.trim().length < 3) {
      setResultadosBusca([]);
      setBuscando(false);
      return;
    }

    setBuscando(true);

    const timer = setTimeout(() => {
      fetch(
        `https://api.myanimelist.net/v2/anime?q=${encodeURIComponent(busca.trim())}&limit=20&fields=synopsis,mean,studios,start_date`,
        {
          headers: {
            'X-MAL-CLIENT-ID': process.env.EXPO_PUBLIC_MAL_CLIENT_ID ?? '',
          },
        }
      )
        .then(res => res.json())
        .then(data => setResultadosBusca(data.data || []))
        .catch(error => console.log('Error:', error))
        .finally(() => {
          setBuscando(false);
          console.log('Busca finalizada');
        });
    }, 500);

    return () => clearTimeout(timer);
  }, [busca]);

  const estaPesquisando = busca.trim().length >= 3;
  const listaExibida = estaPesquisando ? resultadosBusca : animesIniciais;
  const estaCarregando = estaPesquisando ? buscando : carregandoInicial;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.topSection}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Buscar Animes</Text>
          <View style={styles.subtitleRow}>
            <Ionicons name="search" size={20} color="#000000" />
            <Text style={styles.headerSubtitle}>Catálogo</Text>
            <Ionicons name="search" size={20} color="#000000" />
          </View>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#444444" />
          <TextInput
            style={styles.searchInput}
            placeholder="Digite o nome do anime..."
            placeholderTextColor="#555555"
            value={busca}
            onChangeText={setBusca}
            autoCorrect={false}
            returnKeyType="search"
          />
          {busca.length > 0 && (
            <TouchableOpacity onPress={() => setBusca('')}>
              <Ionicons name="close-circle" size={20} color="#555555" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {estaCarregando ? (
        <View style={styles.centerFeedback}>
          <ActivityIndicator size="large" color="#000000" />
          <Text style={styles.feedbackText}>
            {estaPesquisando ? 'Buscando animes...' : 'Carregando catálogo...'}
          </Text>
        </View>
      ) : (
        <FlatList
          key={`${animKey}-${estaPesquisando}`}
          data={listaExibida}
          keyExtractor={item => String(item.node.id)}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.centerFeedback}>
              <Ionicons name="sad-outline" size={42} color="#888888" />
              <Text style={styles.feedbackText}>Nenhum anime encontrado</Text>
            </View>
          }
          renderItem={({ item, index }) => <AnimeCard item={item} index={index} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topSection: {
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  header: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 18,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000000',
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  headerSubtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000000',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(205, 212, 220, 0.9)',
    borderRadius: 18,
    paddingHorizontal: 14,
    height: 48,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#000000',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    flexGrow: 1,
  },
  centerFeedback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    gap: 10,
  },
  feedbackText: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(205, 212, 220, 0.9)',
    borderRadius: 24,
    padding: 14,
    marginBottom: 16,
  },
  leftColumn: {
    width: 108,
  },
  poster: {
    width: 108,
    height: 136,
    borderRadius: 18,
    backgroundColor: '#000000',
  },
  metaContainer: {
    marginTop: 8,
    gap: 4,
    paddingHorizontal: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: '#111111',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 14,
  },
  animeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 6,
  },
  synopsisText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#222222',
  },
});