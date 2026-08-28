import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, Platform, KeyboardAvoidingView, SafeAreaView,
  Alert,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { FarmerMascot } from '@/components/brand/FarmerMascot';
import {
  UserIcon, EmailIcon, LockIcon,
  EyeIcon, EyeOffIcon,
} from '@/components/brand/SvgIcons';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, MaxContentWidth } from '@/constants/theme';

// --- Component Props ---
interface RegisterScreenProps {
  onRegisterSuccess: () => void;
  onBackToLogin: () => void;
}

export function RegisterScreen({ onRegisterSuccess, onBackToLogin }: RegisterScreenProps) {
  const theme = useTheme();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Dynamic password strength meter calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: '#DDD' };
    if (pass.length < 6) return { score: 1, label: 'Weak', color: '#EA4335' };

    const hasNumbers = /\d/.test(pass);
    const hasUppercase = /[A-Z]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

    // Strong if length >= 8, has numbers, and uppercase or special chars
    if (pass.length >= 8 && hasNumbers && (hasUppercase || hasSpecial)) {
      return { score: 3, label: 'Strong', color: '#34A853' };
    }
    return { score: 2, label: 'Medium', color: '#FBBC05' };
  };

  const strength = getPasswordStrength(password);

  const handleCreateAccount = () => {
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert('Missing Fields', 'Please fill in all form fields to register.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'The passwords entered do not match.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long.');
      return;
    }
    if (!agreeToTerms) {
      Alert.alert('Terms Agreement', 'You must agree to the Terms & Conditions and Privacy Policy to continue.');
      return;
    }

    Alert.alert(
      'Account Created',
      'Your account was successfully registered!',
      [{ text: 'OK', onPress: onRegisterSuccess }]
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
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

          {/* ─── Title ─── */}
          <View style={styles.titleContainer}>
            <Text style={[styles.titleText, { color: theme.text }]}>Create your account</Text>
            <Text style={[styles.subtitleText, { color: theme.textSecondary }]}>
              Let's get started 🍃
            </Text>
          </View>

          {/* ─── Farmer Mascot ─── */}
          <View style={styles.mascotWrapper}>
            <FarmerMascot height={260} width={360} />
          </View>

          {/* ─── Register Card ─── */}
          <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>

            {/* Input Form */}
            <View style={styles.formContainer}>

              {/* Full Name Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputIconWrapper}>
                  <UserIcon color="#60646C" size={16} />
                </View>
                <View style={styles.verticalDivider} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Full Name"
                  placeholderTextColor="#B0B4BA"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>

              {/* Email Address Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputIconWrapper}>
                  <EmailIcon color="#60646C" size={16} />
                </View>
                <View style={styles.verticalDivider} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Email Address"
                  placeholderTextColor="#B0B4BA"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputIconWrapper}>
                  <LockIcon color="#60646C" size={16} />
                </View>
                <View style={styles.verticalDivider} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Password"
                  placeholderTextColor="#B0B4BA"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                >
                  {showPassword ? <EyeOffIcon color="#60646C" size={16} /> : <EyeIcon color="#60646C" size={16} />}
                </TouchableOpacity>
              </View>

              {/* Confirm Password Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputIconWrapper}>
                  <LockIcon color="#60646C" size={16} />
                </View>
                <View style={styles.verticalDivider} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Confirm Password"
                  placeholderTextColor="#B0B4BA"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  activeOpacity={0.7}
                >
                  {showConfirmPassword ? <EyeOffIcon color="#60646C" size={16} /> : <EyeIcon color="#60646C" size={16} />}
                </TouchableOpacity>
              </View>

              {/* Dynamic Password Strength Indicator Bars */}
              <View style={styles.strengthMeterRow}>
                {/* Weak indicator */}
                <View style={styles.strengthColumn}>
                  <View
                    style={[
                      styles.strengthBar,
                      { backgroundColor: strength.score >= 1 ? '#EA4335' : '#E0E1E6' },
                    ]}
                  />
                  <Text
                    style={[
                      styles.strengthLabel,
                      { color: strength.score === 1 ? '#EA4335' : '#B0B4BA' },
                    ]}
                  >
                    Weak
                  </Text>
                </View>

                {/* Medium indicator */}
                <View style={styles.strengthColumn}>
                  <View
                    style={[
                      styles.strengthBar,
                      { backgroundColor: strength.score >= 2 ? '#FBBC05' : '#E0E1E6' },
                    ]}
                  />
                  <Text
                    style={[
                      styles.strengthLabel,
                      { color: strength.score === 2 ? '#FBBC05' : '#B0B4BA' },
                    ]}
                  >
                    Medium
                  </Text>
                </View>

                {/* Strong indicator */}
                <View style={styles.strengthColumn}>
                  <View
                    style={[
                      styles.strengthBar,
                      { backgroundColor: strength.score >= 3 ? '#34A853' : '#E0E1E6' },
                    ]}
                  />
                  <Text
                    style={[
                      styles.strengthLabel,
                      { color: strength.score === 3 ? '#34A853' : '#B0B4BA' },
                    ]}
                  >
                    Strong
                  </Text>
                </View>
              </View>

              {/* Terms & Conditions Checkbox Row */}
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    agreeToTerms && styles.checkboxChecked,
                  ]}
                  onPress={() => setAgreeToTerms(!agreeToTerms)}
                  activeOpacity={0.8}
                >
                  {agreeToTerms && (
                    <Svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={4}>
                      <Path d="M20 6L9 17L4 12" />
                    </Svg>
                  )}
                </TouchableOpacity>
                <Text style={styles.checkboxText}>
                  I agree to the <Text style={styles.greenText}>Terms & Conditions</Text> and{' '}
                  <Text style={styles.greenText}>Privacy Policy</Text>
                </Text>
              </View>

              {/* Create Account Submit Button */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleCreateAccount}
                activeOpacity={0.9}
              >
                <Text style={styles.submitButtonText}>Create Account</Text>
              </TouchableOpacity>
            </View>

            {/* Back to Login link */}
            <View style={styles.loginBackLinkRow}>
              <Text style={styles.alreadyHaveText}>Already have an account? </Text>
              <TouchableOpacity onPress={onBackToLogin}>
                <Text style={styles.loginLinkText}>Login</Text>
              </TouchableOpacity>
            </View>
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
  flex: {
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
    marginTop: Platform.OS === 'web' ? 16 : 8,
    marginBottom: 6,
    width: '100%',
    alignItems: 'center',
  },

  // ── Title ──
  titleContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  titleText: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.2,
    marginBottom: 2,
  },
  subtitleText: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
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

  // ── Form ──
  formContainer: {
    width: '100%',
    gap: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4D5DA',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    height: 44,
    width: '100%',
  },
  inputIconWrapper: {
    width: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticalDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#D4D5DA',
    marginHorizontal: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    color: '#333333',
    height: '100%',
  },
  eyeButton: {
    padding: 5,
  },

  // ── Strength Meter ──
  strengthMeterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 2,
    gap: 8,
  },
  strengthColumn: {
    flex: 1,
    alignItems: 'center',
  },
  strengthBar: {
    height: 4,
    width: '100%',
    borderRadius: 2,
    marginBottom: 3,
  },
  strengthLabel: {
    fontSize: 11,
    fontWeight: '700',
  },

  // ── Checkbox ──
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
    paddingHorizontal: 2,
    width: '100%',
  },
  checkbox: {
    width: 17,
    height: 17,
    borderWidth: 1.5,
    borderColor: '#C0C4CC',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#1B3C18',
    borderColor: '#1B3C18',
  },
  checkboxText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '600',
    color: '#60646C',
    lineHeight: 15,
  },
  greenText: {
    color: '#2E8B57',
    fontWeight: '700',
  },

  // ── Submit Button ──
  submitButton: {
    backgroundColor: '#1B3C18',
    borderRadius: 22,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  // ── Login Link ──
  loginBackLinkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
  },
  alreadyHaveText: {
    fontSize: 13,
    color: '#60646C',
    fontWeight: '600',
  },
  loginLinkText: {
    color: '#2E8B57',
    fontSize: 13,
    fontWeight: '700',
  },
});
