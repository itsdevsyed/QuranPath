import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useJuzVerses } from '../hooks/useJuzVerses';
import { SurahSection } from './SurahSection';

type Props = {
  juzNumber: number;
  title: string;
};

export default function JuzVersesList({ juzNumber, title }: Props) {
  const { colors } = useTheme();
  const { data, loading } = useJuzVerses(juzNumber);

  if (loading)
    return (
      <View style={styles.loading}>
        <Text style={{ color: colors.textPrimary }}>Loading Juz…</Text>
      </View>
    );

  if (!data.length)
    return (
      <View style={styles.loading}>
        <Text style={{ color: colors.textPrimary }}>No verses found</Text>
      </View>
    );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.surahId.toString()}
      renderItem={({ item }) => (
        <SurahSection
          surahId={item.surahId}
          verses={item.verses}
          showHeader={data.length > 1}
        />
      )}
      contentContainerStyle={{ padding: 20 }}
    />
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
