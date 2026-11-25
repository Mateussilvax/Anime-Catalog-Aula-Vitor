import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function lancamentos() {

  const [animes, setAnimes] = useState<any[]>([]);
  
  useEffect(()=>{
    fetch(
      'https://api.myanimelist.net/v2/anime/season/2026/fall?sort=anime_num_list_users&limit=40&fields=mean,genres,start_date',
      {
        headers: {
          'X-MAL-CLIENT-ID': process.env.EXPO_PUBLIC_MAL_CLIENT_ID ?? ''
        }
      }
    )

    .then(res => res.json())
    .then(data => {console.log(data); setAnimes(data.data);})
    .catch(error => console.log('Error:', error))
    .finally(()=> console.log('Fetch completed'));

  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView>

        <FlatList
        data={animes}
        keyExtractor={item => String(item.node.id)}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderBottomWidth: 1, borderColor: '#ddd' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              #{item.ranking.rank} - {item.node.title}
            </Text>
            <Text>Nota: {item.node.mean ?? 'Sem avaliação'}</Text>
          </View>
        )}
      />

      </SafeAreaView>
    </SafeAreaProvider>
    
  );
}