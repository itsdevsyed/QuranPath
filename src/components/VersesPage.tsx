// screens/VersesPage.tsx
import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import quranData from '../../assets/quran/quran.json';
import SurahHeader from '../components/SurahHeader';
import AyahText from '../components/AyahText';
import { useTheme } from '../context/ThemeContext';

type RootStackParamList = {
  VersesPage: {
    surahId: number;
    title?: string;
  };
};

// convert integer (1,2,10,123) -> Arabic-Indic string ("١","٢","١٠","١٢٣")
const toArabicIndic = (n: number | string | undefined) => {
  if (n == null) return '';
  const s = String(n);
  const map = ['\u0660', '\u0661', '\u0662', '\u0663', '\u0664', '\u0665', '\u0666', '\u0667', '\u0668', '\u0669'];
  return s.split('').map(ch => {
    if (/\d/.test(ch)) return map[Number(ch)];
    return ch;
  }).join('');
};

const VersesPage: React.FC = () => {
  const { appTheme } = useTheme();
  const route = useRoute<RouteProp<RootStackParamList, 'VersesPage'>>();
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

  // Build continuous text with Arabic-Indic ayah numbers like: "... text ﴿١﴾ ... ﴿٢﴾ ..."
  const fullText = surah.verses
    .map((ayah: any, idx: number) => {
      const num = ayah.id ?? idx + 1;
      return `${ayah.text} ${toArabicIndic(num)}`;
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
        <AyahText text={fullText} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  textContainer: {
    // paddingHorizontal: 20,
    // paddingVertical: 24,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VersesPage;
