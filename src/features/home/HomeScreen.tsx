import { Pressable, ScrollView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { useFields } from '@/api/fields';
import type { Field } from '@/api/types';
import {
  BrandHeader,
  Button,
  Card,
  LanguageChip,
  Screen,
  SectionTitle,
  StepRow,
  SyncBanner,
  Text,
} from '@/components';
import { formatNumber } from '@/lib/format';
import { hectaresToAcres } from '@/lib/units';
import { colors } from '@/theme/tokens';
import type { AppStackParamList } from '@/navigation/types';

/**
 * Home dashboard (M4). The calm landing surface: greeting, the two primary actions (add a
 * field / enter a reading), a compact view of the farmer's fields, and the three-step
 * explainer. Offline state rides the shared SyncBanner. All deeper flows push from here.
 */
type Nav = NativeStackNavigationProp<AppStackParamList>;

function areaText(field: Field, t: (k: string) => string): string {
  if (field.area_ha == null || !Number.isFinite(field.area_ha)) return t('fields.noArea');
  return `${formatNumber(hectaresToAcres(field.area_ha), 2)} ${t('fieldCreate.areaUnit')}`;
}

export function HomeScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const { data: fields } = useFields();

  const hasFields = Boolean(fields && fields.length > 0);

  const addField = () => navigation.navigate('FieldCreate');
  const openField = (field: Field) =>
    navigation.navigate('FieldDetail', { fieldId: field.id, fieldName: field.name ?? undefined });
  const newReading = () => {
    if (!fields || fields.length === 0) {
      navigation.navigate('FieldCreate');
    } else if (fields.length === 1) {
      navigation.navigate('ManualReading', { fieldId: fields[0].id, fieldName: fields[0].name ?? undefined });
    } else {
      navigation.navigate('Tabs', { screen: 'Fields' });
    }
  };

  return (
    <Screen>
      <View className="flex-row items-center justify-between px-5 pt-2">
        <BrandHeader />
        <LanguageChip />
      </View>
      <SyncBanner />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingTop: 8 }}>
        <Text weight="bold" className="text-display text-brand-700">
          {t('home.greeting')}
        </Text>
        <Text className="mt-1 text-body text-ink-muted">{t('home.subtitle')}</Text>

        <View className="mt-6" style={{ gap: 12 }}>
          <Button label={t('home.addField')} icon="add" onPress={addField} />
          <Button label={t('home.newReading')} icon="create-outline" variant="secondary" onPress={newReading} />
        </View>

        {hasFields ? (
          <View className="mt-8">
            <View className="flex-row items-center justify-between">
              <SectionTitle>{t('home.yourFields')}</SectionTitle>
              <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Tabs', { screen: 'Fields' })}>
                <Text weight="medium" className="text-sm text-brand-600">
                  {t('common.viewAll')}
                </Text>
              </Pressable>
            </View>
            <Text className="mt-0.5 text-sm text-ink-muted">
              {t('home.fieldCount', { count: fields?.length ?? 0 })}
            </Text>

            {fields?.slice(0, 3).map((field) => (
              <Pressable key={field.id} accessibilityRole="button" onPress={() => openField(field)}>
                <Card className="mt-3 flex-row items-center">
                  <View className="mr-3 h-10 w-10 items-center justify-center rounded-pill bg-brand-50">
                    <Ionicons name="leaf-outline" size={18} color={colors.brand[600]} />
                  </View>
                  <View className="flex-1">
                    <Text weight="semibold" className="text-body text-ink" numberOfLines={1}>
                      {field.name ?? t('fields.title')}
                    </Text>
                    <Text className="mt-0.5 text-sm text-ink-muted">{areaText(field, t)}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.ink.faint} />
                </Card>
              </Pressable>
            ))}
          </View>
        ) : (
          <Card className="mt-8">
            <Text weight="semibold" className="text-body-lg text-ink">
              {t('home.emptyTitle')}
            </Text>
            <Text className="mt-1 text-body text-ink-muted">{t('home.emptyMessage')}</Text>
          </Card>
        )}

        <SectionTitle className="mt-8">{t('home.stepsTitle')}</SectionTitle>
        <Card className="mt-2">
          <StepRow index={1} title={t('home.step1Title')} subtitle={t('home.step1Sub')} icon="map-outline" />
          <StepRow index={2} title={t('home.step2Title')} subtitle={t('home.step2Sub')} icon="create-outline" />
          <StepRow index={3} title={t('home.step3Title')} subtitle={t('home.step3Sub')} icon="cash-outline" />
        </Card>
      </ScrollView>
    </Screen>
  );
}

