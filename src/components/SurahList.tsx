import React, { useEffect, useState, memo } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fetchAllSurahs } from '../db/queries';

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

type SurahListProps = { listContentStyle?: ViewStyle };

export default function SurahList({ listContentStyle }: SurahListProps) {
    const { colors } = useTheme();
    const navigation = useNavigation<SurahListNavigationProp>();
    const [surahList, setSurahList] = useState<SurahListItemData[]>([]);

    useEffect(() => {
        const loadSurahs = async () => {
            try {
                const rows = await fetchAllSurahs();
                setSurahList(
                    rows.map((row: any) => ({
                        number: row.id,
                        arabic: row.name_arabic,
                        english: row.name_latin || row.name_english,
                        translation: row.name_english,
                        verses: row.total_verse,
                        location: 'meccan', // Optional: you can add a 'type' column later
                    }))
                );
            } catch (err) {
                console.error('Error fetching Surahs from DB:', err);
            }
        };
        loadSurahs();
    }, []);

    if (!surahList.length)
        return (
            <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
                <Text style={{ color: colors.textPrimary, textAlign: 'center' }}>
                    ⚠️ Loading Surahs...
                </Text>
            </View>
        );

    return (
        <FlatList
            data={surahList}
            renderItem={({ item }) => <SurahListItem item={item} colors={colors} navigation={navigation} />}
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

type SurahListItemProps = {
    item: SurahListItemData;
    colors: any;
    navigation: SurahListNavigationProp;
};

const SurahListItem = memo(({ item, colors, navigation }: SurahListItemProps) => {
    const handlePress = () => {
        navigation.navigate('VersesPage', {
            surahId: item.number,
            title: `${item.english} (${item.arabic})`,
        });
    };

    const indexContainerStyle = {
        borderColor: colors.primaryAccent,
        borderWidth: 1.5,
        backgroundColor: colors.isDarkMode ? `${colors.primaryAccent}15` : `${colors.primaryAccent}10`,
    };

    return (
        <TouchableOpacity style={styles.row} activeOpacity={0.65} onPress={handlePress}>
            <View style={[styles.indexNumberContainer, indexContainerStyle]}>
                <Text style={[styles.indexNumberText, { color: colors.primaryAccent }]}>{item.number}</Text>
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

const styles = StyleSheet.create({
    container: { flex: 1 },
    errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    listContentContainer: { paddingVertical: 8 },
    row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, paddingHorizontal: 16 },
    separator: { height: 1, marginHorizontal: 16 },
    indexNumberContainer: { width: 34, height: 34, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    indexNumberText: { fontWeight: '700', fontSize: 14 },
    textContainer: { flex: 1, justifyContent: 'center' },
    englishText: { fontSize: 17, fontWeight: '600', letterSpacing: 0.3 },
    subtitle: { fontSize: 12, fontWeight: '400', marginTop: 2, opacity: 0.7 },
    arabicText: { fontSize: 26, fontFamily: 'ArabicFont', textAlign: 'right', marginLeft: 12 },
});
