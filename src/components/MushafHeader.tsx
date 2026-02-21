// /components/juz/MushafHeader.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  juzNumber: number;
  title: string;
};

export default function MushafHeader({ juzNumber, title }: Props) {
  return (
    <View style={styles.header}>
      <Text style={styles.juzLabel}>JUZ {juzNumber}</Text>

      <View style={styles.frameContainer}>
        <View style={styles.sideLine} />
        <View style={styles.frame}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.sideLine} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', marginBottom: 30 },
  juzLabel: { fontSize: 12, fontWeight: '800', letterSpacing: 22 },
  frameContainer: { flexDirection: 'row', alignItems: 'center' },
  frame: { padding: 10 },
  sideLine: { width: 25, height: 1 },
  title: { fontSize: 20, fontWeight: '700' },
});
