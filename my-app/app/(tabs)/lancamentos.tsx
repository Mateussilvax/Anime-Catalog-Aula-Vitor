import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { Animated, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function formatarData(data?: string) {
  if (!data) return 'A definir';
  const partes = data.split('-');
  if (partes.length === 3) {
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
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

  const episodios =
    item.node.num_episodes && item.node.num_episodes > 0
      ? `${item.node.num_episodes} eps`
      : 'Em andamento';

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
      <Image
        source={{ uri: item.node.main_picture?.medium }}
        style={styles.poster}
        resizeMode="cover"
      />

      <View style={styles.infoContainer}>
        <Text style={styles.animeTitle} numberOfLines={2}>
          {item.node.title}
        </Text>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Ionicons
              name="star"
              size={14}
              color="#111111"
              style={styles.detailIcon}
            />
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Nota: </Text>
              {item.node.mean ?? 'Sem avaliação'}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons
              name="tv"
              size={14}
              color="#111111"
              style={styles.detailIcon}
            />
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Episódios: </Text>
              {episodios}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons
              name="film"
              size={14}
              color="#111111"
              style={styles.detailIcon}
            />
            <Text style={styles.detailText} numberOfLines={1}>
              <Text style={styles.detailLabel}>Estúdio: </Text>
              {item.node.studios?.[0]?.name ?? 'Não informado'}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons
              name="calendar"
              size={14}
              color="#111111"
              style={styles.detailIcon}
            />
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Estreia: </Text>
              {formatarData(item.node.start_date)}
            </Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

export default function Lancamentos() {
  const [animes, setAnimes] = useState<any[]>([]);
  const [animKey, setAnimKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setAnimKey(prev => prev + 1);
    }, [])
  );

  useEffect(() => {
    fetch(
      'https://api.myanimelist.net/v2/anime/season/2026/fall?sort=anime_score&limit=40&fields=mean,studios,num_episodes,start_date',
      {
        headers: {
          'X-MAL-CLIENT-ID': process.env.EXPO_PUBLIC_MAL_CLIENT_ID ?? '',
        },
      }
    )
      .then(res => res.json())
      .then(data => {
        const ordenados = (data.data || []).sort(
          (a: any, b: any) => (b.node.mean ?? 0) - (a.node.mean ?? 0)
        );
        setAnimes(ordenados);
      })
      .catch(error => console.log('Error:', error))
      .finally(() => console.log('Fetch completed'));
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        key={animKey}
        data={animes}
        keyExtractor={item => String(item.node.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Lançamentos da Temporada</Text>
            <View style={styles.subtitleRow}>
              <Ionicons name="flame" size={20} color="#000000" />
              <Text style={styles.headerSubtitle}>Simulcast</Text>
              <Ionicons name="flame" size={20} color="#000000" />
            </View>
          </View>
        }
        renderItem={({ item, index }) => <AnimeCard item={item} index={index} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 22,
    paddingTop: 35,
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(205, 212, 220, 0.9)',
    borderRadius: 24,
    padding: 14,
    marginBottom: 16,
  },
  poster: {
    width: 100,
    height: 118,
    borderRadius: 18,
    backgroundColor: '#000000',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  animeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  detailsContainer: {
    paddingLeft: 4,
    gap: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  detailIcon: {
    marginTop: 2,
  },
  detailText: {
    flex: 1,
    fontSize: 14,
    color: '#111111',
  },
  detailLabel: {
    fontWeight: '600',
  },
});