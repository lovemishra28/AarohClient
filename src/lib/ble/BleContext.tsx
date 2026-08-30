import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { bleService } from './BleService';
import { isStorableFrame, type ParsedFrame } from './FrameParser';
import type { BleConnectionState, BleFailure, DiscoveredDevice } from './types';

/**
 * The only thing the UI is allowed to see of the BLE stack.
 *
 * Note the absence of `react-native-ble-plx` types: the picker receives `DiscoveredDevice`
 * and `BleFailure`, both plain data. That is what keeps the radio's concerns out of the
 * components and makes the screens renderable in a test without a native module.
 */
interface BleContextValue {
  state: BleConnectionState;
  devices: DiscoveredDevice[];
  connectedDeviceId: string | null;
  /** Most recent *valid* reading, for live display while the farmer probes. */
  latestFrame: ParsedFrame | null;
  /** Every valid reading of the current session, in arrival order, for batch upload. */
  sessionFrames: ParsedFrame[];
  failure: BleFailure | null;
  isScanning: boolean;
  startScan: () => void;
  stopScan: () => void;
  connect: (deviceId: string) => Promise<void>;
  disconnect: () => Promise<void>;
  clearSession: () => void;
}

const BleContext = createContext<BleContextValue | null>(null);

/** How many readings one session keeps in memory before the oldest is dropped. */
const MAX_SESSION_FRAMES = 500;

export function BleProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BleConnectionState>('Disconnected');
  const [devices, setDevices] = useState<DiscoveredDevice[]>([]);
  const [connectedDeviceId, setConnectedDeviceId] = useState<string | null>(null);
  const [latestFrame, setLatestFrame] = useState<ParsedFrame | null>(null);
  const [sessionFrames, setSessionFrames] = useState<ParsedFrame[]>([]);
  const [failure, setFailure] = useState<BleFailure | null>(null);

  useEffect(() => {
    const listener = {
      onStateChange: (next: BleConnectionState) => {
        setState(next);
        // A fresh scan clears the previous failure so a resolved problem (Bluetooth was
        // off, now on) stops being displayed.
        if (next === 'Scanning') setFailure(null);
        // Read through the service rather than tracking it here: the device can also drop
        // on its own, and that path never goes through connect().
        setConnectedDeviceId(bleService.getConnectedDeviceId());
      },
      onDevicesChanged: (list: DiscoveredDevice[]) => {
        // The service owns dedup and ordering and hands over a finished list, so RSSI
        // updates on every repeat advertisement instead of being discarded as a duplicate.
        setDevices(list);
      },
      onFrameReceived: (frame: ParsedFrame) => {
        if (!isStorableFrame(frame)) return;
        setLatestFrame(frame);
        setSessionFrames((prev) =>
          prev.length >= MAX_SESSION_FRAMES
            ? [...prev.slice(prev.length - MAX_SESSION_FRAMES + 1), frame]
            : [...prev, frame],
        );
      },
      onFailure: (next: BleFailure) => setFailure(next),
    };

    bleService.registerListener(listener);
    return () => bleService.unregisterListener(listener);
  }, []);

  const startScan = useCallback(() => {
    setFailure(null);
    void bleService.startScan();
  }, []);

  const stopScan = useCallback(() => bleService.stopScan(), []);

  const connect = useCallback(async (deviceId: string) => {
    setFailure(null);
    await bleService.connect(deviceId);
  }, []);

  const disconnect = useCallback(async () => {
    await bleService.disconnect();
  }, []);

  const clearSession = useCallback(() => {
    setSessionFrames([]);
    setLatestFrame(null);
  }, []);

  const value = useMemo<BleContextValue>(
    () => ({
      state,
      devices,
      connectedDeviceId,
      latestFrame,
      sessionFrames,
      failure,
      isScanning: state === 'Scanning',
      startScan,
      stopScan,
      connect,
      disconnect,
      clearSession,
    }),
    [
      state,
      devices,
      connectedDeviceId,
      latestFrame,
      sessionFrames,
      failure,
      startScan,
      stopScan,
      connect,
      disconnect,
      clearSession,
    ],
  );

  return <BleContext.Provider value={value}>{children}</BleContext.Provider>;
}

export function useBle() {
  const ctx = useContext(BleContext);
  if (!ctx) throw new Error('useBle must be used within a BleProvider');
  return ctx;
}
