import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, verdictPalette, type Verdict } from '@/theme/tokens';

import { Text } from './Text';

type MetricTileProps = {
  label: string;
  value: string;
  unit?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  /** Tints the icon badge to carry a grow/invest/avoid reading. */
  verdict?: Verdict;
  className?: string;
};

/**
 * Small metric card from the reference dashboard: label, pastel icon badge, a large bold
 * value with a small unit, all in a bordered white tile. This is the pattern the M5 form
 * review and the M6 recommendation soil bands reuse, so it lives in the shared kit now.
 */
export function MetricTile({
  label,
  value,
  unit,
  icon = 'leaf-outline',
  verdict,
  className,
}: MetricTileProps) {
  const badge = verdict ? verdictPalette[verdict] : null;
  const badgeBg = badge?.surface ?? colors.brand[50];
  const badgeFg = badge?.solid ?? colors.brand[600];

  return (
    <View className={`rounded-card border border-line bg-surface p-4 ${className ?? ''}`}>
      <View className="flex-row items-center justify-between">
        <Text className="text-sm text-ink-muted">{label}</Text>
        <View
          className="h-8 w-8 items-center justify-center rounded-pill"
          style={{ backgroundColor: badgeBg }}
        >
          <Ionicons name={icon} size={16} color={badgeFg} />
        </View>
      </View>
      <View className="mt-2 flex-row items-baseline">
        <Text weight="bold" className="text-display text-ink">
          {value}
        </Text>
        {unit ? <Text className="ml-1 text-body text-ink-muted">{unit}</Text> : null}
      </View>
    </View>
  );
}
