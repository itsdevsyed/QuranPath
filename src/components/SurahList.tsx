import React, { memo } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import allSurahsData from '../../assets/quran.json';

// -------------------------------------------------------------------
// 1. TYPES
// -------------------------------------------------------------------

type FullSurahJsonItem = {
    id: number;
    name: string; // Arabic name
    transliteration: string; // English transliteration (e.g., Al-Fatihah)
    translation: string; // English meaning (e.g., The Opener)
    type: 'meccan' | 'medinan';
    total_verses: number;
    verses: any[];
};

type SurahListItemData = {
    number: number;
    arabic: string;
    english: string;
    translation: string;
    verses: number;
    location: string;
};

type SurahListProps = {
    listContentStyle?: ViewStyle;
};

// Navigation stack params
type RootStackParamList = {
    SurahDetails: { surahId: number };
};

type SurahListNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'SurahDetails'
>;

// -------------------------------------------------------------------
// 2. DATA TRANSFORMATION
// -------------------------------------------------------------------

const rawSurahData = allSurahsData as FullSurahJsonItem[];

const finalSurahList: SurahListItemData[] = rawSurahData.map((surah) => ({
    number: surah.id,
    arabic: surah.name,
    english: surah.transliteration,
    translation: surah.translation,
    verses: surah.total_verses,
    location: surah.type,
}));

// -------------------------------------------------------------------
// 3. COMPONENTS
// -------------------------------------------------------------------

const SurahListItem = memo(
    ({ item, colors }: { item: SurahListItemData; colors: any }) => {
        const navigation = useNavigation<SurahListNavigationProp>();

        const indexContainerStyle = {
            borderColor: colors.primaryAccent,
            borderWidth: 1.5,
            backgroundColor: colors.isDarkMode
                ? `${colors.primaryAccent}15`
                : `${colors.primaryAccent}10`,
        };

        return (
            <TouchableOpacity
                style={styles.row}
                activeOpacity={0.65}
                accessibilityRole="button"
                accessibilityLabel={`Surah ${item.english}, ${item.translation}`}
                onPress={() => navigation.navigate('SurahDetails', { surahId: item.number })}
            >
                {/* Surah Number Badge */}
                <View style={[styles.indexNumberContainer, indexContainerStyle]}>
                    <Text style={[styles.indexNumberText, { color: colors.primaryAccent }]}>
                        {item.number}
                    </Text>
                </View>

                {/* Surah Info */}
                <View style={styles.textContainer}>
                    <Text
                        style={[styles.englishText, { color: colors.textPrimary }]}
                        numberOfLines={1}
                    >
                        {item.english}
                    </Text>
                    <Text
                        style={[styles.subtitle, { color: colors.textSecondary }]}
                        numberOfLines={1}
                    >
                        {item.translation} • {item.location} • {item.verses} Ayahs
                    </Text>
                </View>

                {/* Arabic Name */}
                <Text
                    style={[styles.arabicText, { color: colors.primary }]}
                    numberOfLines={1}
                >
                    {item.arabic}
                </Text>
            </TouchableOpacity>
        );
    }
);

const ListSeparator = memo(({ color }: { color: string }) => (
    <View style={[styles.separator, { backgroundColor: color }]} />
));

// -------------------------------------------------------------------
// 4. MAIN COMPONENT
// -------------------------------------------------------------------

export default function SurahList({ listContentStyle }: SurahListProps) {
    const { colors } = useTheme();

    if (!finalSurahList?.length) {
        return (
            <View
                style={[styles.errorContainer, { backgroundColor: colors.background }]}
            >
                <Text style={{ color: colors.textPrimary, textAlign: 'center' }}>
                    ⚠️ Error: Could not load Surah list data from quran.json.
                </Text>
            </View>
        );
    }

    return (
        <FlatList
            data={finalSurahList}
            renderItem={({ item }) => <SurahListItem item={item} colors={colors} />}
            keyExtractor={(item) => item.number.toString()}
            contentContainerStyle={[styles.listContentContainer, listContentStyle]}
            ItemSeparatorComponent={() => (
                <ListSeparator color={`${colors.textSecondary}20`} />
            )}
            style={styles.container}
            initialNumToRender={15}
            windowSize={21}
            showsVerticalScrollIndicator={false}
        />
    );
}

// -------------------------------------------------------------------
// 5. STYLES
// -------------------------------------------------------------------

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    listContentContainer: {
        paddingVertical: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    separator: {
        height: 1,
        marginHorizontal: 16,
    },
    indexNumberContainer: {
        width: 34,
        height: 34,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    indexNumberText: {
        fontWeight: '700',
        fontSize: 14,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    englishText: {
        fontSize: 17,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
    subtitle: {
        fontSize: 12,
        fontWeight: '400',
        marginTop: 2,
        opacity: 0.7,
    },
    arabicText: {
        fontSize: 26,
        fontFamily: 'ArabicFont',
        textAlign: 'right',
        marginLeft: 12,
    },
});
