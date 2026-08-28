import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import { AnalysisScreen } from '@/components/analysis-screen';
import { RecommendationScreen } from '@/components/recommendation-screen';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { useTheme } from '@/hooks/use-theme';
import { MaxContentWidth } from '@/constants/theme';

const metricCards = [
  { label: 'Soil Moisture', value: '26.6%', unit: 'Moisture', icon: '💧', tint: '#DDF5E5' },
  { label: 'Temperature', value: '27.5°C', unit: 'Air Temp', icon: '🌡️', tint: '#E9F2FF' },
  { label: 'Electrical Conductivity', value: '21.8', unit: 'dS/m', icon: '⚡', tint: '#E9F9F0' },
  { label: 'pH', value: '6.45', unit: 'pH level', icon: '🧪', tint: '#F1F7ED' },
  { label: 'Nitrogen (N)', value: '48.2', unit: 'mg/kg', icon: 'N', tint: '#E9F7EF' },
  { label: 'Phosphorus (P)', value: '38.2', unit: 'mg/kg', icon: 'P', tint: '#EEF3FF' },
  { label: 'Potassium (K)', value: '41.4', unit: 'mg/kg', icon: 'K', tint: '#FFF5E3' },
];

const navItems = [
  { label: 'Home', active: true, icon: '⌂' },
  { label: 'Analysis', active: false, icon: '◫' },
  { label: 'Recommendation', active: false, icon: '✦' },
  { label: 'Profile', active: false, icon: '◔' },
];

