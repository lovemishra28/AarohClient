import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const crops = [
  { name: 'Wheat', score: '92%', detail: 'Strong match for your soil and current climate', color: '#2E8B57' },
  { name: 'Mustard', score: '86%', detail: 'Good fit with moderate water requirement', color: '#D5A928' },
  { name: 'Chickpea', score: '81%', detail: 'Suitable for the field nutrient profile', color: '#6CA85B' },
];

export function RecommendationScreen() {
  const [section, setSection] = useState<'crops' | 'fertilizer'>('crops');

  return (
    <View style={styles.screen}>
      <View style={styles.headingRow}>
        <View>
          <Text style={styles.eyebrow}>AI GUIDANCE</Text>
          <Text style={styles.title}>Recommendations</Text>
          <Text style={styles.subtitle}>North Field  •  Based on your latest soil scan</Text>
        </View>
        <View style={styles.aiBadge}><Text style={styles.aiBadgeText}>AI</Text></View>
      </View>

      <View style={styles.contextCard}>
        <View><Text style={styles.contextLabel}>Field condition</Text><Text style={styles.contextValue}>Good for a winter crop</Text></View>
        <View style={styles.contextPill}><Text style={styles.contextPillText}>7 inputs used</Text></View>
      </View>

      <View style={styles.segmentedControl}>
        <TouchableOpacity style={[styles.segment, section === 'crops' && styles.segmentActive]} onPress={() => setSection('crops')}><Text style={[styles.segmentText, section === 'crops' && styles.segmentTextActive]}>Crop recommendation</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.segment, section === 'fertilizer' && styles.segmentActive]} onPress={() => setSection('fertilizer')}><Text style={[styles.segmentText, section === 'fertilizer' && styles.segmentTextActive]}>Fertilizer plan</Text></TouchableOpacity>
      </View>

      {section === 'crops' ? (
        <View style={styles.panel}>
          <View style={styles.panelHeader}><View><Text style={styles.panelTitle}>Best crops for this field</Text><Text style={styles.panelSubtitle}>Ranked by soil, weather, and regional suitability</Text></View><Text style={styles.refresh}>↻</Text></View>
          {crops.map((crop, index) => (
            <View key={crop.name} style={styles.cropRow}>
              <View style={[styles.cropRank, { backgroundColor: index === 0 ? '#E5F3E8' : '#F2F5F0' }]}><Text style={[styles.cropRankText, { color: crop.color }]}>{index + 1}</Text></View>
              <View style={styles.cropCopy}><Text style={styles.cropName}>{crop.name}</Text><Text style={styles.cropDetail}>{crop.detail}</Text></View>
              <Text style={[styles.cropScore, { color: crop.color }]}>{crop.score}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.voiceButton} activeOpacity={0.8}><Text style={styles.voiceButtonText}>◉  Tell us what you want to grow</Text></TouchableOpacity>
        </View>
      ) : (
        <View style={styles.panel}>
          <View style={styles.panelHeader}><View><Text style={styles.panelTitle}>Fertilizer plan</Text><Text style={styles.panelSubtitle}>A precise plan for the current nutrient balance</Text></View><Text style={styles.refresh}>↻</Text></View>
          <View style={styles.planCard}><View><Text style={styles.planLabel}>Recommended fertilizer</Text><Text style={styles.planName}>NPK 19:19:19</Text><Text style={styles.planDescription}>Balanced application for the next feeding</Text></View><Text style={styles.planAmount}>42 kg<Text style={styles.planUnit}> / acre</Text></Text></View>
          <View style={styles.fertilizerGrid}><View><Text style={styles.fertilizerLabel}>Nitrogen</Text><Text style={styles.fertilizerValue}>48.2 mg/kg</Text><Text style={styles.fertilizerStatus}>Adequate</Text></View><View><Text style={styles.fertilizerLabel}>Phosphorus</Text><Text style={styles.fertilizerValue}>38.2 mg/kg</Text><Text style={styles.fertilizerStatus}>Adequate</Text></View><View><Text style={styles.fertilizerLabel}>Potassium</Text><Text style={styles.fertilizerValue}>41.4 mg/kg</Text><Text style={styles.fertilizerWarning}>Needs attention</Text></View></View>
          <View style={styles.tip}><Text style={styles.tipIcon}>i</Text><Text style={styles.tipText}>Apply after light irrigation and follow the seller label. Re-scan before the next crop cycle.</Text></View>
        </View>
      )}

      <View style={styles.disclaimer}><Text style={styles.disclaimerText}>Recommendations are based on current readings and local weather context.</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { width: '100%', maxWidth: 760, alignSelf: 'center', paddingHorizontal: 16, paddingBottom: 120 },
  headingRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 },
  eyebrow: { color: '#2E8B57', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  title: { color: '#183329', fontSize: 28, fontWeight: '800', marginTop: 3 },
  subtitle: { color: '#687A70', fontSize: 11, marginTop: 4 },
  aiBadge: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#194C2D', alignItems: 'center', justifyContent: 'center' },
  aiBadgeText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  contextCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#EAF6ED', borderRadius: 12, padding: 13, marginBottom: 12 },
  contextLabel: { color: '#5F7868', fontSize: 10, fontWeight: '700' },
  contextValue: { color: '#194C2D', fontSize: 14, fontWeight: '800', marginTop: 3 },
  contextPill: { backgroundColor: '#FFFFFF', borderRadius: 12, paddingHorizontal: 9, paddingVertical: 5 },
  contextPillText: { color: '#2E8B57', fontSize: 9, fontWeight: '700' },
  segmentedControl: { flexDirection: 'row', backgroundColor: '#E8EEE9', borderRadius: 10, padding: 3, marginBottom: 12 },
  segment: { flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: 8 },
  segmentActive: { backgroundColor: '#FFFFFF' },
  segmentText: { color: '#718178', fontSize: 10, fontWeight: '700' },
  segmentTextActive: { color: '#194C2D' },
  panel: { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#D8E4DA', padding: 14 },
  panelHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  panelTitle: { color: '#183329', fontSize: 14, fontWeight: '800' },
  panelSubtitle: { color: '#7A8980', fontSize: 10, marginTop: 3 },
  refresh: { color: '#2E8B57', fontSize: 20 },
  cropRow: { flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#EEF3EF', paddingVertical: 11 },
  cropRank: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  cropRankText: { fontSize: 12, fontWeight: '800' },
  cropCopy: { flex: 1 },
  cropName: { color: '#294537', fontSize: 12, fontWeight: '800' },
  cropDetail: { color: '#7A8980', fontSize: 9, marginTop: 2 },
  cropScore: { fontSize: 13, fontWeight: '800' },
  voiceButton: { alignItems: 'center', borderWidth: 1, borderColor: '#BBD8C1', borderRadius: 18, paddingVertical: 9, marginTop: 8 },
  voiceButtonText: { color: '#2E8B57', fontSize: 10, fontWeight: '700' },
  planCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#EAF6ED', borderRadius: 10, padding: 13, marginTop: 5, marginBottom: 12 },
  planLabel: { color: '#5F7868', fontSize: 9, fontWeight: '700' },
  planName: { color: '#194C2D', fontSize: 20, fontWeight: '800', marginTop: 3 },
  planDescription: { color: '#6E8275', fontSize: 9, marginTop: 2 },
  planAmount: { color: '#194C2D', fontSize: 17, fontWeight: '800' },
  planUnit: { fontSize: 9, fontWeight: '600' },
  fertilizerGrid: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  fertilizerLabel: { color: '#708077', fontSize: 9 },
  fertilizerValue: { color: '#294537', fontSize: 10, fontWeight: '800', marginTop: 4 },
  fertilizerStatus: { color: '#2E8B57', fontSize: 8, marginTop: 3 },
  fertilizerWarning: { color: '#C28716', fontSize: 8, marginTop: 3 },
  tip: { flexDirection: 'row', backgroundColor: '#FFF8E8', borderRadius: 8, padding: 9, marginTop: 12 },
  tipIcon: { color: '#FFFFFF', backgroundColor: '#D8A91D', width: 15, height: 15, borderRadius: 8, textAlign: 'center', fontSize: 10, fontWeight: '800', marginRight: 7 },
  tipText: { flex: 1, color: '#816D30', fontSize: 9, lineHeight: 13 },
  disclaimer: { alignItems: 'center', marginTop: 12 },
  disclaimerText: { color: '#8A968E', fontSize: 9 },
});
