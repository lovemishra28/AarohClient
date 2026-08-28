import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { FarmerMascot } from '@/components/brand/FarmerMascot';
import { EditIcon } from '@/components/brand/SvgIcons';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, MaxContentWidth } from '@/constants/theme';

interface OtpScreenProps {
  phoneNumber: string;
  onVerifySuccess: () => void;
  onBackToLogin: () => void;
}

export function OtpScreen({ phoneNumber, onVerifySuccess, onBackToLogin }: OtpScreenProps) {
  const theme = useTheme();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const inputsRef = useRef<(TextInput | null)[]>([]);

  // Timer countdown hook
  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleResendOtp = () => {
    setSecondsLeft(30);
    setOtp(['', '', '', '']);
    inputsRef.current[0]?.focus();
    Alert.alert('OTP Sent', 'A new 4-digit code has been sent to your mobile number.');
  };

  const handleChangeText = (text: string, index: number) => {
    const cleanText = text.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    // Take the last character typed
    newOtp[index] = cleanText.substring(cleanText.length - 1);
    setOtp(newOtp);

    // Shift focus forward if entered a digit
    if (cleanText && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputsRef.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 4) {
      Alert.alert('Invalid OTP', 'Please enter all 4 digits of the verification code.');
      return;
    }
    // Simulate verification success
    onVerifySuccess();
  };

  const formatTime = (seconds: number) => {
    return `00:${seconds < 10 ? '0' : ''}${seconds}`;
  };

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

          {/* ─── Brand Logo ─── */}
          <View style={styles.brandWrapper}>
            <BrandLogo size="xl" />
          </View>

          {/* ─── Title & Subtitle ─── */}
          <View style={styles.titleContainer}>
            <Text style={[styles.titleText, { color: theme.text }]}>Verify Your Number</Text>
            <Text style={[styles.subtitleText, { color: theme.textSecondary }]}>
              We have sent a 4-digit OTP to
            </Text>
            <View style={styles.phoneEditRow}>
              <Text style={[styles.phoneText, { color: theme.text }]}>
                {phoneNumber}
              </Text>
              <TouchableOpacity
                onPress={onBackToLogin}
                style={styles.editButton}
                activeOpacity={0.7}
              >
                <EditIcon color="#2E8B57" size={16} />
              </TouchableOpacity>
            </View>
          </View>

          {/* ─── Farmer Mascot ─── */}
          <View style={styles.mascotWrapper}>
            <FarmerMascot height={260} width={360} />
          </View>

          {/* ─── OTP Card ─── */}
          <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
            
            <Text style={styles.cardTitle}>Enter 4-digit OTP</Text>

            {/* OTP Code Fields Row */}
            <View style={styles.otpInputRow}>
              {otp.map((digit, i) => (
                <TextInput
                  key={i}
                  ref={(ref) => {
                    inputsRef.current[i] = ref;
                  }}
                  style={styles.otpInputBox}
                  value={digit}
                  onChangeText={(text) => handleChangeText(text, i)}
                  onKeyPress={(e) => handleKeyPress(e, i)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  autoFocus={i === 0}
                  autoCorrect={false}
                  placeholderTextColor="#B0B4BA"
                />
              ))}
            </View>

            {/* Timer or Resend Row */}
            <View style={styles.timerRow}>
              {secondsLeft > 0 ? (
                <View style={styles.timerTextContainer}>
                  <Text style={styles.timerLabel}>Resend OTP in </Text>
                  <Text style={styles.timerCount}>{formatTime(secondsLeft)}</Text>
                </View>
              ) : (
                <TouchableOpacity onPress={handleResendOtp} activeOpacity={0.7}>
                  <Text style={styles.resendText}>Resend OTP</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Verify OTP Button */}
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={handleVerifyOtp}
              activeOpacity={0.9}
            >
              <Text style={styles.verifyButtonText}>Verify OTP</Text>
            </TouchableOpacity>

            {/* Change Number Backlink */}
            <TouchableOpacity
              onPress={onBackToLogin}
              style={styles.changeNumberLink}
              activeOpacity={0.7}
            >
              <Text style={styles.changeNumberText}>Change mobile number</Text>
            </TouchableOpacity>
          </View>

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
    alignItems: 'center',
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },

  // ── Brand ──
  brandWrapper: {
    marginTop: Platform.OS === 'web' ? 24 : 16,
    marginBottom: 6,
    width: '100%',
    alignItems: 'center',
  },

  // ── Title ──
  titleContainer: {
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  titleText: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  phoneEditRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    gap: 8,
  },
  phoneText: {
    fontSize: 17,
    fontWeight: '800',
  },
  editButton: {
    padding: 4,
  },

  // ── Mascot ──
  mascotWrapper: {
    marginBottom: 12,
  },

  // ── Card ──
  card: {
    width: '92%',
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 22,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.10,
        shadowRadius: 14,
      },
      android: {
        elevation: 6,
      },
      web: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 18,
      },
    }),
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#60646C',
    marginBottom: 16,
    textAlign: 'center',
  },

  // ── OTP Inputs ──
  otpInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 12,
    marginBottom: 16,
    gap: 12,
  },
  otpInputBox: {
    flex: 1,
    height: 54,
    borderWidth: 1,
    borderColor: '#D4D5DA',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    color: '#1B3C18',
    ...Platform.select({
      web: {
        outlineStyle: 'none' as any,
      },
    }),
  },

  // ── Timer ──
  timerRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  timerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#60646C',
  },
  timerCount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2E8B57',
  },
  resendText: {
    color: '#2E8B57',
    fontSize: 13,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },

  // ── Verify Button ──
  verifyButton: {
    backgroundColor: '#1B3C18',
    borderRadius: 22,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 16,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  // ── Change Number Link ──
  changeNumberLink: {
    padding: 4,
  },
  changeNumberText: {
    color: '#2E8B57',
    fontSize: 13,
    fontWeight: '700',
  },
});
