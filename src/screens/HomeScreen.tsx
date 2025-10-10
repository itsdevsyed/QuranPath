// src/screens/HomeScreen.tsx
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import ContinueReadingCard from '../components/ContinueReadingCard';
import { useTheme } from '../context/ThemeContext';

const HomeScreen: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TopNavbar />
      <ScrollView contentContainerStyle={styles.content}>
        <ContinueReadingCard />
        <View style={[styles.mockContent, { backgroundColor: colors.card, borderColor: colors.border }]} />
        <View style={[styles.mockContent, { backgroundColor: colors.card, borderColor: colors.border }]} />
        <View style={[styles.mockContent, { backgroundColor: colors.card, borderColor: colors.border }]} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 12, paddingBottom: 120 },
  mockContent: { height: 200, borderWidth: 1, borderRadius: 8, marginBottom: 16 },
});