export function HomeScreen() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        {/* ─── Topbar ─── */}
        <View style={[styles.topbar, { backgroundColor: theme.background }]}>
          <TouchableOpacity style={[styles.menuButton, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]} activeOpacity={0.8}>
            <Text style={[styles.menuIcon, { color: theme.text }]}>☰</Text>
          </TouchableOpacity>

          <View style={styles.brandWrap}>
            {/* Using our centralized Brand Logo */}
            <BrandLogo size="md" />
          </View>

          <View style={[styles.statusWrap, { backgroundColor: '#EAF6ED', borderColor: '#29B36B' }]}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Connected</Text>
          </View>

          <View style={[styles.avatar, { backgroundColor: '#1B3C18' }]}>
            <Text style={styles.avatarText}>A</Text>
          </View>
        </View>

        {activeTab === 'Home' ? (
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* ─── Field Header ─── */}
            <View style={styles.fieldHeader}>
              <Text style={[styles.fieldTitle, { color: theme.text }]}>Field 1</Text>
              <TouchableOpacity style={[styles.switchButton, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]} activeOpacity={0.8}>
                <Text style={[styles.switchText, { color: theme.text }]}>North Field</Text>
              </TouchableOpacity>
            </View>

            {/* ─── Map Card ─── */}
            <View style={[styles.mapCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
              <View style={styles.mapGrid}>
                <View style={[styles.mapShape, styles.shapeGreen]} />
                <View style={[styles.mapShape, styles.shapeYellow]} />
                <View style={[styles.mapShape, styles.shapeRed]} />
                <View style={[styles.mapShape, styles.shapeGreenSoft]} />
              </View>
              <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#7EC86B' }]} />
                  <Text style={[styles.legendText, { color: theme.textSecondary }]}>Least Fertile</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#F5D95B' }]} />
                  <Text style={[styles.legendText, { color: theme.textSecondary }]}>Moderate Fertility</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#E25A43' }]} />
                  <Text style={[styles.legendText, { color: theme.textSecondary }]}>Most Fertile</Text>
                </View>
              </View>
            </View>

            {/* ─── Metric Cards Grid ─── */}
            <View style={styles.cardsGrid}>
              {metricCards.map((card) => (
                <View key={card.label} style={[styles.metricCard, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
                  <View style={styles.cardTopRow}>
                    <View style={[styles.iconWrap, { backgroundColor: card.tint }]}>
                      <Text style={styles.iconText}>{card.icon}</Text>
                    </View>
                    <View style={[styles.cardBadge, { backgroundColor: theme.border }]}>
                      <Text style={[styles.badgeText, { color: theme.textSecondary }]}>i</Text>
                    </View>
                  </View>

                  <Text style={[styles.cardLabel, { color: theme.textSecondary }]}>{card.label}</Text>
                  <Text style={[styles.cardValue, { color: theme.text }]}>{card.value}</Text>
                  <Text style={[styles.cardUnit, { color: theme.textSecondary }]}>{card.unit}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        ) : activeTab === 'Analysis' ? (
          <AnalysisScreen />
        ) : activeTab === 'Recommendation' ? (
          <RecommendationScreen />
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: theme.text, fontSize: 18, fontWeight: '700' }}>Profile Screen (WIP)</Text>
          </View>
        )}

        {/* ─── Bottom Nav ─── */}
        <View style={styles.bottomNavContainer}>
          <View style={styles.bottomNav}>
            {navItems.map((item) => (
              <TouchableOpacity key={item.label} style={styles.navItem} activeOpacity={0.8} onPress={() => setActiveTab(item.label)}>
                <Text style={[styles.navIcon, activeTab === item.label && styles.navIconActive]}>{item.icon}</Text>
                <Text style={[styles.navText, activeTab === item.label && styles.navTextActive]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
} 

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },
  
  // ── Topbar ──
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'web' ? 16 : 10,
    paddingBottom: 12,
    gap: 8,
    zIndex: 10,
  },
  menuButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
  },
  menuIcon: {
    fontSize: 18,
    fontWeight: '700',
  },
  brandWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
  },
  statusWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#29B36B',
    marginRight: 6,
  },
  statusText: {
    fontSize: 11,
    color: '#1b7a47',
    fontWeight: '700',
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },

  // ── Scroll Content ──
  scrollContent: {
    padding: 16,
    paddingBottom: 120, // space for bottom nav
  },

  // ── Field Header ──
  fieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  fieldTitle: {
    fontSize: 24,
    fontWeight: '800',
  },
  switchButton: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  switchText: {
    fontSize: 12,
    fontWeight: '700',
  },

  // ── Map Card ──
  mapCard: {
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: { elevation: 2 },
      web: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
    }),
  },
  mapGrid: {
    height: 180,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#d7efbb',
    position: 'relative',
  },
  mapShape: {
    position: 'absolute',
    borderRadius: 100,
  },
  shapeGreen: {
    width: 200,
    height: 200,
    backgroundColor: '#A9D76A',
    left: -20,
    top: 18,
    transform: [{ rotate: '-10deg' }],
  },
  shapeYellow: {
    width: 200,
    height: 180,
    backgroundColor: '#F6D55A',
    left: 60,
    top: -10,
    transform: [{ rotate: '20deg' }],
  },
  shapeRed: {
    width: 170,
    height: 170,
    backgroundColor: '#D94D3C',
    right: -18,
    top: 20,
    transform: [{ rotate: '18deg' }],
  },
  shapeGreenSoft: {
    width: 130,
    height: 110,
    backgroundColor: '#7ACB6D',
    left: 110,
    bottom: -12,
    transform: [{ rotate: '-12deg' }],
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    gap: 8,
    flexWrap: 'wrap',
    paddingHorizontal: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 11,
    fontWeight: '600',
  },

  // ── Metric Cards ──
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  metricCard: {
    width: '31%',
    minHeight: 120,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: { elevation: 1 },
      web: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
    }),
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B3C18',
  },
  cardBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 2,
  },
  cardUnit: {
    fontSize: 10,
    fontWeight: '600',
  },

  // ── Bottom Nav ──
  bottomNavContainer: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  bottomNav: {
    backgroundColor: '#1B3C18', // Consistent dark green theme
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 400,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 14,
      },
      android: { elevation: 8 },
      web: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 14,
      },
    }),
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    gap: 4,
  },
  navIcon: {
    fontSize: 18,
    color: '#8CA696',
  },
  navIconActive: {
    color: '#FFFFFF',
  },
  navText: {
    fontSize: 10,
    color: '#8CA696',
    fontWeight: '700',
  },
  navTextActive: {
    color: '#FFFFFF',
  },
});
