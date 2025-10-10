// src/screens/MushafScreen.tsx
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import TabSegment from '../components/TabSegment';
import { useTheme } from '../context/ThemeContext';
import SurahList from '../components/SurahList'; // Import the Surah list component

const MushafScreen: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Navbar */}
      <TopNavbar />

      {/* Tabs */}
      <TabSegment />

      {/* Scrollable Surah list */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SurahList />
      </ScrollView>
    </View>
  );
};

export default MushafScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 120 }, // Padding bottom to avoid BottomNavbar overlap
});
