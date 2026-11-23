import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="topAnimesAllTime" options={{ title: 'Ranking', headerShown: false }} />
      <Tabs.Screen name="lancamentos" options={{ title: 'Lançamentos 2026', headerShown: false }} />
      <Tabs.Screen name="lancamentosProxTemp" options={{ title: 'Lançamentos 2027', headerShown: false }} />
      <Tabs.Screen name="search" options={{ title: 'Busca', headerShown: false }} />
      <Tabs.Screen name="game" options={{ title: 'Game', headerShown: false }} />
    </Tabs>
  );
}