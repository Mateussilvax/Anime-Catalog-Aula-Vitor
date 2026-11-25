import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@game_vitorias';

function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\(\d{4}\)/g, '')
    .replace(/[^a-z0-9]/g, '');
}

function filtrarPrincipais(lista: any[]) {
  const regexContinuacao =
    /\b(season|second|third|2nd|3rd|4th|5th|6th|7th|part \d+|cour \d+|final|ii|iii|iv|movie|ova|special)\b/i;

  const semTemporadas = lista.filter(item => {
    const titulo = item.node.title || '';
    const tituloEn = item.node.alternative_titles?.en || '';
    return !regexContinuacao.test(titulo) && !regexContinuacao.test(tituloEn);
  });

  const ordenadosPorTamanho = [...semTemporadas].sort(
    (a, b) => a.node.title.length - b.node.title.length
  );

  const principais: any[] = [];

  for (const item of ordenadosPorTamanho) {
    const tituloAtual = item.node.title.toLowerCase();

    const jaTemFranquia = principais.some(principal => {
      const tituloBase = principal.node.title.toLowerCase();
      return (
        tituloAtual.startsWith(`${tituloBase} `) ||
        tituloAtual.startsWith(`${tituloBase}:`)
      );
    });

    if (!jaTemFranquia) {
      principais.push(item);
    }
  }

  return principais;
}

