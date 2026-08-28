import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Image } from 'expo-image';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { HelpIcon, CheckCircleIcon } from '@/components/brand/SvgIcons';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, MaxContentWidth } from '@/constants/theme';

interface FieldSetupScreenProps {
  onContinue: () => void;
}

const StepIndicator = () => (
  <View style={styles.stepRow}>
    <View style={[styles.stepBubble, styles.stepBubbleActive]}>
      <Text style={[styles.stepLabel, styles.stepLabelActive]}>1</Text>
    </View>
    <View style={[styles.stepLine, styles.stepLineActive]} />
    
    <View style={[styles.stepBubble, styles.stepBubbleActive]}>
      <Text style={[styles.stepLabel, styles.stepLabelActive]}>2</Text>
    </View>
    <View style={styles.stepLine} />

    <View style={styles.stepBubble}>
      <Text style={styles.stepLabelActive}>3</Text>
    </View>
  </View>
);

export function FieldSetupScreen({ onContinue }: FieldSetupScreenProps) {
  const theme = useTheme();
  const [fieldSize, setFieldSize] = useState('');
  const [distance, setDistance] = useState('');
  const [pointCount, setPointCount] = useState('');

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ─── Top Bar / Logo & Help ─── */}
          <View style={styles.topBar}>
            <View style={styles.brandWrapper}>
              <BrandLogo size="md" />
            </View>
            <TouchableOpacity style={styles.helpButton} activeOpacity={0.8}>
              <Text style={styles.helpText}>?</Text>
            </TouchableOpacity>
          </View>

          {/* ─── Title ─── */}
          <Text style={[styles.title, { color: theme.text }]}>Field Setup</Text>

          {/* ─── Step Indicator ─── */}
          <StepIndicator />

          {/* ─── Field Size Card ─── */}
          <View style={[styles.sectionCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
            <View style={styles.labelRow}>
              <View style={styles.iconFrame}>
                <Image 
                  source={require('@/assets/images/feild&locationicon.png')} 
                  style={styles.fieldIconImage} 
                  contentFit="fill"
                  tintColor={theme.text}
                />
              </View>
              <View style={styles.labelTextContainer}>
                <Text style={[styles.fieldLabel, { color: theme.text }]}>Enter the size of the field</Text>
                <Text style={[styles.fieldSubtitle, { color: theme.textSecondary }]}>Specify the total area of your field</Text>
              </View>
            </View>

            <View style={[styles.inputContainer, { borderColor: theme.border }]}>
              <TextInput
                style={[styles.input, { color: theme.text }]}
                placeholder="Enter the size"
                placeholderTextColor={theme.textSecondary}
                keyboardType="numeric"
                value={fieldSize}
                onChangeText={setFieldSize}
              />
              <View style={[styles.inputDivider, { backgroundColor: theme.border }]} />
              <Text style={styles.unitText}>acres</Text>
            </View>
          </View>

          {/* ─── Device Placement Card ─── */}
          <View style={[styles.sectionCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
            <View style={styles.labelRow}>
              <View style={styles.iconFrame}>
                <Image 
                  source={require('@/assets/images/feild&locationicon.png')} 
                  style={styles.locationIconImage} 
                  contentFit="fill"
                  tintColor={theme.text}
                />
              </View>
              <View style={styles.labelTextContainer}>
                <Text style={[styles.fieldLabel, { color: theme.text }]}>Points where to place{'\n'}the device</Text>
              </View>
            </View>

            <Text style={[styles.helperText, { color: theme.textSecondary }]}>Distance between points</Text>
            <View style={[styles.inputContainer, styles.inputMargin, { borderColor: theme.border }]}>
              <TextInput
                style={[styles.input, { color: theme.text }]}
                keyboardType="numeric"
                value={distance}
                onChangeText={setDistance}
              />
              <Text style={styles.unitText}>meters</Text>
            </View>

            <Text style={[styles.helperText, { color: theme.textSecondary }]}>Number of points</Text>
            <View style={[styles.inputContainer, styles.inputMargin, { paddingRight: 0, borderColor: theme.border }]}>
              <TextInput
                style={[styles.input, { color: theme.text }]}
                keyboardType="numeric"
                value={pointCount}
                onChangeText={setPointCount}
              />
            </View>

            {/* Checkbox Note */}
            <View style={styles.noticeBox}>
              <View style={styles.checkWrap}>
                <CheckCircleIcon color="#00D200" size={18} />
              </View>
              <Text style={styles.noticeText}>
                Device will be placed at the given distance interval across your field
              </Text>
            </View>
          </View>

          {/* ─── Continue Button ─── */}
          <TouchableOpacity style={styles.continueButton} onPress={onContinue} activeOpacity={0.9}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>

          {/* Bottom breathing space */}
          <View style={{ height: 32 }} />

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'web' ? 12 : 6,
  },

  // ── Top Bar ──
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  brandWrapper: {
    alignItems: 'flex-start',
  },
  helpButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1B3C18',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },

  // ── Title ──
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1B3C18',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.2,
  },

  // ── Steps ──
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  stepBubble: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBubbleActive: {
    backgroundColor: '#1B3C18',
  },
  stepLabel: {
    color: '#333333',
    fontWeight: '800',
    fontSize: 12,
  },
  stepLabelActive: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 11,
  },
  stepLine: {
    width: 32,
    height: 2,
    backgroundColor: '#DCDCDC',
  },
  stepLineActive: {
    backgroundColor: '#1B3C18',
  },

  // ── Cards ──
  sectionCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333', // As per screenshot, thin dark border
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: { elevation: 2 },
      web: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
    }),
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconFrame: {
    width: 42,
    height: 42,
    overflow: 'hidden',
    justifyContent: 'center',
    marginRight: 12,
  },
  fieldIconImage: {
    width: 84,
    height: 42,
  },
  locationIconImage: {
    width: 84,
    height: 42,
    transform: [{ translateX: -42 }],
  },
  labelTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 2,
  },
  fieldSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333333',
  },
  
  // ── Inputs ──
  helperText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#111111',
    marginBottom: 6,
  },
  inputMargin: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1B3C18', // dark green border
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingLeft: 12,
    paddingRight: 12,
    height: 42,
  },
  input: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: '#333333',
    paddingVertical: 0,
    ...Platform.select({
      web: {
        outlineStyle: 'none' as any,
      },
    }),
  },
  inputDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#D4D5DA',
    marginHorizontal: 12,
  },
  unitText: {
    color: '#1B3C18',
    fontSize: 13,
    fontWeight: '800',
  },

  // ── Notice Box ──
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FAEA', // light green bg
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 4,
  },
  checkWrap: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  noticeText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '500',
    color: '#111111',
  },

  // ── Continue Button ──
  continueButton: {
    backgroundColor: '#1B3C18',
    borderRadius: 22,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#1B3C18',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },
      android: { elevation: 4 },
      web: {
        shadowColor: '#1B3C18',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
    }),
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});
