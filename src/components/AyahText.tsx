import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { toArabicIndic } from '../utils/ayahOrnament';

interface AyahTextProps {
  text: string;
  ayahNumber: number;
}
const BASE_LINE_HEIGHT = 56;

const AyahText: React.FC<AyahTextProps> = ({ text, ayahNumber }) => {
  const { colors } = useTheme();

  return (
    <>
      <Text style={[styles.arabicText, { color: colors.textPrimary }]}>
        {text}{' '}
      </Text>
      <Text style={styles.marker}>
        ۝{toArabicIndic(ayahNumber)}{' '}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  arabicText: {
    fontFamily: 'ArabicFont',
    fontSize: 34,
    lineHeight: BASE_LINE_HEIGHT,
    writingDirection: 'rtl',
    textAlign: 'justify',
    includeFontPadding: false,
  },
  marker: {
    fontFamily: 'Amiri',
    fontSize: 22,
    lineHeight: BASE_LINE_HEIGHT, // 👈 SAME LINE HEIGHT
    includeFontPadding: false,
  },
});

export default AyahText;
