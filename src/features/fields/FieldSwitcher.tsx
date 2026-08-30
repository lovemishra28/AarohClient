import { useMemo } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import type { Field } from '@/api/types';
import { Text } from '@/components';
import { areaLabel, fieldLabel, fieldLabels } from '@/lib/fields';
import { colors } from '@/theme/tokens';

/**
 * The field switcher (Workstream 3).
 *
 * Automatic segregation turns "your field" into "your fields", possibly three of them
 * from a single sync, so the dashboard needs a way to say *which* plot the averages and
 * the map below belong to. A horizontal strip of pills was chosen over a dropdown for
 * two reasons: it shows how many fields exist without being opened, and it is one tap
 * rather than two — this control gets used constantly while comparing plots.
 *
 * Order is newest-detected first, so the plot the farmer has just walked is under their
 * thumb and already selected.
 */

type FieldSwitcherProps = {
  /** Newest first — pass the list already sorted (see `sortFieldsNewestFirst`). */
  fields: readonly Field[];
  /** The farmer's complete list, for stable numbering. Defaults to `fields`. */
  allFields?: readonly Field[];
  selectedId: string | null;
  onSelect: (fieldId: string) => void;
};

export function FieldSwitcher({ fields, allFields, selectedId, onSelect }: FieldSwitcherProps) {
  const { t } = useTranslation();

  // Numbering comes from every field the farmer has, never from the visible subset, so a
  // filtered or truncated strip still calls each plot by the name the rest of the app uses.
  const labels = useMemo(() => fieldLabels(allFields ?? fields, t), [allFields, fields, t]);

  if (fields.length === 0) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 12 }}
    >
      {fields.map((field) => {
        const selected = field.id === selectedId;
        const count = field.aggregate?.reading_count ?? 0;
        return (
          <Pressable
            key={field.id}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onSelect(field.id)}
            style={{ minWidth: 136 }}
            className={`mr-2 rounded-field border px-3 py-2.5 ${
              selected ? 'border-brand-700 bg-brand-50' : 'border-line bg-surface'
            }`}
          >
            <View className="flex-row items-center">
              <Ionicons
                name={field.source === 'auto' ? 'locate' : 'leaf-outline'}
                size={13}
                color={selected ? colors.brand[700] : colors.ink.faint}
              />
              <Text
                weight="semibold"
                className={`ml-1.5 flex-1 text-sm ${selected ? 'text-brand-700' : 'text-ink'}`}
                numberOfLines={1}
              >
                {fieldLabel(field, t, labels)}
              </Text>
            </View>
            <Text className="mt-1 text-xs text-ink-muted" numberOfLines={1}>
              {count > 0 ? t('fields.readings', { count }) : t('fields.noReadings')}
            </Text>
            <Text className="text-xs text-ink-faint" numberOfLines={1}>
              {areaLabel(field, t)}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
