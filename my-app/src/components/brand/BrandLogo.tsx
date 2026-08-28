/**
 * @file BrandLogo.tsx
 * @description Shared AgroPulse brand logo header: "एग्रो Pulse" wordmark + pulse wave SVG divider.
 * Used at the top of every auth/onboarding screen.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Svg, { Path } from 'react-native-svg';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const SIZE_MAP = {
  sm: { width: 120, height: 32, wave: { width: 40, height: 16 } },
  md: { width: 145, height: 38, wave: { width: 50, height: 20 } },
  lg: { width: 170, height: 46, wave: { width: 50, height: 20 } },
  xl: { width: 240, height: 64, wave: { width: 65, height: 24 } },
};

export function BrandLogo({ size = 'lg' }: BrandLogoProps) {
  const s = SIZE_MAP[size];

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/title.png')}
        style={{ width: s.width, height: s.height }}
        contentFit="contain"
        priority="high"
      />
    </View>
  );
}

interface PulseWaveProps {
  color?: string;
  waveWidth?: number;
  waveHeight?: number;
}

export function PulseWave({ color = '#2E8B57', waveWidth = 50, waveHeight = 20 }: PulseWaveProps) {
  return (
    <View style={styles.pulseRow}>
      <View style={[styles.pulseLine, { backgroundColor: color + '40' }]} />
      <Svg width={waveWidth} height={waveHeight} viewBox="0 0 50 20" style={styles.pulseSvg}>
        <Path
          d="M0 10 H15 L18 2 L22 18 L26 7 L29 13 L32 10 H50"
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
      <View style={[styles.pulseLine, { backgroundColor: color + '40' }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  brandAgro: {
    fontWeight: '900',
    color: '#E65A00',
    marginRight: 4,
  },
  brandPulse: {
    fontWeight: '800',
    color: '#2E8B57',
    fontStyle: 'italic',
  },
  pulseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    height: 20,
  },
  pulseLine: {
    flex: 1,
    height: 2,
  },
  pulseSvg: {
    marginHorizontal: 2,
  },
});
