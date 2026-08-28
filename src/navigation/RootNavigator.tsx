import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { useAuthStore } from '@/store/authStore';
import { BrandHeader } from '@/components';
import { colors } from '@/theme/tokens';

import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';

/**
 * Root switch. Auth status decides which stack mounts:
 *   loading         → branded splash while tokens hydrate
 *   unauthenticated → AuthNavigator (phone → OTP)
 *   authenticated   → AppNavigator
 *
 * Because the two stacks are swapped wholesale, there is no imperative navigation on
 * login or logout — the store flips status and React remounts the right tree.
 */
export function RootNavigator() {
  const status = useAuthStore((s) => s.status);

  if (status === 'loading') {
    return (
      <View className="flex-1 items-center justify-center bg-surface">
        <BrandHeader />
        <View className="mt-6">
          <ActivityIndicator color={colors.brand[600]} />
        </View>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {status === 'authenticated' ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
