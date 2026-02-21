import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useSurah } from '../hooks/useSurah';
import AyahText from './AyahText';

type Props = {
  surahId: number;
};

export default function SurahVersesList({ surahId }: Props) {
  const { colors } = useTheme();
  const { verses, loading } = useSurah(surahId);

  if (loading)
    return (
      <View style={styles.loading}>
        <Text style={{ color: colors.textPrimary }}>Loading verses…</Text>
      </View>
    );

  if (!verses.length)
    return (
      <View style={styles.loading}>
        <Text style={{ color: colors.textPrimary }}>No verses found</Text>
      </View>
    );

  return (
    <FlatList
      data={verses}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 20 }}
      renderItem={({ item }) => (
        <AyahText text={item.text} ayahNumber={item.ayah_no} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
