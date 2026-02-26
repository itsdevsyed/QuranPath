// ListRenderer.tsx
import React from 'react';
import { FlatList, View, Text, StyleSheet, ListRenderItem } from 'react-native';

export type ListItem = {
  title: string;
  translation?: string;
  arabic?: string;
  english?: string;
  verses?: number;
  location?: string;
};

type ListRendererProps = {
  data: ListItem[];
  showVerses?: boolean; // Toggle full Mushaf rendering
};

export default function ListRenderer({ data, showVerses = false }: ListRendererProps) {
  const renderItem: ListRenderItem<ListItem> = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.title}>{item.title || item.english}</Text>

      {showVerses && (
        <View>
          {item.translation && <Text style={styles.translation}>{item.translation}</Text>}
          {item.arabic && <Text style={styles.arabic}>{item.arabic}</Text>}
          {item.location && <Text style={styles.subtitle}>{item.location}</Text>}
          {item.verses !== undefined && <Text style={styles.subtitle}>{item.verses} Ayahs</Text>}
        </View>
      )}

      {!showVerses && item.translation && (
        <Text style={styles.translation}>{item.translation}</Text>
      )}
    </View>
  );

  return (
    <FlatList<ListItem>
      data={data ?? []}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listPadding}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No items available.</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listPadding: { paddingHorizontal: 16, paddingBottom: 120 },
  row: { marginBottom: 12 },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  translation: { fontSize: 14, color: '#555' },
  arabic: { fontSize: 26, fontFamily: 'ArabicFont', textAlign: 'right', marginTop: 2 },
  subtitle: { fontSize: 12, color: '#777' },
  emptyContainer: { flex: 1, alignItems: 'center', marginTop: 50 },
  emptyText: { fontSize: 14, color: '#888' },
});
