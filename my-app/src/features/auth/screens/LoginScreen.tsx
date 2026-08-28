import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, Platform, KeyboardAvoidingView, SafeAreaView,
  Modal, Alert, Dimensions,
} from 'react-native';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { FarmerMascot } from '@/components/brand/FarmerMascot';
import {
  GoogleIcon, PhoneIcon, EmailIcon, UserIcon, LockIcon,
  EyeIcon, EyeOffIcon, GlobeIcon, LeafIcon,
} from '@/components/brand/SvgIcons';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, MaxContentWidth } from '@/constants/theme';

interface LoginScreenProps {
  onLogin: () => void;
  onPhoneLoginRequested: (phone: string) => void;
  onRegisterRequested: () => void;
}

type LoginMethod = 'phone' | 'email' | 'google' | null;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function LoginScreen({ onLogin, onPhoneLoginRequested, onRegisterRequested }: LoginScreenProps) {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<LoginMethod>(null);
  const [methodEmail, setMethodEmail] = useState('');
  const [methodPhone, setMethodPhone] = useState('');
  const [methodPassword, setMethodPassword] = useState('');
  const [showMethodPassword, setShowMethodPassword] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [langModalVisible, setLangModalVisible] = useState(false);

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'HI', name: 'हिन्दी (Hindi)' },
    { code: 'PB', name: 'ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'GU', name: 'ગુજરાતી (Gujarati)' },
  ];

  const handleManualLogin = () => {
    const trimmedInput = email.trim();
    if (!trimmedInput || !password.trim()) {
      Alert.alert('Missing Fields', 'Please enter your email/phone and password to proceed.');
      return;
    }
    const phoneRegex = /^(\+?\d[\d\s-]{7,15})$/;
    if (phoneRegex.test(trimmedInput)) {
      onPhoneLoginRequested(trimmedInput);
    } else {
      onLogin();
    }
  };

  const handleMethodLogin = () => {
    const trimmedEmail = methodEmail.trim();
    const trimmedPhone = methodPhone.trim();
    const phoneRegex = /^(\+?\d[\d\s-]{7,15})$/;

    if (loginMethod === 'phone') {
      if (!phoneRegex.test(trimmedPhone)) {
        Alert.alert('Invalid Phone Number', 'Please enter a valid phone number.');
        return;
      }
      setLoginMethod(null);
      onPhoneLoginRequested(trimmedPhone);
      return;
    }

    if (!trimmedEmail || (loginMethod === 'email' && !methodPassword.trim())) {
      Alert.alert('Missing Fields', loginMethod === 'google' ? 'Please enter your Google email address.' : 'Please enter your email and password.');
      return;
    }

    setLoginMethod(null);
    onLogin();
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* ─── Language Selector (top-right) ─── */}
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.langSelector} onPress={() => setLangModalVisible(true)}>
              <GlobeIcon color="#60646C" size={13} />
              <Text style={styles.langText}>{selectedLanguage}</Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
          </View>

          {/* ─── Brand Logo ─── */}
          <View style={styles.brandWrapper}>
            <BrandLogo size="xl" />
          </View>

          {/* ─── Welcome Text ─── */}
          <View style={styles.welcomeContainer}>
            <Text style={[styles.welcomeHello, { color: theme.text }]}>Hello,</Text>
            <View style={styles.welcomeSubRow}>
              <Text style={[styles.welcomeSubtext, { color: theme.textSecondary }]}>
                Welcome to एग्रो Pulse
              </Text>
              <Text style={styles.welcomeLeaf}> 🍃</Text>
            </View>
          </View>

          {/* ─── Farmer Mascot ─── */}
          <View style={styles.mascotWrapper}>
            <FarmerMascot height={260} width={360} />
          </View>

          {/* ─── Login Card ─── */}
          <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>

            {/* Card Header */}
            <View style={styles.cardHeader}>
              <LeafIcon color="#2E8B57" size={16} />
              <Text style={styles.cardTitle}>Login to continue</Text>
              <LeafIcon color="#2E8B57" size={16} />
            </View>

            {/* Continue With Google */}
            <TouchableOpacity
              style={styles.googleButton}
              onPress={() => setLoginMethod('google')}
              activeOpacity={0.9}
            >
              <View style={styles.googleIconWrapper}>
                <GoogleIcon />
              </View>
              <Text style={styles.googleButtonText}>Continue With Google</Text>
            </TouchableOpacity>

            {/* ── or ── */}
            <View style={styles.separatorRow}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>or</Text>
              <View style={styles.separatorLine} />
            </View>

            {/* Login with Phone / Email */}
            <View style={styles.alternativeLoginsRow}>
              <TouchableOpacity
                style={styles.altLoginButton}
                onPress={() => setLoginMethod('phone')}
                activeOpacity={0.8}
              >
                <PhoneIcon color="#1B3C18" size={14} />
                <Text style={styles.altLoginButtonText}>Login with{'\n'}Phone</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.altLoginButton}
                onPress={() => setLoginMethod('email')}
                activeOpacity={0.8}
              >
                <EmailIcon color="#1B3C18" size={14} />
                <Text style={styles.altLoginButtonText}>Login with{'\n'}Email</Text>
              </TouchableOpacity>
            </View>

            {/* ── or ── */}
            <View style={styles.separatorRow}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>or</Text>
              <View style={styles.separatorLine} />
            </View>

            {/* Manual Login Form */}
            <View style={styles.formContainer}>

              {/* Email / Phone Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputIconWrapper}>
                  <UserIcon color="#60646C" size={16} />
                </View>
                <View style={styles.verticalDivider} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Email or Phone Number"
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

              {/* Forgot Password */}
              <TouchableOpacity
                onPress={() => Alert.alert('Forgot Password', 'Password recovery will be available soon.')}
                style={styles.forgotPasswordContainer}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleManualLogin}
                activeOpacity={0.9}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>

            {/* Register Link */}
            <View style={styles.registerBackLinkRow}>
              <Text style={styles.dontHaveText}>Don't have an account? </Text>
              <TouchableOpacity onPress={onRegisterRequested}>
                <Text style={styles.registerLinkText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom breathing space */}
          <View style={{ height: 32 }} />

        </ScrollView>
      </KeyboardAvoidingView>

      {/* ─── Language Modal ─── */}
      <Modal visible={langModalVisible} transparent animationType="fade" onRequestClose={() => setLangModalVisible(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setLangModalVisible(false)}>
          <View style={[styles.modalContent, { backgroundColor: theme.backgroundSelected }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Select Language</Text>
            {languages.map((lang) => (
              <TouchableOpacity key={lang.code} style={styles.modalItem} onPress={() => { setSelectedLanguage(lang.code); setLangModalVisible(false); }}>
                <Text style={[styles.modalItemText, selectedLanguage === lang.code && styles.modalItemActiveText, { color: theme.text }]}>{lang.name}</Text>
                {selectedLanguage === lang.code && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ─── Method Modal (Phone/Email/Google) ─── */}
      <Modal visible={loginMethod !== null} transparent animationType="fade" onRequestClose={() => setLoginMethod(null)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setLoginMethod(null)}>
          <TouchableOpacity style={[styles.loginMethodModal, { backgroundColor: theme.backgroundElement }]} activeOpacity={1}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {loginMethod === 'phone' ? 'Enter your phone number' : loginMethod === 'google' ? 'Continue with Google' : 'Login with email'}
            </Text>
            <Text style={[styles.modalDescription, { color: theme.textSecondary }]}>
              {loginMethod === 'phone' ? 'We will send a verification code to this number.' : loginMethod === 'google' ? 'Enter the Google email address you want to use.' : 'Enter your email and password to continue.'}
            </Text>

            {loginMethod === 'phone' ? (
              <TextInput style={styles.methodInput} placeholder="Phone number" placeholderTextColor="#B0B4BA" value={methodPhone} onChangeText={setMethodPhone} keyboardType="phone-pad" autoFocus />
            ) : (
              <>
                <TextInput style={styles.methodInput} placeholder="Email address" placeholderTextColor="#B0B4BA" value={methodEmail} onChangeText={setMethodEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} autoFocus />
                {loginMethod === 'email' && (
                  <View style={styles.methodPasswordRow}>
                    <TextInput style={[styles.methodInput, styles.methodPasswordInput]} placeholder="Password" placeholderTextColor="#B0B4BA" value={methodPassword} onChangeText={setMethodPassword} secureTextEntry={!showMethodPassword} autoCapitalize="none" />
                    <TouchableOpacity style={styles.methodEyeButton} onPress={() => setShowMethodPassword(!showMethodPassword)}>
                      {showMethodPassword ? <EyeOffIcon color="#60646C" /> : <EyeIcon color="#60646C" />}
                    </TouchableOpacity>
                  </View>
                )}
              </>
            )}

            <TouchableOpacity style={styles.methodContinueButton} onPress={handleMethodLogin} activeOpacity={0.9}>
              <Text style={styles.loginButtonText}>{loginMethod === 'phone' ? 'Send Code' : 'Continue'}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
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

  // ── Top bar / Language ──
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'web' ? 12 : 6,
    paddingBottom: 4,
  },
  langSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D4D5DA',
    borderRadius: 18,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    gap: 4,
  },
  langText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333333',
  },
  dropdownArrow: {
    fontSize: 7,
    color: '#60646C',
    marginLeft: 2,
  },

  // ── Brand ──
  brandWrapper: {
    marginTop: 2,
    marginBottom: 6,
    width: '100%',
    alignItems: 'center',
  },

  // ── Welcome ──
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  welcomeHello: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  welcomeSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  welcomeSubtext: {
    fontSize: 15,
    fontWeight: '600',
  },
  welcomeLeaf: {
    fontSize: 16,
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

  // ── Card Header ──
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    gap: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B3C18',
  },

  // ── Google Button ──
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1B3C18',
    borderRadius: 22,
    paddingVertical: 11,
    width: '100%',
    marginBottom: 6,
  },
  googleIconWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 3,
    position: 'absolute',
    left: 12,
  },
  googleButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.1,
  },

  // ── Separator ──
  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    width: '100%',
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E1E6',
  },
  separatorText: {
    fontSize: 13,
    color: '#888C94',
    marginHorizontal: 12,
    fontWeight: '500',
  },

  // ── Alt Login Buttons ──
  alternativeLoginsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  altLoginButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D4D5DA',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 6,
    backgroundColor: '#FFFFFF',
    gap: 6,
  },
  altLoginButtonText: {
    color: '#1B3C18',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 15,
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

  // ── Forgot Password ──
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: 0,
    marginBottom: 2,
  },
  forgotPasswordText: {
    color: '#2E8B57',
    fontSize: 12,
    fontWeight: '700',
  },

  // ── Login Button ──
  loginButton: {
    backgroundColor: '#1B3C18',
    borderRadius: 22,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  // ── Register Link ──
  registerBackLinkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
  },
  dontHaveText: {
    fontSize: 13,
    color: '#60646C',
    fontWeight: '600',
  },
  registerLinkText: {
    color: '#2E8B57',
    fontSize: 13,
    fontWeight: '700',
  },

  // ── Modals ──
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: 20,
    padding: Spacing.three,
    alignItems: 'center',
  },
  loginMethodModal: {
    width: '88%',
    borderRadius: 20,
    padding: Spacing.three,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: Spacing.three,
  },
  modalDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: Spacing.two,
  },
  methodInput: {
    borderWidth: 1,
    borderColor: '#E0E1E6',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    color: '#333333',
    paddingHorizontal: 14,
    height: 46,
    marginBottom: Spacing.two,
  },
  methodPasswordRow: {
    position: 'relative',
  },
  methodPasswordInput: {
    paddingRight: 48,
    width: '100%',
  },
  methodEyeButton: {
    position: 'absolute',
    right: 8,
    top: 5,
    padding: 6,
  },
  methodContinueButton: {
    backgroundColor: '#1B3C18',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.one,
  },
  modalItem: {
    width: '100%',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalItemText: {
    fontSize: 15,
  },
  modalItemActiveText: {
    fontWeight: '700',
    color: '#2E8B57',
  },
  checkmark: {
    color: '#2E8B57',
    fontWeight: '800',
    fontSize: 16,
  },
});
