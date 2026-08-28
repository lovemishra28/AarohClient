import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { AnalysisScreen } from '@/components/analysis-screen';
import { RecommendationScreen } from '@/components/recommendation-screen';

const metricCards = [
  { label: 'Soil Moisture', value: '26.6%', unit: 'Volumetric', iconIndex: 0, tint: '#FFFFFF' },
  { label: 'Temperature', value: '27.5°C', unit: 'Air Temperature', iconIndex: 1, tint: '#FFFFFF' },
  { label: 'Electrical Conductivity', value: '1.28', unit: 'EC (dS/m)', iconIndex: 2, tint: '#FFFFFF' },
  { label: 'pH', value: '6.45', unit: 'pH Level', iconIndex: 3, tint: '#FFFFFF' },
  { label: 'Nitrogen (N)', value: '48.2', unit: 'mg/kg', iconIndex: 4, tint: '#FFFFFF' },
  { label: 'Phosphorus (P)', value: '38.2', unit: 'mg/kg', iconIndex: 5, tint: '#FFFFFF' },
  { label: 'Potassium (K)', value: '41.4', unit: 'mg/kg', iconIndex: 6, tint: '#FFFFFF' },
];

const navItems = [
  { label: 'Home', active: true, icon: '⌂' },
  { label: 'Analysis', active: false, icon: '◫' },
  { label: 'Recommendation', active: false, icon: '✦' },
  { label: 'Profile', active: false, icon: '◔' },
];

export default function AppTabs() {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topbar}>
          <TouchableOpacity style={styles.menuButton} activeOpacity={0.8}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>

          <View style={styles.brandWrap}>
            <Text style={styles.brandAaroh}>Aaroh</Text>
          </View>

          <View style={styles.statusWrap}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Connected</Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
        </View>

        {activeTab === 'Home' ? <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.fieldHeader}>
            <Text style={styles.fieldTitle}>Field 1</Text>
            <TouchableOpacity style={styles.switchButton} activeOpacity={0.8}>
              <Text style={styles.switchText}>North Field</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dateRow}>
            <Text style={styles.dateText}>▣ 16/07/2026</Text>
            <Text style={styles.updatedText}>⌁ Last Updated: Just now</Text>
          </View>

          <View style={styles.mapCard}>
            <View style={styles.mapGrid}>
              <View style={[styles.mapShape, styles.shapeGreen]} />
              <View style={[styles.mapShape, styles.shapeYellow]} />
              <View style={[styles.mapShape, styles.shapeRed]} />
              <View style={[styles.mapShape, styles.shapeGreenSoft]} />
            </View>
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#7EC86B' }]} />
                <Text style={styles.legendText}>Least Fertile</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#F5D95B' }]} />
                <Text style={styles.legendText}>Moderate Fertility</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#E25A43' }]} />
                <Text style={styles.legendText}>Most Fertile</Text>
              </View>
            </View>
          </View>

          <View style={styles.cardsGrid}>
            {metricCards.map((card, index) => (
              <View
                key={card.label}
                style={[styles.metricCard, index < 4 ? styles.metricCardQuarter : styles.metricCardThird, { backgroundColor: card.tint }]}
              >
                <View style={styles.cardTopRow}>
                  <View style={styles.iconWrap}>
                    <Image
                      source={require('@/assets/images/Home screen icon.png')}
                      style={[styles.spriteImage, { transform: [{ translateX: [-11, -80, -149, -218, -12, -68, -123][card.iconIndex] }, { translateY: card.iconIndex < 4 ? -34 : -116 }] }]}
                      contentFit="fill"
                    />
                  </View>
                  <View style={styles.cardBadge}>
                    <Text style={styles.badgeText}>i</Text>
                  </View>
                </View>

                <Text style={styles.cardLabel}>{card.label}</Text>
                <Text style={styles.cardValue}>{card.value}</Text>
                <Text style={styles.cardUnit}>{card.unit}</Text>
              </View>
            ))}
          </View>
        </ScrollView> : activeTab === 'Analysis' ? <AnalysisScreen /> : <RecommendationScreen />}

        <View style={styles.bottomNav}>
          {navItems.map((item) => (
            <TouchableOpacity key={item.label} style={styles.navItem} activeOpacity={0.8} onPress={() => setActiveTab(item.label)}>
              <Text style={[styles.navIcon, activeTab === item.label && styles.navIconActive]}>{item.icon}</Text>
              <Text style={[styles.navText, activeTab === item.label && styles.navTextActive]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#edf0ea',
  },
  container: {
    flex: 1,
    backgroundColor: '#edf0ea',
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    gap: 8,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  menuIcon: {
    fontSize: 20,
    color: '#1d2a22',
    fontWeight: '700',
  },
  brandWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandAaroh: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1d2a22',
  },
  statusWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF6ED',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
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
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1a3027',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
  },
  fieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateText: {
    color: '#738078',
    fontSize: 10,
  },
  updatedText: {
    color: '#68766D',
    backgroundColor: '#F0F2EF',
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 5,
    fontSize: 9,
  },
  fieldTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1c2a22',
  },
  switchButton: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  switchText: {
    fontSize: 12,
    color: '#234532',
    fontWeight: '700',
  },
  mapCard: {
    backgroundColor: '#EAF4ED',
    borderRadius: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: '#d7e4d8',
    marginBottom: 18,
  },
  mapGrid: {
    height: 160,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#d7efbb',
    position: 'relative',
  },
  mapShape: {
    position: 'absolute',
    borderRadius: 50,
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
    marginTop: 12,
    gap: 8,
    flexWrap: 'wrap',
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
    fontSize: 10,
    color: '#34513d',
    fontWeight: '600',
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  metricCard: {
    minHeight: 96,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#dfe9df',
  },
  metricCardQuarter: {
    width: '23.5%',
  },
  metricCardThird: {
    width: '31.5%',
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EFF7ED',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  spriteImage: {
    position: 'absolute',
    width: 320,
    height: 178,
    maxWidth: 'none',
  },
  iconText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1d2a22',
  },
  cardBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(15, 68, 51, 0.10)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 9,
    color: '#1d2a22',
    fontWeight: '700',
  },
  cardLabel: {
    color: '#375548',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardValue: {
    color: '#183329',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },
  cardUnit: {
    color: '#587466',
    fontSize: 8,
    fontWeight: '600',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#0A1713',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    gap: 4,
  },
  navIcon: {
    fontSize: 16,
    color: '#dceae1',
    opacity: 0.7,
  },
  navIconActive: {
    color: '#fff',
    opacity: 1,
  },
  navText: {
    fontSize: 9,
    color: '#dceae1',
    opacity: 0.7,
    fontWeight: '600',
  },
  navTextActive: {
    color: '#fff',
    opacity: 1,
  },
});
