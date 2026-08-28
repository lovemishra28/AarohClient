import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Image } from 'expo-image';
import { BrandLogo } from '@/components/brand/BrandLogo';
import {
  BluetoothIcon,
  HelpIcon,
  LeafIcon,
  CheckCircleIcon,
} from '@/components/brand/SvgIcons';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, MaxContentWidth } from '@/constants/theme';

interface ConnectDeviceScreenProps {
  onConnected: () => void;
  onSkip: () => void;
}

const STEPS = [
  {
    number: 1,
    title: 'Turn on Bluetooth',
    description: 'Enable Bluetooth on your phone',
    image: require('@/assets/images/phoneIcon.png'),
  },
  {
    number: 2,
    title: 'Power on the stick',
    description: 'Press and hold the power button until the LED starts blinking',
    image: require('@/assets/images/StickIcon.png'),
  },
  {
    number: 3,
    title: 'Find and Connect',
    description: 'Tap the connect button below and select your AgroPulse Stick',
    image: require('@/assets/images/all3icon.png'),
  },
];

export function ConnectDeviceScreen({ onConnected, onSkip }: ConnectDeviceScreenProps) {
  const theme = useTheme();
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      Alert.alert('Device Found!', 'AgroPulse Stick connected successfully.', [
        { text: 'Continue', onPress: onConnected },
      ]);
    }, 2000);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Top Bar / Help Button (top-right) ─── */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() =>
              Alert.alert('Help', 'For assistance, visit agroPulse.com/support or contact our support team.')
            }
            activeOpacity={0.8}
          >
            <HelpIcon color="#60646C" size={16} />
            <Text style={styles.helpText}>Help</Text>
          </TouchableOpacity>
        </View>

        {/* ─── Brand Logo ─── */}
        <View style={styles.brandWrapper}>
          <BrandLogo size="xl" />
        </View>

        {/* ─── Title ─── */}
        <View style={styles.titleContainer}>
          <View style={styles.titleRow}>
            <Text style={[styles.titleText, { color: theme.text }]}>Connect Your Device</Text>
            <BluetoothIcon color="#2E8B57" size={24} />
          </View>
          <Text style={[styles.subtitleText, { color: theme.textSecondary }]}>
            Follow the steps below to connect your{'\n'}AgroPulse Device via Bluetooth
          </Text>
        </View>

        {/* ─── Main Illustration ─── */}
        <View style={styles.illustrationContainer}>
          <Image
            source={require('@/assets/images/stick.png')}
            style={styles.stickImage}
            contentFit="contain"
          />
        </View>

        {/* ─── Steps Section ─── */}
        <View style={styles.stepsHeaderRow}>
          <LeafIcon color="#2E8B57" size={16} />
          <Text style={styles.stepsHeaderText}>3 Simple Steps</Text>
          <LeafIcon color="#2E8B57" size={16} />
        </View>

        <View style={styles.stepsContainer}>
          {STEPS.map((step) => (
            <View key={step.number} style={[styles.stepCard, { backgroundColor: theme.backgroundElement }]}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>{step.number}</Text>
              </View>

              <View style={styles.stepTextContainer}>
                <Text style={[styles.stepTitle, { color: theme.text }]}>{step.title}</Text>
                <Text style={[styles.stepDescription, { color: theme.textSecondary }]}>{step.description}</Text>
              </View>

              <View style={styles.stepIllustration}>
                <Image
                  source={step.image}
                  style={[styles.stepImage, step.number === 3 && styles.allStepsImage]}
                  contentFit="contain"
                />
              </View>
            </View>
          ))}
        </View>

        {/* ─── Scan Button ─── */}
        <TouchableOpacity
          style={[styles.scanButton, scanning && styles.scanButtonScanning]}
          onPress={handleScan}
          activeOpacity={0.9}
          disabled={scanning}
        >
          <BluetoothIcon color="#FFFFFF" size={20} />
          <Text style={styles.scanButtonText}>
            {scanning ? 'Scanning...' : 'Scan & Connect Stick'}
          </Text>
        </TouchableOpacity>

        {/* ─── Footer Note ─── */}
        <View style={styles.footerNoteRow}>
          <View style={styles.checkWrap}>
            <CheckCircleIcon color="#2E8B57" size={16} />
          </View>
          <Text style={[styles.footerNoteText, { color: theme.textSecondary }]}>
            Make sure your stick is powered on & in range
          </Text>
        </View>

        {/* ─── Skip Link ─── */}
        <TouchableOpacity onPress={onSkip} style={styles.skipLink}>
          <Text style={styles.skipLinkText}>Skip for now</Text>
        </TouchableOpacity>
        
        {/* Bottom breathing space */}
        <View style={{ height: 32 }} />

      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },

  // ── Top Bar / Help ──
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'web' ? 12 : 6,
    paddingBottom: 4,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4D5DA',
    borderRadius: 18,
    paddingVertical: 5,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    gap: 6,
  },
  helpText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333333',
  },

  // ── Brand ──
  brandWrapper: {
    marginTop: 2,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },

  // ── Title ──
  titleContainer: {
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    gap: 8,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  subtitleText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
  },

  // ── Main Illustration ──
  illustrationContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  stickImage: {
    width: 380,
    height: 228,
  },

  // ── Steps Header ──
  stepsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  stepsHeaderText: {
    fontSize: 15,
    color: '#1B3C18',
    fontWeight: '800',
  },

  // ── Steps List ──
  stepsContainer: {
    width: '92%',
    gap: 8,
    marginBottom: 24,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4D5DA',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 12,
  },
  stepBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E7F4E8',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepBadgeText: {
    color: '#2E8B57',
    fontSize: 12,
    fontWeight: '800',
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  stepDescription: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
  },
  stepIllustration: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepImage: {
    width: 44,
    height: 44,
  },
  allStepsImage: {
    width: 132,
    transform: [{ translateX: -44 }],
  },

  // ── Scan Button ──
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '92%',
    backgroundColor: '#1B3C18',
    borderRadius: 22,
    paddingVertical: 14,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#1B3C18',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
      },
      android: { elevation: 6 },
      web: {
        shadowColor: '#1B3C18',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
    }),
  },
  scanButtonScanning: {
    backgroundColor: '#2E8B57',
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  // ── Footer Note ──
  footerNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  checkWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7F4E8',
  },
  footerNoteText: {
    fontSize: 11,
    fontWeight: '600',
  },

  // ── Skip Link ──
  skipLink: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  skipLinkText: {
    color: '#60646C',
    fontSize: 13,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
