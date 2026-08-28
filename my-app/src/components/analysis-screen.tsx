import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { MaxContentWidth } from '@/constants/theme';

const trendData = [
  { label: 'N', value: 72, color: '#2E8B57' },
  { label: 'P', value: 58, color: '#4E9B67' },
  { label: 'K', value: 66, color: '#77B85B' },
  { label: 'pH', value: 48, color: '#D7B84A' },
];

export function AnalysisScreen() {
  const theme = useTheme();

  return (
    <View style={styles.screen}>
      <View style={styles.headingRow}>
        <View>
          <Text style={styles.eyebrow}>FIELD INSIGHTS</Text>
          <Text style={[styles.title, { color: theme.text }]}>Soil Analysis</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>North Field  •  Latest scan: 16/07/2026</Text>
        </View>
        <TouchableOpacity style={[styles.scanButton, { backgroundColor: '#1B3C18' }]} activeOpacity={0.8}>
          <Text style={styles.scanButtonText}>↻  New scan</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>Overall health</Text>
          <Text style={[styles.summaryValue, { color: theme.text }]}>Good</Text>
          <Text style={[styles.summaryHint, { color: theme.textSecondary }]}>Based on 8 readings</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
          <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>Readings mapped</Text>
          <Text style={[styles.summaryValue, { color: theme.text }]}>8</Text>
          <Text style={[styles.summaryHint, { color: theme.textSecondary }]}>Across North Field</Text>
        </View>
      </View>

      <View style={[styles.panel, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
        <View style={styles.panelHeader}>
          <View>
            <Text style={[styles.panelTitle, { color: theme.text }]}>Nutrient balance</Text>
            <Text style={[styles.panelSubtitle, { color: theme.textSecondary }]}>Current levels compared with ideal field range</Text>
          </View>
          <Text style={[styles.period, { backgroundColor: theme.border, color: theme.text }]}>Current</Text>
        </View>
        <View style={[styles.chart, { borderBottomColor: theme.border }]}>
          <View style={[styles.targetLine, { borderTopColor: theme.border }]} />
          {trendData.map((item) => (
            <View key={item.label} style={styles.barColumn}>
              <View style={[styles.barTrack, { backgroundColor: theme.background }]}>
                <View style={[styles.bar, { height: `${item.value}%`, backgroundColor: item.color }]} />
              </View>
              <Text style={[styles.barValue, { color: theme.text }]}>
                {item.label === 'pH' ? '6.45' : item.label === 'N' ? '48.2' : item.label === 'P' ? '38.2' : '41.4'}
              </Text>
              <Text style={[styles.barLabel, { color: theme.textSecondary }]}>{item.label}</Text>
            </View>
          ))}
        </View>
        <View style={styles.legend}>
          <View style={[styles.legendMark, { borderTopColor: theme.border }]} />
          <Text style={[styles.legendText, { color: theme.textSecondary }]}>Ideal range threshold</Text>
        </View>
      </View>

      <View style={[styles.panel, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
        <View style={styles.panelHeader}>
          <View>
            <Text style={[styles.panelTitle, { color: theme.text }]}>Field condition</Text>
            <Text style={[styles.panelSubtitle, { color: theme.textSecondary }]}>What the latest readings tell us</Text>
          </View>
          <Text style={styles.zoneCount}>3 zones</Text>
        </View>
        
        <View style={[styles.zoneRow, { borderTopColor: theme.border }]}>
          <View style={[styles.zoneDot, { backgroundColor: '#72B957' }]} />
          <View style={styles.zoneCopy}>
            <Text style={[styles.zoneTitle, { color: theme.text }]}>Most fertile</Text>
            <Text style={[styles.zoneDescription, { color: theme.textSecondary }]}>Strong nutrient availability in the east zone</Text>
          </View>
          <Text style={[styles.zonePercent, { color: theme.text }]}>42%</Text>
        </View>
        
        <View style={[styles.zoneRow, { borderTopColor: theme.border }]}>
          <View style={[styles.zoneDot, { backgroundColor: '#F1CF49' }]} />
          <View style={styles.zoneCopy}>
            <Text style={[styles.zoneTitle, { color: theme.text }]}>Moderate fertility</Text>
            <Text style={[styles.zoneDescription, { color: theme.textSecondary }]}>Suitable for most recommended crops</Text>
          </View>
          <Text style={[styles.zonePercent, { color: theme.text }]}>38%</Text>
        </View>
        
        <View style={[styles.zoneRow, { borderTopColor: theme.border }]}>
          <View style={[styles.zoneDot, { backgroundColor: '#E14B3D' }]} />
          <View style={styles.zoneCopy}>
            <Text style={[styles.zoneTitle, { color: theme.text }]}>Needs attention</Text>
            <Text style={[styles.zoneDescription, { color: theme.textSecondary }]}>Review potassium before the next crop</Text>
          </View>
          <Text style={[styles.zonePercent, { color: theme.text }]}>20%</Text>
        </View>
      </View>

      <View style={styles.alertPanel}>
        <Text style={styles.alertIcon}>!</Text>
        <View style={styles.alertCopy}>
          <Text style={styles.alertTitle}>One reading needs attention</Text>
          <Text style={styles.alertText}>Potassium is lower in the south-west zone. Check the recommendation tab for a precise fertilizer plan.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { 
    width: '100%', 
    maxWidth: MaxContentWidth, 
    alignSelf: 'center', 
    paddingHorizontal: 16, 
    paddingBottom: 120,
    paddingTop: 16,
  },
  headingRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16 },
  eyebrow: { color: '#2E8B57', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  title: { fontSize: 28, fontWeight: '800', marginTop: 3 },
  subtitle: { fontSize: 11, marginTop: 4 },
  scanButton: { borderRadius: 18, paddingHorizontal: 13, paddingVertical: 9 },
  scanButtonText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  
  summaryRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  summaryCard: { flex: 1, borderRadius: 16, borderWidth: 1, padding: 14 },
  summaryLabel: { fontSize: 11, fontWeight: '700' },
  summaryValue: { fontSize: 24, fontWeight: '800', marginTop: 4 },
  summaryHint: { fontSize: 10, marginTop: 2 },
  
  panel: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 12 },
  panelHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 },
  panelTitle: { fontSize: 15, fontWeight: '800' },
  panelSubtitle: { fontSize: 11, marginTop: 3 },
  period: { fontSize: 10, fontWeight: '700', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
  
  chart: { height: 160, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', position: 'relative', borderBottomWidth: 1 },
  targetLine: { position: 'absolute', left: 0, right: 0, bottom: '65%', borderTopWidth: 1, borderStyle: 'dashed' },
  barColumn: { height: '100%', alignItems: 'center', justifyContent: 'flex-end', width: '18%' },
  barTrack: { height: '82%', width: 26, justifyContent: 'flex-end', borderRadius: 8, overflow: 'hidden' },
  bar: { width: '100%', borderRadius: 8 },
  barValue: { fontSize: 11, fontWeight: '800', marginTop: 8 },
  barLabel: { fontSize: 11, marginTop: 4 },
  
  legend: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  legendMark: { width: 16, borderTopWidth: 1, borderStyle: 'dashed', marginRight: 6 },
  legendText: { fontSize: 10 },
  
  zoneCount: { color: '#2E8B57', fontSize: 11, fontWeight: '700' },
  zoneRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderTopWidth: 1 },
  zoneDot: { width: 10, height: 10, borderRadius: 5, marginRight: 10 },
  zoneCopy: { flex: 1 },
  zoneTitle: { fontSize: 12, fontWeight: '800' },
  zoneDescription: { fontSize: 10, marginTop: 3 },
  zonePercent: { fontSize: 12, fontWeight: '800' },
  
  alertPanel: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#FFF8E8', borderRadius: 16, borderWidth: 1, borderColor: '#F0D88B', padding: 14, marginBottom: 20 },
  alertIcon: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#D8A91D', color: '#FFFFFF', textAlign: 'center', fontSize: 14, fontWeight: '800', marginRight: 10 },
  alertCopy: { flex: 1 },
  alertTitle: { color: '#624E16', fontSize: 12, fontWeight: '800' },
  alertText: { color: '#816D30', fontSize: 10, lineHeight: 14, marginTop: 4 },
});
