import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { AuthProvider } from '@/src/context/auth';
import { useColorScheme } from '@/src/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            statusBarStyle: 'dark',
            statusBarBackgroundColor: '#FFFFFF',
            contentStyle: { backgroundColor: '#FFFFFF' }
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="landing" options={{ headerShown: false, statusBarStyle: 'dark' }} />
          <Stack.Screen name="auth" options={{ headerShown: false, statusBarStyle: 'dark' }} />
          <Stack.Screen name="onboarding/steps" options={{ headerShown: false, statusBarStyle: 'dark' }} />
          <Stack.Screen name="onboarding/water" options={{ headerShown: false, statusBarStyle: 'dark' }} />
          <Stack.Screen name="onboarding/sleep" options={{ headerShown: false, statusBarStyle: 'dark' }} />
          <Stack.Screen name="onboarding/currentWeight" options={{ headerShown: false, statusBarStyle: 'dark' }} />
          <Stack.Screen name="onboarding/goalWeight" options={{ headerShown: false, statusBarStyle: 'dark' }} />
          <Stack.Screen name="onboarding/meditation" options={{ headerShown: false, statusBarStyle: 'dark' }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ 
            headerShown: false 
          }} />
        </Stack>
        <StatusBar style="dark" backgroundColor="#FFFFFF" translucent={false} />
      </ThemeProvider>
    </AuthProvider>
  );
}
