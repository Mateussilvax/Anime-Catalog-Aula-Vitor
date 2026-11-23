     
import { Stack } from 'expo-router';


export default function DrawerLayout() {
  return (
    <Stack>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ title: ' ' }} />
    </Stack>
  );
}
