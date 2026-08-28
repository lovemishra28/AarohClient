import { useState } from 'react';

import { useAuthFlow } from '@/features/auth/hooks/useAuthFlow';
import { LoginScreen, OtpScreen, RegisterScreen } from '@/features/auth/screens';
import { ConnectDeviceScreen, FieldSetupScreen } from '@/features/onboarding/screens';
import { HomeScreen } from '@/components/home-screen';

export function AuthFlow() {
  const {
    appStep,
    authStep,
    phoneNumber,
    setAuthStep,
    setPhoneNumber,
    handleAuthComplete,
    handleDeviceConnected,
    handleFieldSetupComplete,
  } = useAuthFlow();

  const renderAuthScreen = () => {
    if (authStep === 'login') {
      return (
        <LoginScreen
          onLogin={handleAuthComplete}
          onPhoneLoginRequested={(phone) => {
            setPhoneNumber(phone);
            setAuthStep('otp');
          }}
          onRegisterRequested={() => setAuthStep('register')}
        />
      );
    }

    if (authStep === 'register') {
      return (
        <RegisterScreen
          onRegisterSuccess={handleAuthComplete}
          onBackToLogin={() => setAuthStep('login')}
        />
      );
    }

    return (
      <OtpScreen
        phoneNumber={phoneNumber}
        onVerifySuccess={handleAuthComplete}
        onBackToLogin={() => setAuthStep('login')}
      />
    );
  };

  const renderScreen = () => {
    if (appStep === 'auth') {
      return renderAuthScreen();
    }

    if (appStep === 'connect_device') {
      return (
        <ConnectDeviceScreen
          onConnected={handleDeviceConnected}
          onSkip={handleDeviceConnected}
        />
      );
    }

    if (appStep === 'field_setup') {
      return <FieldSetupScreen onContinue={handleFieldSetupComplete} />;
    }

    return <HomeScreen />;
  };

  return <>{renderScreen()}</>;
}
