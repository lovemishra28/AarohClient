import { useEffect, useRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';

import { requestOtp, updateMe, verifyOtp } from '@/api/auth';
import { ApiError, NetworkError } from '@/api/client';
import { Button, InfoStrip, Screen, Text } from '@/components';
import { useAuthStore } from '@/store/authStore';
import type { AuthScreenProps } from '@/navigation/types';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

/**
 * OTP verification. Uses the common one-hidden-input pattern: a single full-width
 * TextInput captures the digits, and six styled boxes mirror them — far more robust than
 * juggling focus across six separate fields. Auto-submits on the sixth digit, with an
 * explicit Verify button as a fallback.
 */
export function OtpScreen({ route, navigation }: AuthScreenProps<'Otp'>) {
  const { t } = useTranslation();
  const { phone, devCode, mode, name } = route.params;
  const setSession = useAuthStore((s) => s.setSession);

  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const verifyMutation = useMutation({
    mutationFn: (fullCode: string) => verifyOtp(phone, fullCode),
    onSuccess: async (result) => {
      await setSession(result, result.farmer);
      // The OTP verify call carries no name field, so a name captured on the Sign Up
      // form is saved with a follow-up PATCH /v1/me. Kept best-effort on purpose: a
      // failed name save must never block a sign-in that already succeeded.
      if (mode === 'signup' && name && name.trim()) {
        try {
          const { farmer } = await updateMe({ name: name.trim() });
          useAuthStore.getState().setFarmer(farmer);
        } catch {
          // Ignore — see note above.
        }
      }
      // No navigation call needed: RootNavigator swaps to the app stack on status change.
    },
    onError: (err) => {
      setCode('');
      if (err instanceof ApiError && (err.status === 400 || err.status === 401)) {
        setError(t('auth.errOtpVerify'));
      } else if (err instanceof NetworkError) {
        setError(t('health.failed'));
      } else {
        setError(t('auth.errOtpVerify'));
      }
    },
  });

  const resendMutation = useMutation({
    mutationFn: () => requestOtp(phone),
    onSuccess: () => setSecondsLeft(RESEND_SECONDS),
    onError: () => setError(t('auth.errOtpRequest')),
  });

  const submit = (value: string) => {
    if (value.length !== OTP_LENGTH) {
      setError(t('auth.errInvalidCode', { length: OTP_LENGTH }));
      return;
    }
    setError(null);
    verifyMutation.mutate(value);
  };

  const onChange = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, OTP_LENGTH);
    setCode(digits);
    if (error) setError(null);
    if (digits.length === OTP_LENGTH) submit(digits);
  };

  const boxes = Array.from({ length: OTP_LENGTH }, (_, i) => code[i] ?? '');

  return (
    <Screen>
      <View className="flex-row items-center px-5 pt-2">
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
          className="h-touch w-touch justify-center"
        >
          <Text className="text-body text-brand-700">‹ {t('common.back')}</Text>
        </Pressable>
      </View>

      <View className="flex-1 px-6 pt-6">
        <Text weight="bold" className="text-title text-brand-700">
          {t('auth.otpTitle')}
        </Text>
        <Text className="mb-8 mt-1 text-body text-ink-muted">
          {t('auth.otpSubtitle', { phone })}
        </Text>

        {/* Hidden capture input, overlaid by the box row via absolute fill. */}
        <Pressable onPress={() => inputRef.current?.focus()}>
          <View className="flex-row justify-between">
            {boxes.map((digit, i) => {
              const active = i === code.length;
              return (
                <View
                  key={i}
                  className={`h-14 w-12 items-center justify-center rounded-field border bg-surface ${
                    active ? 'border-brand-600' : digit ? 'border-brand-300' : 'border-line'
                  }`}
                >
                  <Text weight="semibold" className="text-title text-ink">
                    {digit}
                  </Text>
                </View>
              );
            })}
          </View>
          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={onChange}
            keyboardType="number-pad"
            maxLength={OTP_LENGTH}
            autoFocus
            caretHidden
            className="absolute h-14 w-full opacity-0"
          />
        </Pressable>

        {error ? <Text className="mt-3 text-sm text-avoid-600">{error}</Text> : null}

        {devCode ? (
          <View className="mt-4">
            <InfoStrip tone="info" text={t('auth.devHint', { code: devCode })} />
          </View>
        ) : null}

        <Button
          label={t('auth.verify')}
          className="mt-8"
          loading={verifyMutation.isPending}
          onPress={() => submit(code)}
        />

        <View className="mt-5 flex-row items-center justify-center">
          {secondsLeft > 0 ? (
            <Text className="text-sm text-ink-muted">
              {t('auth.otpResendIn', { seconds: secondsLeft })}
            </Text>
          ) : (
            <Pressable
              accessibilityRole="button"
              disabled={resendMutation.isPending}
              onPress={() => resendMutation.mutate()}
              className="h-touch justify-center"
            >
              <Text weight="semibold" className="text-sm text-brand-700">
                {t('auth.otpResend')}
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </Screen>
  );
}
