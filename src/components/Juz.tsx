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

type RootStackParamList = {
    VersesPage: {
        juzNumber: number;
        title: string;
    };
};

type JuzListNavigationProp = NativeStackNavigationProp<RootStackParamList, 'VersesPage'>;

type JuzListItemData = {
    number: number;
    arabic: string;
    start: string;
    label: string;
};

type JuzListProps = {
    listContentStyle?: ViewStyle;
};

// Mock data since chapters.json might be empty
const mockJuzData: JuzListItemData[] = [
    { number: 1, arabic: 'الجزء الأول', start: 'Al-Fatihah 1:1', label: 'Juz 1' },
    { number: 2, arabic: 'الجزء الثاني', start: 'Al-Baqarah 2:142', label: 'Juz 2' },
    { number: 3, arabic: 'الجزء الثالث', start: 'Al-Baqarah 2:253', label: 'Juz 3' },
    { number: 4, arabic: 'الجزء الرابع', start: 'Al-Imran 3:93', label: 'Juz 4' },
    { number: 5, arabic: 'الجزء الخامس', start: 'An-Nisa 4:24', label: 'Juz 5' },
];

const JuzListItem = memo(({ item, colors }: { item: JuzListItemData; colors: any }) => {
    const navigation = useNavigation<JuzListNavigationProp>();

    const handlePress = () => {
        navigation.navigate('VersesPage', {
            juzNumber: item.number,
            title: `${item.label} (${item.arabic})`
        });
    };

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
            onPress={handlePress}
        >
            <View style={[styles.indexNumberContainer, indexContainerStyle]}>
                <Text style={[styles.indexNumberText, { color: colors.primaryAccent }]}>
                    {item.number}
                </Text>
            </View>

            <View style={styles.textContainer}>
                <Text style={[styles.englishText, { color: colors.textPrimary }]} numberOfLines={1}>
                    {item.label}
                </Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]} numberOfLines={1}>
                    Starts at {item.start}
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

    const juzData = useMemo<JuzListItemData[]>(() => {
        try {
            const chapterData = require('../../assets/quran/chapters.json');
            if (chapterData && Array.isArray(chapterData) && chapterData.length > 0) {
                return chapterData.map((j: any) => ({
                    number: j.number,
                    arabic: j.arabic_name,
                    start: j.starting_surah_ayah,
                    label: j.english_start,
                }));
            } else {
                return mockJuzData;
            }
        } catch (error) {
            return mockJuzData;
        }
    }, []);

    return (
        <FlatList
            data={juzData}
            renderItem={({ item }) => <JuzListItem item={item} colors={colors} />}
            keyExtractor={(item) => item.number.toString()}
            contentContainerStyle={[styles.listContentContainer, listContentStyle]}
            ItemSeparatorComponent={() => (
                <ListSeparator color={`${colors.textSecondary}20`} />
            )}
            style={[styles.container, { backgroundColor: colors.background }]}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
        />
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    listContentContainer: { paddingVertical: 8 },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    separator: { height: 1, marginHorizontal: 16 },
    indexNumberContainer: {
        width: 34,
        height: 34,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    indexNumberText: { fontWeight: '700', fontSize: 14 },
    textContainer: { flex: 1, justifyContent: 'center', marginRight: 12 },
    englishText: { fontSize: 16, fontWeight: '600', letterSpacing: 0.3 },
    subtitle: { fontSize: 12, fontWeight: '400', marginTop: 2, opacity: 0.7 },
    arabicText: {
        fontSize: 22,
        fontFamily: 'ArabicFont',
        textAlign: 'right',
    },
});