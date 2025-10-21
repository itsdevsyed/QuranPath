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
      {/* Top navbar */}
      <TopNavbar />

      {/* Scrollable content */}
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Continue Reading Card */}
        <ContinueReadingCard />

        {/* Mock content blocks */}
        {[...Array(3)].map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.mockContent,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  content: {
    padding: 12,
  },

  mockContent: {
    height: 200,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
});
