/**
 * @file useAuthFlow.ts
 * @description Manages the authentication and onboarding step state machine.
 * Extracted from _layout.tsx to keep the root layout clean and this logic testable.
 */

import { useState } from 'react';

export type AuthStep = 'login' | 'otp' | 'register';
export type AppStep = 'auth' | 'connect_device' | 'field_setup' | 'main';

export interface AuthFlowState {
  appStep: AppStep;
  authStep: AuthStep;
  phoneNumber: string;
  setAuthStep: (step: AuthStep) => void;
  setPhoneNumber: (phone: string) => void;
  handleAuthComplete: () => void;
  handleDeviceConnected: () => void;
  handleFieldSetupComplete: () => void;
}

export function useAuthFlow(): AuthFlowState {
  const [appStep, setAppStep] = useState<AppStep>('auth');
  const [authStep, setAuthStep] = useState<AuthStep>('login');
  const [phoneNumber, setPhoneNumber] = useState('+91 1234567890');

  return {
    appStep,
    authStep,
    phoneNumber,
    setAuthStep,
    setPhoneNumber,
    handleAuthComplete: () => setAppStep('connect_device'),
    handleDeviceConnected: () => setAppStep('field_setup'),
    handleFieldSetupComplete: () => setAppStep('main'),
  };
}
