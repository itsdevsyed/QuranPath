import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useRoutePath } from '@react-navigation/native';

import quranData from '../../assets/quran/quran_structured.json';
import SurahHeader from '../components/SurahHeader';
import AyahText from '../components/AyahText';
import { useTheme } from '../context/ThemeContext';

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
  const map = ['\u0660','\u0661','\u0662','\u0663','\u0664','\u0665','\u0666','\u0667','\u0668','\u0669'];
  return s.split('').map(ch => (/\d/.test(ch) ? map[Number(ch)] : ch)).join('');
};

// Right-to-left isolate wrapper for ayah markers
const wrapAyahMarker = (num: number) => `${toArabicIndic(num)}`;

const VersesPage: React.FC = () => {
  const { appTheme } = useTheme();
  const route = useRoute<useRoutePath<RootStackParamList, 'VersesPage'>>();
  const surahId = route.params?.surahId;

  const surah = Array.isArray(quranData)
    ? quranData.find(s => s.id === surahId)
    : null;

  if (!surah) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: appTheme.colors.background }]}>
        <Text style={{ color: appTheme.colors.textPrimary }}>⚠️ Surah not found.</Text>
      </View>
    );
  }


  const fullText = surah.verses
    .map((ayah: any, idx: number) => {
      const num = ayah.id ?? idx + 1;
      return `${ayah.text} ${wrapAyahMarker(num)}`;
    })
    .join(' ');

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: appTheme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <SurahHeader
        name={surah.name}
        transliteration={surah.transliteration}
        number={surah.id}
        totalVerses={surah.total_verses}
        type={surah.type === 'medinan' ? 'Medinan' : 'Meccan'}
      />

<View style={styles.textContainer}>
  {surah.verses.map((ayah: any, idx: number) => (
    <AyahText
      key={ayah.id ?? idx}
      text={ayah.text}
      ayahNumber={ayah.id ?? idx + 1}
    />
  ))}
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
