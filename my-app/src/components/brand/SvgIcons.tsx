/**
 * @file SvgIcons.tsx
 * @description Central repository for all SVG icon components used across the app.
 * Import from here instead of defining inline SVGs per-screen.
 * All icons accept a `color` prop and optionally a `size` prop.
 */

import React from 'react';
import Svg, { Path, Circle, Rect, Line, Ellipse, G } from 'react-native-svg';

interface IconProps {
  color?: string;
  size?: number;
}

export const GoogleIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24">
    <Path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.68 1.54 14.98 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.89 3.02C6.2 7.7 8.89 5.04 12 5.04z" />
    <Path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.42 3.57v2.97h3.89c2.28-2.1 3.56-5.19 3.56-8.69z" />
    <Path fill="#FBBC05" d="M5.28 14.78a7.18 7.18 0 0 1 0-4.56L1.39 7.2a11.96 11.96 0 0 0 0 9.6l3.89-3.02z" />
    <Path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.89-2.97c-1.09.73-2.48 1.17-4.07 1.17-3.11 0-5.8-2.66-6.72-5.54L1.39 15.8C3.37 19.69 7.35 22.33 12 23z" />
  </Svg>
);

export const PhoneIcon = ({ color = '#1B3C18', size = 18 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </Svg>
);

export const EmailIcon = ({ color = '#60646C', size = 18 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <Path d="m22 6-10 7L2 6" />
  </Svg>
);

export const UserIcon = ({ color = '#60646C', size = 18 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <Circle cx="12" cy="7" r="4" />
  </Svg>
);

export const LockIcon = ({ color = '#60646C', size = 18 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </Svg>
);

export const EyeIcon = ({ color = '#60646C', size = 18 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <Circle cx="12" cy="12" r="3" />
  </Svg>
);

export const EyeOffIcon = ({ color = '#60646C', size = 18 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <Line x1="1" y1="1" x2="23" y2="23" />
  </Svg>
);

export const GlobeIcon = ({ color = '#60646C', size = 14 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Line x1="2" y1="12" x2="22" y2="12" />
    <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </Svg>
);

export const LeafIcon = ({ color = '#1B3C18', size = 18 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2z" />
    <Path d="M9.8 6.1C12 8 15 11 19 12" />
  </Svg>
);

export const EditIcon = ({ color = '#2E8B57', size = 16 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 20h9" />
    <Path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </Svg>
);

export const CheckmarkIcon = ({ color = '#FFFFFF', size = 12 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={4}>
    <Path d="M20 6L9 17L4 12" />
  </Svg>
);

export const BluetoothIcon = ({ color = '#FFFFFF', size = 20 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <Path d="m6.5 6.5 11 11L12 23V1l5.5 5.5-11 11" />
  </Svg>
);

export const HelpIcon = ({ color = '#60646C', size = 22 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <Line x1="12" y1="17" x2="12.01" y2="17" />
  </Svg>
);

export const CheckCircleIcon = ({ color = '#2E8B57', size = 20 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <Path d="m9 11 3 3L22 4" />
  </Svg>
);

// --- Device-specific Illustration Icons ---

export const PhoneBluetoothIllustration = () => (
  <Svg width={48} height={48} viewBox="0 0 48 48">
    <Rect x="12" y="4" width="18" height="30" rx="3" fill="#E8F5E9" stroke="#2E8B57" strokeWidth="1.5" />
    <Circle cx="21" cy="31" r="2" fill="#2E8B57" />
    <Circle cx="32" cy="16" r="8" fill="#2E8B57" />
    <Path d="M29 12 l4 3.5 l-4 3.5 M29 12 l4 3.5 l-4 3.5" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M32 10 l2 2.5 l-2 2.5 l2 2.5 l-2 2.5" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
);

export const StickPowerIllustration = () => (
  <Svg width={48} height={48} viewBox="0 0 48 48">
    <Rect x="18" y="8" width="12" height="32" rx="6" fill="#E8F5E9" stroke="#2E8B57" strokeWidth="1.5" />
    <Rect x="21" y="4" width="6" height="8" rx="3" fill="#2E8B57" />
    <Circle cx="24" cy="24" r="3" fill="#34A853" />
    <Circle cx="24" cy="24" r="6" fill="none" stroke="#34A853" strokeWidth="1" opacity="0.5" />
  </Svg>
);

export const PhoneConnectIllustration = () => (
  <Svg width={48} height={48} viewBox="0 0 48 48">
    <Rect x="8" y="6" width="22" height="36" rx="3" fill="#E8F5E9" stroke="#2E8B57" strokeWidth="1.5" />
    <Rect x="12" y="14" width="14" height="3" rx="1.5" fill="#2E8B57" opacity="0.5" />
    <Rect x="12" y="20" width="14" height="3" rx="1.5" fill="#2E8B57" />
    <Rect x="12" y="26" width="14" height="3" rx="1.5" fill="#2E8B57" opacity="0.5" />
    <Circle cx="36" cy="30" r="8" fill="#2E8B57" opacity="0.9" />
    <Path d="M33 30 l2 2 l4-4" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const DeviceIllustration = () => (
  <Svg width={180} height={160} viewBox="0 0 180 160">
    <Ellipse cx="80" cy="130" rx="30" ry="8" fill="#2E8B5715" />
    <Rect x="72" y="30" width="16" height="100" rx="8" fill="#2E3135" />
    <Rect x="68" y="22" width="24" height="16" rx="6" fill="#1B3C18" />
    <Rect x="76" y="10" width="8" height="16" rx="4" fill="#2E8B57" />
    <Circle cx="80" cy="70" r="4" fill="#34A853" />
    <Circle cx="125" cy="80" r="16" fill="none" stroke="#2E8B57" strokeWidth="2" strokeDasharray="4,3" />
    <Circle cx="125" cy="80" r="28" fill="none" stroke="#2E8B57" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5" />
    <Circle cx="125" cy="80" r="12" fill="#2E8B57" />
    <Path d="M125 73 l3 3 l-3 3 l3 3 l-3 3" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    <Line x1="88" y1="80" x2="113" y2="80" stroke="#2E8B57" strokeWidth="1.5" strokeDasharray="3,3" />
  </Svg>
);
