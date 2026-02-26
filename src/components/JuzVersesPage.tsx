import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useJuzVersesPaged } from '../hooks/useJuzVersesPaged';

import AppLoading from './AppLoading';
import AyahList from './AyahList';
import JuzHeader from './JuzHeader';
import SurahHeader from './SurahHeader';

export default function JuzVersesPage() {
  const route = useRoute<any>();
  const { juzNumber, title } = route.params;
  const { appTheme } = useTheme();

  // Using the new paged logic
  const { surahGroups, loading, loadMore, hasMore } = useJuzVersesPaged(juzNumber);

  if (loading && surahGroups.length === 0) return <AppLoading />;

  return (
    <View style={[styles.container, { backgroundColor: appTheme.colors.background }]}>
      <FlatList
        data={surahGroups}
        keyExtractor={(item) => `surah-group-${item.surahId}`}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}

        // 🔹 Your Original Juz Header
        ListHeaderComponent={<JuzHeader juzNumber={juzNumber} title={title} />}

        // 🔹 Your Original Surah Section Design
        renderItem={({ item: group }) => (
          <View style={styles.surahSection}>
            <SurahHeader
              name={group.surahName}
              number={group.surahId}
              totalVerses={group.totalVerses}
              type={group.type === "Meccan" || group.type === "Medinan" ? group.type : undefined}
              showBismillah={group.showBismillah}
            />
            <View style={styles.textContainer}>
              <AyahList verses={group.verses} />
            </View>
          </View>
        )}

        // 🔹 Pagination Logic
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}

        ListFooterComponent={() =>
          hasMore ? (
            <ActivityIndicator size="small" color={appTheme.colors.primaryAccent} style={{ margin: 20 }} />
          ) : <View style={{ height: 50 }} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  surahSection: {
    marginBottom: 32,
  },
  textContainer: {
    paddingHorizontal: 0,
  },
});
