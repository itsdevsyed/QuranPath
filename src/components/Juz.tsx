import React, { memo, useMemo } from 'react';
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
import juzzData from '../../assets/quran/Juzz.json';

type RootStackParamList = {
    JuzVersesPage: {
        juzNumber: number;
        title: string;
    };
};

type JuzListNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'JuzVersesPage'
>;

type JuzListItemData = {
    number: number;
    arabic: string;
    english: string;
    transliteration: string;
    surahRange: string;
    verseCount: number;
};

type JuzListProps = {
    listContentStyle?: ViewStyle;
};

const JuzListItem = memo(({ item, colors }: { item: JuzListItemData; colors: any }) => {
    const navigation = useNavigation<JuzListNavigationProp>();

    const handlePress = () => {
        navigation.navigate('JuzVersesPage', {
            juzNumber: item.number,
            title: `${item.english} (${item.arabic})`,
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
                <Text style={[styles.transliterationText, { color: colors.primaryAccent }]} numberOfLines={1}>
                    {item.transliteration}
                </Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]} numberOfLines={1}>
                    {item.surahRange} • {item.verseCount} verses
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

export default function JuzList({ listContentStyle }: JuzListProps) {
    const { colors } = useTheme();

    const finalJuzData = useMemo<JuzListItemData[]>(() => {
        try {
            if (juzzData && Array.isArray(juzzData) && juzzData.length > 0) {
                return juzzData.map((juz: any) => ({
                    number: juz.id,
                    arabic: juz.arabic_name,
                    english: juz.english_name,
                    transliteration: juz.transliteration,
                    surahRange: juz.surah_range,
                    verseCount: juz.verse_count,
                }));
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    }, []);

    if (!finalJuzData?.length)
        return (
            <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
                <Text style={{ color: colors.textPrimary, textAlign: 'center' }}>
                    ⚠️ Error: Could not load Juz list data.
                </Text>
            </View>
        );

    return (
        <FlatList
            data={finalJuzData}
            renderItem={({ item }) => <JuzListItem item={item} colors={colors} />}
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
    transliterationText: {
        fontSize: 13,
        fontWeight: '500',
        marginTop: 2,
        opacity: 0.9,
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
        marginLeft: 12
    },
});