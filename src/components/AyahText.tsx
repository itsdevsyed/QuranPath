import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { toArabicIndic } from '../utils/ayahOrnament';

interface AyahTextProps {
  text: string;
  ayahNumber: number;
}

const AyahText: React.FC<AyahTextProps> = ({ text, ayahNumber }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.arabicText, { color: colors.textPrimary }]}>
        {text}
        <Text style={styles.ayahWrapper}>
          <Text style={styles.ayahSymbol}> ۝ </Text>
          <Text style={styles.ayahNumber}>
            {toArabicIndic(ayahNumber)}
          </Text>
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },

  arabicText: {
    fontFamily: 'ArabicFont',   // NoorHuda
    fontSize: 34,
    lineHeight: 56,
    writingDirection: 'rtl',
    textAlign: 'right',
    includeFontPadding: false,
  },

  ayahWrapper: {
    fontFamily: 'ArabicFont',
  },

  ayahSymbol: {
    fontSize:18,     // slightly smaller than main text
    opacity: 0.9,
  },

  ayahNumber: {
    fontSize: 42,     // BIGGER than before
    fontWeight: '100',
    letterSpacing: 1,
  },
});

export default AyahText;
