import React from 'react';
import { Text, StyleSheet } from 'react-native';
import AyahText from '../components/AyahText';
import { Verse } from '../hooks/useSurah';

type Props = {
  verses: Verse[];
};

export default function SurahVersesStream({ verses }: Props) {
  return (
    <Text style={styles.stream}>
      {verses.map((ayah) => (
        <AyahText
          key={ayah.id}
          text={ayah.text}
          ayahNumber={ayah.ayah_no}
        />
      ))}
    </Text>
  );
}

const styles = StyleSheet.create({
  stream: {
    writingDirection: 'rtl',
    textAlign: 'justify',
  },
});
