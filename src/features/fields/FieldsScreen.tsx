import { Pressable, ScrollView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { useFields } from '@/api/fields';
import type { Field } from '@/api/types';
import { Button, Card, EmptyState, ErrorState, LoadingState, Screen, SectionTitle, SyncBanner, Text } from '@/components';
import { formatNumber } from '@/lib/format';
import { hectaresToAcres } from '@/lib/units';
import { colors } from '@/theme/tokens';
import type { AppStackParamList } from '@/navigation/types';

/**
 * Fields tab (M4) — the list of a farmer's plots. Each row opens the field detail, where a
 * reading is entered and advice is requested. Empty/loading/error states are the shared
 * ones so this screen never invents its own, and offline shows saved data under a banner.
 */
type Nav = NativeStackNavigationProp<AppStackParamList>;

function areaLabel(field: Field, t: (k: string) => string): string {
  if (field.area_ha == null || !Number.isFinite(field.area_ha)) return t('fields.noArea');
  return `${formatNumber(hectaresToAcres(field.area_ha), 2)} ${t('fieldCreate.areaUnit')}`;
}

function FieldRow({ field, onPress }: { field: Field; onPress: () => void }) {
  const { t } = useTranslation();
  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      <Card className="mt-3 flex-row items-center">
        <View className="mr-3 h-11 w-11 items-center justify-center rounded-pill bg-brand-50">
          <Ionicons name="leaf-outline" size={20} color={colors.brand[600]} />
        </View>
        <View className="flex-1">
          <Text weight="semibold" className="text-body-lg text-ink" numberOfLines={1}>
            {field.name ?? t('fields.title')}
          </Text>
          <Text className="mt-0.5 text-sm text-ink-muted">
            {t('fields.area')}: {areaLabel(field, t)}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.ink.faint} />
      </Card>
    </Pressable>
  );
}

export function FieldsScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const { data: fields, isLoading, isError, error, refetch } = useFields();

  const addField = () => navigation.navigate('FieldCreate');
  const openField = (field: Field) =>
    navigation.navigate('FieldDetail', { fieldId: field.id, fieldName: field.name ?? undefined });

  return (
    <Screen>
      <SyncBanner />
      <View className="px-5 pt-3">
        <SectionTitle>{t('fields.title')}</SectionTitle>
        <Text className="mt-1 text-body text-ink-muted">{t('fields.subtitle')}</Text>
      </View>

      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState error={error} onRetry={() => void refetch()} />
      ) : !fields || fields.length === 0 ? (
        <EmptyState
          icon="leaf-outline"
          title={t('fields.emptyTitle')}
          message={t('fields.emptyMessage')}
          action={<Button label={t('fields.addField')} icon="add" onPress={addField} />}
        />
      ) : (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingTop: 4 }}>
          {fields.map((field) => (
            <FieldRow key={field.id} field={field} onPress={() => openField(field)} />
          ))}
          <Button label={t('fields.addField')} icon="add" variant="secondary" className="mt-5" onPress={addField} />
        </ScrollView>
      )}
    </Screen>
  );
}
