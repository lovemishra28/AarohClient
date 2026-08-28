import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthScreen } from '@/features/auth/AuthScreen';
import { OtpScreen } from '@/features/auth/OtpScreen';

import type { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

/** Shown while unauthenticated: the Login/Sign Up landing screen → OTP verification. */
export function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
    </Stack.Navigator>
  );
}
