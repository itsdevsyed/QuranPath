// src/components/SurahList.tsx
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

// Real Surah names (first 4 for demo)
const realSurahs = [
    { number: 1, arabic: 'الفاتحة', english: 'Al-Fatiha' },
    { number: 2, arabic: 'البقرة', english: 'Al-Baqarah' },
    { number: 3, arabic: 'آل عمران', english: 'Al-Imran' },
    { number: 4, arabic: 'النساء', english: 'An-Nisa' },
];

export default function SurahList() {
    const { colors, isDarkMode } = useTheme();

    // Create full 114 Surah array, fill remaining with placeholders
    const allSurahs = Array.from({ length: 114 }, (_, i) => {
        return realSurahs[i] || { number: i + 1, arabic: '', english: '' };
    });

    const renderItem = ({ item }: { item: typeof allSurahs[0] }) => {
        const isPlaceholder = !item.arabic;
        return (
            <View
                style={[
                    styles.row,
                    { backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF', borderColor: colors.border },
                ]}
            >
                <Text style={[styles.number, { color: colors.textPrimary }]}>{item.number}</Text>
                <View style={styles.textContainer}>
                    <Text style={[styles.arabic, { color: colors.textPrimary }]}>
                        {item.arabic || '---'}
                    </Text>
                    <Text style={[styles.english, { color: isPlaceholder ? colors.border : colors.textPrimary }]}>
                        {item.english || '---'}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <FlatList
            data={allSurahs}
            renderItem={renderItem}
            keyExtractor={(item) => item.number.toString()}
            contentContainerStyle={styles.listContainer}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: { paddingHorizontal: 16, paddingBottom: 100 },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 12,
    },
    number: {
        width: 32,
        fontWeight: '700',
        fontSize: 14,
    },
    textContainer: {
        marginLeft: 12,
    },
    arabic: { fontSize: 16, fontWeight: '700', textAlign: 'right' },
    english: { fontSize: 14, fontWeight: '500', opacity: 0.7 },
});
