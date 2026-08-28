import '../global.css';
import '@/i18n';

import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/api/queryClient';
import { ErrorBoundary } from '@/components';
import { initConnectivity, startConnectivityMonitor } from '@/lib/connectivity';
import { loadLang, saveLang } from '@/lib/secureStore';
import { RootNavigator } from '@/navigation/RootNavigator';
import { useAuthStore } from '@/store/authStore';
import { useConnectivityStore } from '@/store/connectivityStore';
import { useLangStore } from '@/store/langStore';
import { useOutboxStore } from '@/store/outboxStore';
import { fontAssets } from '@/theme/fonts';

// Hold the native splash until fonts are ready so text never flashes in a fallback face.
void SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);
  const hydrate = useAuthStore((s) => s.hydrate);
  const setLang = useLangStore((s) => s.setLang);

  // Boot: register the connectivity reporter first (so the very first requests report
  // reachability), start the health poll, restore language, then hydrate the auth session
  // and the offline outbox. If we come up online with a reading queued from a prior offline
  // session, flush it immediately.
  useEffect(() => {
    initConnectivity();
    const stopMonitor = startConnectivityMonitor();

    void (async () => {
      const stored = await loadLang();
      if (stored === 'hi' || stored === 'en') setLang(stored);
      await Promise.all([hydrate(), useOutboxStore.getState().hydrate()]);
      if (useConnectivityStore.getState().isOnline) {
        void useOutboxStore.getState().drain();
      }
    })();

    // Every offline→online transition bumps onlineEpoch — drain the queued writes then.
    const unsubscribe = useConnectivityStore.subscribe((state, prev) => {
      if (state.onlineEpoch !== prev.onlineEpoch) void useOutboxStore.getState().drain();
    });

    return () => {
      stopMonitor();
      unsubscribe();
    };
  }, [hydrate, setLang]);

  // Persist every language change (the chip toggles the store).
  useEffect(() => useLangStore.subscribe((state) => void saveLang(state.lang)), []);

  // Hide the splash once fonts have resolved (loaded or failed — never hang on error).
  useEffect(() => {
    if (fontsLoaded || fontError) void SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="dark" />
        <ErrorBoundary>
          <RootNavigator />
        </ErrorBoundary>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
