import React, { memo } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import surahData from '../../assets/quran/surah.json';

type RootStackParamList = {
    VersesPage: {
        surahId: number;
        title: string;
    };
};

type SurahListNavigationProp = NativeStackNavigationProp<RootStackParamList, 'VersesPage'>;

type SurahListItemData = {
    number: number;
    arabic: string;
    english: string;
    translation: string;
    verses: number;
    location: string;
};

type SurahListProps = { listContentStyle?: ViewStyle; };

// Fallback data if JSON is empty
const fallbackSurahList: SurahListItemData[] = [
    { number: 1, arabic: 'الفاتحة', english: 'Al-Fatiha', translation: 'The Opening', verses: 7, location: 'meccan' },
    { number: 2, arabic: 'البقرة', english: 'Al-Baqarah', translation: 'The Cow', verses: 286, location: 'medinan' },
    { number: 3, arabic: 'آل عمران', english: 'Aal-e-Imran', translation: 'The Family of Imran', verses: 200, location: 'medinan' },
];

const finalSurahList: SurahListItemData[] = surahData && surahData.length > 0
    ? surahData.map((surah: any) => ({
        number: surah.number,
        arabic: surah.arabic_name,
        english: surah.english_transliteration,
        translation: surah.english_translation,
        verses: surah.total_verses,
        location: surah.type.toLowerCase(),
    }))
    : fallbackSurahList;

const SurahListItem = memo(({ item, colors }: { item: SurahListItemData; colors: any }) => {
    const navigation = useNavigation<SurahListNavigationProp>();

    const handlePress = () => {
        navigation.navigate('VersesPage', {
            surahId: item.number,
            title: `${item.english} (${item.arabic})`
        });
    };

    const indexContainerStyle = {
        borderColor: colors.primaryAccent,
        borderWidth: 1.5,
        backgroundColor: colors.isDarkMode ? `${colors.primaryAccent}15` : `${colors.primaryAccent}10`
    };

    return (
        <TouchableOpacity
            style={styles.row}
            activeOpacity={0.65}
            onPress={handlePress}
        >
            <View style={[styles.indexNumberContainer, indexContainerStyle]}>
                <Text style={[styles.indexNumberText, { color: colors.primaryAccent }]}>
                    {item.number}
                </Text>
            </View>

            <View style={styles.textContainer}>
                <Text style={[styles.englishText, { color: colors.textPrimary }]} numberOfLines={1}>
                    {item.english}
                </Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]} numberOfLines={1}>
                    {item.translation} • {item.location} • {item.verses} Ayahs
                </Text>
            </View>

            <Text style={[styles.arabicText, { color: colors.primary }]} numberOfLines={1}>
                {item.arabic}
            </Text>
        </TouchableOpacity>
    );
});

const ListSeparator = memo(({ color }: { color: string }) => (
    <View style={[styles.separator, { backgroundColor: color }]} />
));

export default function SurahList({ listContentStyle }: SurahListProps) {
    const { colors } = useTheme();

    if (!finalSurahList?.length) return (
        <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
            <Text style={{ color: colors.textPrimary, textAlign: 'center' }}>
                ⚠️ Error: Could not load Surah list data.
            </Text>
        </View>
    );

    return (
        <FlatList
            data={finalSurahList}
            renderItem={({ item }) => <SurahListItem item={item} colors={colors} />}
            keyExtractor={(item) => item.number.toString()}
            contentContainerStyle={[styles.listContentContainer, listContentStyle]}
            ItemSeparatorComponent={() => <ListSeparator color={`${colors.textSecondary}20`} />}
            style={[styles.container, { backgroundColor: colors.background }]}
            initialNumToRender={15}
            windowSize={21}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    listContentContainer: { paddingVertical: 8 },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16
    },
    separator: { height: 1, marginHorizontal: 16 },
    indexNumberContainer: {
        width: 34,
        height: 34,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16
    },
    indexNumberText: { fontWeight: '700', fontSize: 14 },
    textContainer: { flex: 1, justifyContent: 'center' },
    englishText: { fontSize: 17, fontWeight: '600', letterSpacing: 0.3 },
    subtitle: { fontSize: 12, fontWeight: '400', marginTop: 2, opacity: 0.7 },
    arabicText: {
        fontSize: 26,
        fontFamily: 'ArabicFont',
        textAlign: 'right',
        marginLeft: 12
    },
});