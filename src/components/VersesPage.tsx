import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useSurah } from '../hooks/useSurah';

import SurahHeader from './SurahHeader';
import AyahList from './AyahList';
import AppLoading from './AppLoading';

const VersesPage: React.FC = () => {
  const { appTheme } = useTheme();
  const route = useRoute<any>();
  const surahId = route.params?.surahId;
  const { surah, verses, loading } = useSurah(surahId);

  if (loading) return <AppLoading />;

  if (!surah) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: appTheme.colors.background }]}>
        <Text style={{ color: appTheme.colors.textPrimary }}>⚠️ Surah not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: appTheme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <SurahHeader
        name={surah.name_arabic}
        transliteration={surah.name_latin}
        number={surah.id}
        totalVerses={surah.total_verse}
        type="Meccan"
      />
      <View style={styles.textContainer}>
        <AyahList verses={verses} />
      </View>
    </ScrollView>
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
