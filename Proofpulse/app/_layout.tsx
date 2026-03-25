import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { auth } from './firebaseConfig';

export default function RootLayout() {
  useEffect(() => {
    console.log('🔥 Firebase initialized!');
    console.log('Project ID:', auth.app.options.projectId);
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}