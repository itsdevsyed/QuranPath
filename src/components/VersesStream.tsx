// /components/juz/VersesStream.tsx

import React from 'react';
import { Text, StyleSheet } from 'react-native';
import AyahText from './AyahText';
import { Verse } from '../hooks/useJuzVerses';

type Props = {
  verses: Verse[];
};

export default function VersesStream({ verses }: Props) {
  return (
    <Text style={styles.ayahStream}>
      {verses.map((verse) => (
        <AyahText
          key={verse.id}
          text={verse.text}
          ayahNumber={verse.ayah_no}
        />
      ))}
    </Text>
  );
}

const styles = StyleSheet.create({
  ayahStream: {
    fontFamily: 'ArabicFont',
    writingDirection: 'rtl',
    textAlign: 'justify',
    fontSize: 24,
    lineHeight: 42,
  },
});
