     
import { Stack } from 'expo-router';


export default function DrawerLayout() {
  return (
    <Stack screenOptions={{ headerShadowVisible: false, }}>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ title: ' ' }} />
    </Stack>
  );
}
