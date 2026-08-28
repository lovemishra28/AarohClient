import { Pressable, ScrollView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { useField } from '@/api/fields';
import { useFieldRecommendations } from '@/api/recommendations';
import type { Reading } from '@/api/types';
import {
  Button,
  Card,
  ErrorState,
  InfoStrip,
  LoadingState,
  MetricTile,
  Screen,
  ScreenHeader,
  SyncBanner,
  Text,
} from '@/components';
import { SOIL_FIELDS } from '@/lib/soil';
import { formatNumber } from '@/lib/format';
import { hectaresToAcres, microSiemensToDsm } from '@/lib/units';
import { colors } from '@/theme/tokens';
import type { AppScreenProps } from '@/navigation/types';

/**
 * Field detail (M4) — the hub for one plot. It shows the area, the latest soil reading as a
 * tile grid (EC shown back in dS/m, the unit it was entered in), and the two next actions:
 * enter a reading by hand or get advice. Past advice for the field is listed beneath, each
 * row reopening that saved recommendation.
 */

/** Reads a numeric column off a reading, converting µS/cm back to the dS/m the farmer sees. */
function readingValue(reading: Reading, col: string): number | null {
  const raw = (reading as Record<string, unknown>)[col];
  if (typeof raw !== 'number' || !Number.isFinite(raw)) return null;
  return col === 'ec_uscm' ? microSiemensToDsm(raw) : raw;
}

export function FieldDetailScreen({ route, navigation }: AppScreenProps<'FieldDetail'>) {
  const { t, i18n } = useTranslation();
  const { fieldId, fieldName } = route.params;
  const { data, isLoading, isError, error, refetch } = useField(fieldId);
  const { data: recs } = useFieldRecommendations(fieldId);

  const title = fieldName ?? data?.field.name ?? t('fields.title');
  const goReading = () => navigation.navigate('ManualReading', { fieldId, fieldName: title });
  const goAdvice = () => navigation.navigate('Recommendation', { fieldId, fieldName: title });

  const reading = data?.latest_reading ?? null;

  return (
    <Screen>
      <SyncBanner />
      <ScreenHeader title={title} onBack={() => navigation.goBack()} />

      {isLoading ? (
        <LoadingState />
      ) : isError || !data ? (
        <ErrorState error={error} onRetry={() => void refetch()} />
      ) : (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingTop: 8 }}>
          <Card>
            <Text className="text-sm text-ink-muted">{t('fieldDetail.area')}</Text>
            <Text weight="semibold" className="mt-0.5 text-body-lg text-ink">
              {data.field.area_ha != null
                ? `${formatNumber(hectaresToAcres(data.field.area_ha), 2)} ${t('fieldCreate.areaUnit')}`
                : t('fields.noArea')}
            </Text>
          </Card>

          <Text weight="semibold" className="mb-2 mt-6 text-title text-brand-700">
            {t('fieldDetail.latestReading')}
          </Text>

          {reading ? (
            <>
              <View className="flex-row flex-wrap justify-between">
                {SOIL_FIELDS.map((f) => {
                  const v = readingValue(reading, f.col);
                  if (v == null) return null;
                  return (
                    <View key={f.id} style={{ width: '48%', marginBottom: 12 }}>
                      <MetricTile label={t(f.labelKey)} value={formatNumber(v, f.decimals)} unit={f.unit} icon={f.icon} />
                    </View>
                  );
                })}
              </View>

              <InfoStrip tone="info" text={t('fieldDetail.calibrationNote')} />
              <Button label={t('fieldDetail.getAdvice')} icon="sparkles-outline" className="mt-6" onPress={goAdvice} />
              <Button
                label={t('fieldDetail.enterReading')}
                icon="create-outline"
                variant="secondary"
                className="mt-3"
                onPress={goReading}
              />
            </>
          ) : (
            <Card>
              <Text weight="semibold" className="text-body-lg text-ink">
                {t('fieldDetail.noReadingTitle')}
              </Text>
              <Text className="mt-1 text-body text-ink-muted">{t('fieldDetail.noReadingMessage')}</Text>
              <Button
                label={t('fieldDetail.enterReading')}
                icon="create-outline"
                className="mt-4"
                onPress={goReading}
              />
            </Card>
          )}

          {recs && recs.length > 0 ? (
            <View className="mt-8">
              <Text weight="semibold" className="text-title text-brand-700">
                {t('fieldDetail.pastAdvice')}
              </Text>
              {recs.slice(0, 3).map((rec) => {
                const pick = rec.result.segment_a[0] ?? rec.result.segment_b[0] ?? null;
                const pickName = pick ? (i18n.language === 'hi' ? pick.crop_hi : pick.crop) : null;
                return (
                  <Pressable
                    key={rec.id}
                    accessibilityRole="button"
                    onPress={() =>
                      navigation.navigate('Recommendation', {
                        fieldId,
                        fieldName: title,
                        recommendationId: rec.id,
                      })
                    }
                  >
                    <Card className="mt-2 flex-row items-center">
                      <View className="mr-3 h-10 w-10 items-center justify-center rounded-pill bg-grow-50">
                        <Ionicons name="sparkles-outline" size={18} color={colors.grow[600]} />
                      </View>
                      <View className="flex-1">
                        <Text weight="medium" className="text-body text-ink" numberOfLines={1}>
                          {pickName ? `${t('history.topPick')}: ${pickName}` : t('recommendation.title')}
                        </Text>
                        <Text className="mt-0.5 text-sm text-ink-muted">
                          {t('history.generatedOn', { date: rec.created_at.slice(0, 10) })}
                        </Text>
                      </View>
                      <Ionicons name="chevron-forward" size={20} color={colors.ink.faint} />
                    </Card>
                  </Pressable>
                );
              })}
            </View>
          ) : null}
        </ScrollView>
      )}
    </Screen>
  );
}

