import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import SurahHeader from '../components/SurahHeader';
import AyahText from '../components/AyahText';
import { useTheme } from '../context/ThemeContext';
import { fetchSurahById, fetchVersesBySurah } from '../db/queries';

type RootStackParamList = {
  VersesPage: {
    surahId: number;
    title?: string;
  };
};

// Convert integer to Arabic-Indic digits
const toArabicIndic = (n: number | string | undefined) => {
  if (n == null) return '';
  const s = String(n);
  const map = ['\u0660', '\u0661', '\u0662', '\u0663', '\u0664', '\u0665', '\u0666', '\u0667', '\u0668', '\u0669'];
  return s.split('').map(ch => (/\d/.test(ch) ? map[Number(ch)] : ch)).join('');
};

// Right-to-left isolate wrapper for ayah markers
const wrapAyahMarker = (num: number) => `${toArabicIndic(num)}`;

const VersesPage: React.FC = () => {
  const { appTheme } = useTheme();
  const route = useRoute<any>();
  const surahId = route.params?.surahId;

  const [surah, setSurah] = useState<any | null>(null);
  const [verses, setVerses] = useState<any[]>([]);

  useEffect(() => {
    const loadSurah = async () => {
      try {
        const s = await fetchSurahById(surahId); // fetch Surah metadata
        const v = await fetchVersesBySurah(surahId); // fetch verses
        setSurah(s);
        setVerses(v);
      } catch (err) {
        console.error('Error loading Surah/Verses from DB:', err);
      }
    };
    loadSurah();
  }, [surahId]);

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
        type={'Meccan'} // optional: fetch from DB if you add column
      />

      <View style={styles.textContainer}>
        <Text style={{ writingDirection: 'rtl', textAlign: 'justify' }}>
          {verses.map((ayah, idx) => (
            <AyahText
              key={ayah.id ?? idx}
              text={ayah.text}
              ayahNumber={ayah.ayah_no}
            />
          ))}
        </Text>
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
