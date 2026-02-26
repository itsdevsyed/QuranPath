import React from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useSurahPaged } from '../hooks/useSurahPaged'; // The paginated hook

import SurahHeader from './SurahHeader';
import AyahList from './AyahList';
import AppLoading from './AppLoading';

const VersesPage: React.FC = () => {
  const { appTheme } = useTheme();
  const route = useRoute<any>();
  const surahId = route.params?.surahId;

  // Use the high-performance paged hook
  const { surah, verses, loading, loadMore, hasMore } = useSurahPaged(surahId);

  if (loading && verses.length === 0) return <AppLoading />;

  if (!surah && !loading) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: appTheme.colors.background }]}>
        <Text style={{ color: appTheme.colors.textPrimary }}>⚠️ Surah not found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={[styles.container, { backgroundColor: appTheme.colors.background }]}
      data={[{ type: 'ayah-list' }]} // We use a dummy single item to render AyahList once
      keyExtractor={(item) => item.type}
      showsVerticalScrollIndicator={false}

      // We put the Header here so it stays at the top
      ListHeaderComponent={
        <SurahHeader
          name={surah.name_arabic}
          nameLatin={surah.name_latin}
          number={surah.id}
          totalVerses={surah.total_verse}
          type={surah.location || "Meccan"}
        />
      }

      // We render your AyahList component here
      renderItem={() => (
        <View style={styles.textContainer}>
          <AyahList verses={verses} />
        </View>
      )}

      // Pagination Logic
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}

      ListFooterComponent={() =>
        hasMore ? (
          <ActivityIndicator
            size="small"
            color={appTheme.colors.primaryAccent}
            style={{ marginVertical: 30 }}
          />
        ) : <View style={{ height: 50 }} />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VersesPage;