export default function Game() {
  const [listaAnimes, setListaAnimes] = useState<any[]>([]);
  const [animeAtual, setAnimeAtual] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [palpite, setPalpite] = useState('');
  const [historico, setHistorico] = useState<string[]>([]);
  const [acertou, setAcertou] = useState(false);
  const [vitorias, setVitorias] = useState(0);

  function sortearAnime(lista: any[]) {
    if (lista.length === 0) return;
    const indice = Math.floor(Math.random() * lista.length);
    const escolhido = lista[indice].node;

    console.log(
      'Anime sorteado:',
      escolhido.title,
      '| EN:',
      escolhido.alternative_titles?.en
    );

    setAnimeAtual(escolhido);
    setPalpite('');
    setHistorico([]);
    setAcertou(false);
  }

  // 1. Carrega o total de vitórias salvo no celular (AsyncStorage)
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(salvo => {
        if (salvo) {
          setVitorias(Number(salvo));
        }
      })
      .catch(error => console.log('Erro ao ler vitórias:', error));
  }, []);

  // 2. Busca os 200 mais populares, filtra só os principais e sorteia o primeiro
  useEffect(() => {
    fetch(
      'https://api.myanimelist.net/v2/anime/ranking?ranking_type=bypopularity&limit=200&fields=alternative_titles',
      {
        headers: {
          'X-MAL-CLIENT-ID': process.env.EXPO_PUBLIC_MAL_CLIENT_ID ?? '',
        },
      }
    )
      .then(res => res.json())
      .then(data => {
        const filtrados = filtrarPrincipais(data.data || []);
        console.log('Total de animes principais disponíveis:', filtrados.length);
        setListaAnimes(filtrados);
        sortearAnime(filtrados);
      })
      .catch(error => console.log('Erro ao buscar animes:', error))
      .finally(() => setCarregando(false));
  }, []);

  // 3. Compara o palpite normalizado com os nomes válidos do anime
  function verificarPalpite() {
    const chute = palpite.trim();
    const chuteNormalizado = normalizar(chute);
    if (!chuteNormalizado || !animeAtual || acertou) return;

    setHistorico(prev => [chute, ...prev]);
    setPalpite('');

    const titulosBase = [
      animeAtual.title,
      animeAtual.alternative_titles?.en,
      animeAtual.alternative_titles?.ja,
      ...(animeAtual.alternative_titles?.synonyms || []),
    ].filter(Boolean);

    const nomesCurtos = titulosBase
      .filter(nome => nome.includes(':'))
      .map(nome => nome.split(':')[0])
      .filter(parte => normalizar(parte).length >= 4);

    const nomesValidos = [...titulosBase, ...nomesCurtos].map(nome =>
      normalizar(nome)
    );

    if (nomesValidos.includes(chuteNormalizado)) {
      setAcertou(true);
      const novoTotal = vitorias + 1;
      setVitorias(novoTotal);

      AsyncStorage.setItem(STORAGE_KEY, String(novoTotal)).catch(error =>
        console.log('Erro ao salvar vitórias:', error)
      );
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Cabeçalho no padrão das outras telas */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Adivinhe o Anime</Text>
            <View style={styles.subtitleRow}>
              <Ionicons name="game-controller" size={20} color="#000000" />
              <Text style={styles.headerSubtitle}>Quiz</Text>
              <Ionicons name="game-controller" size={20} color="#000000" />
            </View>
          </View>

          {/* Placar salvo no AsyncStorage */}
          <View style={styles.scoreRow}>
            <View style={styles.scoreBadge}>
              <Ionicons name="trophy" size={16} color="#111111" />
              <Text style={styles.scoreText}>Vitórias: {vitorias}</Text>
            </View>

            <View style={styles.scoreBadge}>
              <Ionicons name="list" size={16} color="#111111" />
              <Text style={styles.scoreText}>
                Tentativas: {historico.length}
              </Text>
            </View>
          </View>

          {carregando ? (
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color="#000000" />
              <Text style={styles.loadingText}>Sorteando anime...</Text>
            </View>
          ) : (
            <>
              {/* Card da capa com blur */}
              <View style={styles.gameCard}>
                {animeAtual && (
                  <Image
                    source={{
                      uri:
                        animeAtual.main_picture?.large ||
                        animeAtual.main_picture?.medium,
                    }}
                    blurRadius={acertou ? 0 : 5}
                    style={styles.poster}
                    resizeMode="cover"
                  />
                )}

                {acertou ? (
                  <View style={styles.winBox}>
                    <View style={styles.winTitleRow}>
                      <Ionicons
                        name="checkmark-circle"
                        size={22}
                        color="#1B5E20"
                      />
                      <Text style={styles.winLabel}>Você acertou!</Text>
                    </View>

                    <Text style={styles.animeTitle}>{animeAtual?.title}</Text>

                    {animeAtual?.alternative_titles?.en &&
                      animeAtual.alternative_titles.en !== animeAtual.title && (
                        <Text style={styles.animeSubtitle}>
                          {animeAtual.alternative_titles.en}
                        </Text>
                      )}

                    <TouchableOpacity
                      style={styles.primaryButton}
                      onPress={() => sortearAnime(listaAnimes)}
                    >
                      <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                      <Text style={styles.primaryButtonText}>Próximo anime</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.inputSection}>
                    <View style={styles.inputBar}>
                      <Ionicons name="help-circle" size={20} color="#444444" />
                      <TextInput
                        style={styles.input}
                        placeholder="Qual é esse anime?"
                        placeholderTextColor="#555555"
                        value={palpite}
                        onChangeText={setPalpite}
                        onSubmitEditing={verificarPalpite}
                        autoCorrect={false}
                        returnKeyType="send"
                      />
                      {palpite.length > 0 && (
                        <TouchableOpacity onPress={() => setPalpite('')}>
                          <Ionicons
                            name="close-circle"
                            size={20}
                            color="#555555"
                          />
                        </TouchableOpacity>
                      )}
                    </View>

                    <View style={styles.buttonsRow}>
                      <TouchableOpacity
                        style={[styles.primaryButton, styles.flexButton]}
                        onPress={verificarPalpite}
                      >
                        <Ionicons
                          name="checkmark"
                          size={18}
                          color="#FFFFFF"
                        />
                        <Text style={styles.primaryButtonText}>Chutar</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.secondaryButton, styles.flexButton]}
                        onPress={() => sortearAnime(listaAnimes)}
                      >
                        <Ionicons
                          name="play-skip-forward"
                          size={16}
                          color="#111111"
                        />
                        <Text style={styles.secondaryButtonText}>Pular</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>

              {/* Histórico de tentativas da rodada */}
              <View style={styles.historyCard}>
                <View style={styles.historyHeader}>
                  <Ionicons name="time" size={18} color="#111111" />
                  <Text style={styles.historyTitle}>
                    Histórico de tentativas
                  </Text>
                </View>

                {historico.length === 0 ? (
                  <Text style={styles.emptyHistoryText}>
                    Nenhum palpite ainda. Tente adivinhar pela capa!
                  </Text>
                ) : (
                  <View style={styles.historyList}>
                    {historico.map((item, index) => {
                      const foiAcerto = acertou && index === 0;

                      return (
                        <View
                          key={`${item}-${index}`}
                          style={[
                            styles.historyItem,
                            foiAcerto && styles.historyItemWin,
                          ]}
                        >
                          <Ionicons
                            name={foiAcerto ? 'checkmark-circle' : 'close-circle'}
                            size={18}
                            color={foiAcerto ? '#1B5E20' : '#B71C1C'}
                          />
                          <Text
                            style={[
                              styles.historyItemText,
                              foiAcerto && styles.historyItemTextWin,
                            ]}
                          >
                            {item}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  header: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
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
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 18,
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(205, 212, 220, 0.9)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 6,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
  },
  loadingBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    gap: 10,
  },
  loadingText: {
    fontSize: 15,
    color: '#666666',
  },
  gameCard: {
    backgroundColor: 'rgba(205, 212, 220, 0.9)',
    borderRadius: 24,
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  poster: {
    width: 190,
    height: 265,
    borderRadius: 18,
    backgroundColor: '#000000',
    marginBottom: 16,
  },
  inputSection: {
    width: '100%',
    gap: 12,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 48,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#000000',
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  flexButton: {
    flex: 1,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111111',
    height: 46,
    paddingHorizontal: 18,
    borderRadius: 16,
    gap: 6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    height: 46,
    paddingHorizontal: 18,
    borderRadius: 16,
    gap: 6,
  },
  secondaryButtonText: {
    color: '#111111',
    fontSize: 15,
    fontWeight: '600',
  },
  winBox: {
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  winTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  winLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B5E20',
  },
  animeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
  },
  animeSubtitle: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 4,
  },
  historyCard: {
    backgroundColor: 'rgba(205, 212, 220, 0.9)',
    borderRadius: 24,
    padding: 16,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
  },
  emptyHistoryText: {
    fontSize: 14,
    color: '#444444',
  },
  historyList: {
    gap: 8,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    gap: 8,
  },
  historyItemWin: {
    backgroundColor: '#E8F5E9',
  },
  historyItemText: {
    flex: 1,
    fontSize: 14,
    color: '#111111',
  },
  historyItemTextWin: {
    fontWeight: '700',
    color: '#1B5E20',
  },
});