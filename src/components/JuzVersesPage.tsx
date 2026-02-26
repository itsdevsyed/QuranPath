import { useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useJuzVerses } from '../hooks/useJuzVerses';

import AppLoading from './AppLoading';
import AyahList from './AyahList';
import JuzHeader from './JuzHeader';
import SurahHeader from './SurahHeader';
export default function JuzVersesPage() {
  const route = useRoute<any>();
  const { juzNumber, title } = route.params;

  const { appTheme } = useTheme();
  const { data: surahGroups, loading } = useJuzVerses(juzNumber);

  if (loading) return <AppLoading />;

  if (!surahGroups || !surahGroups.length) {
    return (
      <View style={[styles.center, { backgroundColor: appTheme.colors.background }]}>
        <Text style={{ color: appTheme.colors.textPrimary }}>
          No verses found
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: appTheme.colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 🔹 Juz Header */}
        <JuzHeader juzNumber={juzNumber} title={title} />

        <View style={styles.contentWrapper}>
          {surahGroups.map((group) => (
            <View key={group.surahId} style={styles.surahSection}>

              {/* 🔹 Proper Surah Header when new surah starts */}
              <SurahHeader
                name={group.surahName}
                number={group.surahId}
                totalVerses={group.totalVerses}
                type={group.type === "Meccan" || group.type === "Medinan" ? group.type : undefined}
                showBismillah={group.showBismillah}
              />

              {/* 🔹 Ayahs */}
              <View style={styles.textContainer}>
                <AyahList verses={group.verses} />
              </View>

            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {},
  surahSection: {
    marginBottom: 32, // better spacing between surahs
  },
  textContainer: {
    paddingHorizontal: 0,
  },
});
