import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

// Comprehensive list of the first 11 Surahs for a better demo
const allSurahsData = [
    { number: 1, arabic: 'الفاتحة', english: 'Al-Fatiha', verses: 7, location: 'Meccan' },
    { number: 2, arabic: 'البقرة', english: 'Al-Baqarah', verses: 286, location: 'Medinan' },
    { number: 3, arabic: 'آل عمران', english: 'Al-Imran', verses: 200, location: 'Medinan' },
    { number: 4, arabic: 'النساء', english: 'An-Nisa', verses: 176, location: 'Medinan' },
    { number: 5, arabic: 'المائدة', english: 'Al-Ma\'idah', verses: 120, location: 'Medinan' },
    { number: 6, arabic: 'الأنعام', english: 'Al-An\'am', verses: 165, location: 'Meccan' },
    { number: 7, arabic: 'الأعراف', english: 'Al-A\'raf', verses: 206, location: 'Meccan' },
    { number: 8, arabic: 'الأنفال', english: 'Al-Anfal', verses: 75, location: 'Medinan' },
    { number: 9, arabic: 'التوبة', english: 'At-Tawbah', verses: 129, location: 'Medinan' },
    { number: 10, arabic: 'يونس', english: 'Yunus', verses: 109, location: 'Meccan' },
    { number: 11, arabic: 'هود', english: 'Hud', verses: 123, location: 'Meccan' },
    // Fill the rest of the 114 Surahs with placeholders to simulate a full list
    ...Array.from({ length: 114 - 11 }, (_, i) => ({
        number: i + 12,
        arabic: `سورة ${i + 12}`,
        english: `Surah Placeholder ${i + 12}`,
        verses: Math.floor(Math.random() * 50) + 10, // Random verse count
        location: i % 2 === 0 ? 'Meccan' : 'Medinan'
    }))
];


export default function SurahList() {
    const { colors, isDarkMode } = useTheme();

    // Use the comprehensive data set
    const allSurahs = allSurahsData;

    const renderItem = ({ item }: { item: typeof allSurahs[0] }) => {
        return (
            // Added TouchableOpacity for better user experience (pressable list item)
            <TouchableOpacity
                style={[
                    styles.row,
                    {
                        backgroundColor: isDarkMode ? colors.backgroundSecondary : colors.backgroundPrimary,
                        borderColor: colors.border
                    },
                ]}
                activeOpacity={0.8}
                onPress={() => console.log(`Navigating to Surah ${item.number}`)}
            >
                {/* Index Number (Circle) */}
                <View style={[styles.indexNumberContainer, { borderColor: colors.primaryAccent }]}>
                    <Text style={[styles.indexNumberText, { color: colors.primaryAccent }]}>{item.number}</Text>
                </View>

                {/* Surah Names (English/Location & Verse count) */}
                <View style={styles.textContainer}>
                    <Text style={[styles.english, { color: colors.textPrimary }]}>
                        {item.english} <Text style={{ fontSize: 12, opacity: 0.6 }}>- {item.location}</Text>
                    </Text>
                    <Text style={[styles.verseCount, { color: colors.textSecondary }]}>
                        {item.verses} Verses
                    </Text>
                </View>

                {/* Arabic Name */}
                <Text style={[styles.arabic, { color: colors.primary }]}>
                    {item.arabic}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        // FIX: The FlatList is now wrapped in an OuterContainer with flex: 1.
        // This ensures the component itself is properly stretched vertically.
        <View style={styles.outerContainer}>
            <FlatList
                data={allSurahs}
                renderItem={renderItem}
                keyExtractor={(item) => item.number.toString()}
                contentContainerStyle={styles.listContentContainer}
                style={styles.container}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: { // New style for the defensive outer View
        flex: 1,
    },
    // FIX: This style is applied to the FlatList component itself.
    container: {
        flex: 1,
    },
    listContentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 100 // Ensure space for the bottom navigator
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginBottom: 8,
    },
    indexNumberContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        flexShrink: 0,
    },
    indexNumberText: {
        fontWeight: '700',
        fontSize: 14,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    english: {
        fontSize: 16,
        fontWeight: '600',
    },
    verseCount: {
        fontSize: 12,
        fontWeight: '400',
        opacity: 0.7
    },
    arabic: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'right',
        marginLeft: 16,
    },
});
