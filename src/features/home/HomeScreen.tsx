import { useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { useFields } from '@/api/fields';
import type { Field } from '@/api/types';
import {
  BleHeaderButton,
  BrandHeader,
  Button,
  Card,
  ConnectStickModal,
  LanguageChip,
  MetricTile,
  Screen,
  SectionTitle,
  StepRow,
  SyncBanner,
  Text,
} from '@/components';
import { FieldHeatCard } from '@/features/fields/FieldHeatCard';
import { FieldSwitcher } from '@/features/fields/FieldSwitcher';
import { SyncScansCard } from '@/features/sync/SyncScansCard';
import {
  HEAT_METRICS,
  aggregateMetric,
  fieldLabel,
  fieldLabels,
  formatMetric,
  sortFieldsNewestFirst,
  type MetricDef,
} from '@/lib/fields';
import { colors } from '@/theme/tokens';
import type { AppStackParamList } from '@/navigation/types';

/**
 * Home dashboard — rebuilt for automatic field segregation (Workstream 3).
 *
 * The old dashboard led with "Add field", because a field was something the farmer had to
 * declare before any data could hang off it. That is no longer true: the stick records
 * where it was, the server clusters those positions, and fields, boundaries and averages
 * appear as a *result* of syncing. So the screen is now ordered the way the work actually
 * happens — sync first, then the field the farmer just walked, its averages, and the map
 * of how fertility varies inside it — and manual creation is demoted to a quiet link for
 * the farmer who has no stick yet.
 *
 * Everything below the switcher is scoped to one selected field, so switching plots is a
 * single tap that moves the averages, the map and the advice button together.
 */
type Nav = NativeStackNavigationProp<AppStackParamList>;

export function HomeScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const { data: fields } = useFields();

  const [connectVisible, setConnectVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const ordered = useMemo(() => sortFieldsNewestFirst(fields ?? []), [fields]);
  const labels = useMemo(() => fieldLabels(fields ?? [], t), [fields, t]);

  /**
   * Selection is *derived*, never synchronised with an effect. An id that has gone away
   * (deleted field, different account, first load) falls through to the newest field, so a
   * sync that invents two fields can never leave the dashboard pointing at nothing — and
   * an explicit choice still survives the list changing underneath it.
   */
  const selected = useMemo<Field | null>(
    () => ordered.find((f) => f.id === selectedId) ?? ordered[0] ?? null,
    [ordered, selectedId],
  );

  /** The metric means that exist. Absent ones are dropped rather than shown as dashes. */
  const means = useMemo<{ metric: MetricDef; value: number }[]>(() => {
    const aggregate = selected?.aggregate;
    const rows: { metric: MetricDef; value: number }[] = [];
    for (const metric of HEAT_METRICS) {
      const value = aggregateMetric(aggregate, metric);
      if (value !== null) rows.push({ metric, value });
    }
    return rows;
  }, [selected]);

  const readingCount = selected?.aggregate?.reading_count ?? 0;

  const openField = (fieldId: string) => {
    const field = (fields ?? []).find((f) => f.id === fieldId);
    navigation.navigate('FieldDetail', {
      fieldId,
      // Pass the label the dashboard used, so the pushed screen's title agrees with the
      // pill that was tapped — an auto field has no name of its own to fall back on.
      fieldName: field ? fieldLabel(field, t, labels) : undefined,
    });
  };

  const getAdvice = () => {
    if (!selected) return;
    navigation.navigate('Recommendation', {
      fieldId: selected.id,
      fieldName: fieldLabel(selected, t, labels),
    });
  };

  return (
    <Screen>
      <View className="flex-row items-center justify-between px-5 pt-2">
        <BrandHeader />
        <View className="flex-row items-center">
          <BleHeaderButton />
          <LanguageChip />
        </View>
      </View>
      <SyncBanner />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingTop: 8 }}
      >
        <Text weight="bold" className="text-display text-brand-700">
          {t('home.greeting')}
        </Text>
        <Text className="mt-1 text-body text-ink-muted">{t('home.subtitle')}</Text>

        {/* The primary action. Always mounted, so the sync report it produces stays on
            screen after the pending count drops to zero. */}
        <SyncScansCard
          className="mt-6"
          onConnect={() => setConnectVisible(true)}
          onOpenField={openField}
        />

        {selected ? (
          <>
            <View className="mt-8 flex-row items-center justify-between">
              <SectionTitle>{t('home.switcherLabel')}</SectionTitle>
              <Pressable
                accessibilityRole="button"
                onPress={() => navigation.navigate('Tabs', { screen: 'Analysis' })}
              >
                <Text weight="medium" className="text-sm text-brand-600">
                  {t('common.viewAll')}
                </Text>
              </Pressable>
            </View>
            <Text className="mt-0.5 text-sm text-ink-muted">
              {t('home.fieldCount', { count: ordered.length })}
            </Text>

            <View className="mt-3">
              <FieldSwitcher
                fields={ordered}
                allFields={fields ?? ordered}
                selectedId={selected.id}
                onSelect={setSelectedId}
              />
            </View>

            <SectionTitle className="mt-6">{t('home.averagesTitle')}</SectionTitle>
            {means.length > 0 ? (
              <>
                <Text className="mt-0.5 text-sm text-ink-muted">
                  {t('home.averagesSub', { count: readingCount })}
                </Text>
                <View className="mt-3 flex-row flex-wrap justify-between">
                  {means.map(({ metric, value }) => (
                    <View key={metric.id} style={{ width: '48%', marginBottom: 12 }}>
                      <MetricTile
                        label={t(metric.labelKey)}
                        value={formatMetric(value, metric)}
                        unit={metric.unit}
                        icon={metric.icon}
                      />
                    </View>
                  ))}
                </View>
              </>
            ) : (
              <Card className="mt-2">
                <Text weight="semibold" className="text-body text-ink">
                  {t('home.noReadingsTitle')}
                </Text>
                <Text className="mt-1 text-sm text-ink-muted">{t('home.noReadingsMessage')}</Text>
              </Card>
            )}

            <FieldHeatCard field={selected} className="mt-2" />

            <View className="mt-4" style={{ gap: 12 }}>
              <Button label={t('home.getAdvice')} icon="sparkles-outline" onPress={getAdvice} />
              <Button
                label={t('home.openField')}
                icon="chevron-forward"
                variant="secondary"
                onPress={() => openField(selected.id)}
              />
            </View>
          </>
        ) : (
          <Card className="mt-8">
            <Text weight="semibold" className="text-body-lg text-ink">
              {t('home.emptyTitle')}
            </Text>
            <Text className="mt-1 text-body text-ink-muted">{t('home.emptyMessage')}</Text>
          </Card>
        )}

        {/* Manual creation still exists — a farmer without a stick, or with a lab report,
            needs it — but it is no longer the thing the dashboard asks for first. */}
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate('FieldCreate')}
          className="mt-5 flex-row items-center justify-center py-2"
        >
          <Ionicons name="add-circle-outline" size={16} color={colors.brand[600]} />
          <Text weight="medium" className="ml-1.5 text-sm text-brand-600">
            {t('home.addFieldManual')}
          </Text>
        </Pressable>

        <SectionTitle className="mt-6">{t('home.stepsTitle')}</SectionTitle>
        <Card className="mt-2">
          <StepRow
            index={1}
            title={t('home.step1Title')}
            subtitle={t('home.step1Sub')}
            icon="walk-outline"
          />
          <StepRow
            index={2}
            title={t('home.step2Title')}
            subtitle={t('home.step2Sub')}
            icon="cloud-upload-outline"
          />
          <StepRow
            index={3}
            title={t('home.step3Title')}
            subtitle={t('home.step3Sub')}
            icon="cash-outline"
          />
        </Card>
      </ScrollView>

      <ConnectStickModal visible={connectVisible} onClose={() => setConnectVisible(false)} />
    </Screen>
  );
}
