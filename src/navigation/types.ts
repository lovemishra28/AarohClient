import type { NavigatorScreenParams } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Route maps.
 *
 * The root switches between two independent stacks based on auth status (see
 * RootNavigator). Inside the app stack sits the bottom-tab navigator (the four home
 * surfaces) plus the pushed detail/form/result screens that need a back button and
 * shouldn't live in a tab: create-field, field detail, manual reading, and the
 * recommendation result. AuthStack stays just Auth → Otp.
 */

export type AuthStackParamList = {
  Auth: undefined;
  Otp: { phone: string; devCode?: string | null; mode: 'login' | 'signup'; name?: string };
};

/** The four bottom-tab destinations (guide §4: Home · Fields · History · Settings). */
export type AppTabParamList = {
  Home: undefined;
  Fields: undefined;
  History: undefined;
  Settings: undefined;
};

export type AppStackParamList = {
  Tabs: NavigatorScreenParams<AppTabParamList> | undefined;
  FieldCreate: undefined;
  FieldDetail: { fieldId: string; fieldName?: string };
  ManualReading: { fieldId: string; fieldName?: string };
  /**
   * The money screen. With no `recommendationId` it *requests* fresh advice for the
   * field (the M6 POST); with one it renders that past recommendation from cache/history.
   */
  Recommendation: { fieldId: string; fieldName?: string; recommendationId?: string };
};

export type AuthScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>;

export type AppScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>;

export type AppTabScreenProps<T extends keyof AppTabParamList> = BottomTabScreenProps<
  AppTabParamList,
  T
>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends AuthStackParamList, AppStackParamList {}
  }
}
