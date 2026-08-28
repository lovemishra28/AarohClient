/**
 * @file FarmerMascot.tsx
 * @description Shared AgroPulse farmer mascot image wrapper.
 * Used on Login, OTP, Register, and ConnectDevice screens.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

interface FarmerMascotProps {
  height?: number;
  width?: number;
}

export function FarmerMascot({ height = 180, width = 260 }: FarmerMascotProps) {
  return (
    <View style={[styles.container, { height }]}>
      <Image
        source={require('@/assets/images/farmericon.png')}
        style={{ width, height }}
        contentFit="contain"
        priority="high"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
