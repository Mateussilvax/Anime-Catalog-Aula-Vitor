import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(drawer)',
};

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(drawer)"
        options={{
          headerShown: false,
          title: '', 
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          title: '',
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}