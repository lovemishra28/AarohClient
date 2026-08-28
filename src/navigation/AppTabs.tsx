import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components';
import { colors } from '@/theme/tokens';

import { HomeScreen } from '@/features/home/HomeScreen';
import { FieldsScreen } from '@/features/fields/FieldsScreen';
import { HistoryScreen } from '@/features/history/HistoryScreen';
import { SettingsScreen } from '@/features/settings/SettingsScreen';

import type { AppTabParamList } from './types';

const Tab = createBottomTabNavigator<AppTabParamList>();

type IoniconName = keyof typeof Ionicons.glyphMap;

/** Focused/unfocused glyphs per tab — outline when idle, filled when active. */
const ICONS: Record<keyof AppTabParamList, [IoniconName, IoniconName]> = {
  Home: ['home-outline', 'home'],
  Fields: ['leaf-outline', 'leaf'],
  History: ['time-outline', 'time'],
  Settings: ['settings-outline', 'settings'],
};

const LABEL_KEYS: Record<keyof AppTabParamList, string> = {
  Home: 'nav.home',
  Fields: 'nav.fields',
  History: 'nav.history',
  Settings: 'nav.settings',
};

/**
 * The four home surfaces. Labels go through our <Text> so they pick the active-language
 * font (Devanagari for Hindi), and each screen renders its own in-screen header rather
 * than a native nav header, so headers stay off here.
 */
export function AppTabs() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const name = route.name as keyof AppTabParamList;
        const [idle, active] = ICONS[name];
        return {
          headerShown: false,
          tabBarActiveTintColor: colors.brand[700],
          tabBarInactiveTintColor: colors.ink.muted,
          tabBarStyle: { borderTopColor: colors.line.default, height: 60, paddingBottom: 8, paddingTop: 6 },
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? active : idle} size={size ?? 22} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text weight="medium" className="text-xs" style={{ color, fontSize: 11 }}>
              {t(LABEL_KEYS[name])}
            </Text>
          ),
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Fields" component={FieldsScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
