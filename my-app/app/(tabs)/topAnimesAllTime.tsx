import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { Animated, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function AnimeCard({ item, index }: { item: any; index: number }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    // Os primeiros 8 cards entram em cascata; os de baixo entram rápido ao rolar
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
              name="podium"
              size={14}
              color="#111111"
              style={styles.detailIcon}
            />
            <Text style={styles.detailText}>
              <Text style={styles.detailLabel}>Ranking: </Text>
              #{item.ranking.rank}
            </Text>
          </View>

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
        </View>
      </View>
    </Animated.View>
  );
}

export default function Ranking() {
  const [animes, setAnimes] = useState<any[]>([]);
  const [animKey, setAnimKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setAnimKey(prev => prev + 1);
    }, [])
  );
  useEffect(() => {
    fetch(
      'https://api.myanimelist.net/v2/anime/ranking?ranking_type=all&limit=40&fields=mean,studios',
      {
        headers: {
          'X-MAL-CLIENT-ID': process.env.EXPO_PUBLIC_MAL_CLIENT_ID ?? '',
        },
      }
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setAnimes(data.data);
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
            <Text style={styles.headerTitle}>Ranking top animes</Text>
            <View style={styles.subtitleRow}>
              <Ionicons name="trophy" size={20} color="#000000" />
              <Text style={styles.headerSubtitle}>All Time</Text>
              <Ionicons name="trophy" size={20} color="#000000" />
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
    height: 108,
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
    gap: 5,
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