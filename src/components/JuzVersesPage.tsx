import type { RouteProp } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import React, { JSX, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AyahText from '../components/AyahText';
import { useTheme } from '../context/ThemeContext';
import { getVerseJuz, toArabicIndic } from '../utils/juzUtils';

type RootStackParamList = {
    JuzVersesPage: { juzNumber: number; title: string };
};

type JuzVersesRouteProp = RouteProp<RootStackParamList, 'JuzVersesPage'>;

type Verse = {
    id?: number;
    text: string;
    juzz_number?: number;
    juz_number?: number;
    juzz?: number;
    juz?: number;
};

type Surah = {
    id: number;
    name: string;
    transliteration: string;
    translation: string;
    type: string;
    total_verses: number;
    urdu_name: string;
    verses: Verse[];
};

import quranDataRaw from '../../assets/quran/quran.json';
const quranData = quranDataRaw as unknown as Surah[];

interface SurahGroup {
    surah: Surah;
    verses: Verse[];
    showBismillah: boolean;
}

interface JuzContent {
    surahGroups: SurahGroup[];
    totalVerseCount: number;
}

export default function JuzVersesPage(){
    const route = useRoute<JuzVersesRouteProp>();
    const { juzNumber, title } = route.params;
    const { colors } = useTheme();

    const juzContent: JuzContent = useMemo(() => {
        const surahGroups: SurahGroup[] = [];

        quranData.forEach((surah: Surah) => {
            const surahVersesInJuz = surah.verses.filter((verse: Verse) => {
                const existingJuz = verse.juzz_number || verse.juz_number || verse.juzz || verse.juz;
                const verseJuz = getVerseJuz(surah.id, verse.id || 1, existingJuz);
                return verseJuz === juzNumber;
            });

            if (surahVersesInJuz.length > 0) {
                const showBismillah = surah.id !== 1 && surah.id !== 9;
                surahGroups.push({ surah, verses: surahVersesInJuz, showBismillah });
            }
        });

        surahGroups.sort((a, b) => a.surah.id - b.surah.id);

        return {
            surahGroups,
            totalVerseCount: surahGroups.reduce((total, group) => total + group.verses.length, 0),
        };
    }, [juzNumber]);

    if (juzContent.surahGroups.length === 0) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={[styles.errorText, { color: colors.textPrimary }]}>
                    No verses found for Juz {juzNumber}
                </Text>
            </View>
        );
    }

    const renderSurahGroup = (group: SurahGroup, groupIndex: number)    => (
        <View key={`surah-${group.surah.id}-${groupIndex}`} style={styles.surahSection}>
            <CompactSurahHeader
                name={group.surah.name}
                transliteration={group.surah.transliteration}
                number={group.surah.id}
                type={group.surah.type === 'medinan' ? 'Medinan' : 'Meccan'}
                showBismillah={group.showBismillah}
                isFirstSurah={groupIndex === 0}
            />
            <View style={styles.textContainer}>
                <AyahText
                    text={group.verses
                        .map((verse: Verse, index: number) => {
                            const verseNumber = verse.id ?? index + 1;
                            return `${verse.text} ${toArabicIndic(verseNumber)}`;
                        })
                        .join(' ')}
                />
            </View>
        </View>
    );

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
            <View style={[styles.header, { backgroundColor: colors.card }]}>
                <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                    {juzContent.totalVerseCount} verses
                </Text>
            </View>
            <View style={styles.contentContainer}>
                {juzContent.surahGroups.map(renderSurahGroup)}
            </View>
        </ScrollView>
    );
}

// CompactSurahHeader component (unchanged)
interface CompactSurahHeaderProps {
    name: string;
    transliteration: string;
    number: number;
    type: 'Meccan' | 'Medinan';
    showBismillah: boolean;
    isFirstSurah: boolean;
}

const CompactSurahHeader: React.FC<CompactSurahHeaderProps> = ({
    name, transliteration, number, type, showBismillah, isFirstSurah
}) => {
    const { colors } = useTheme();
    return (
        <View style={[styles.compactContainer, { backgroundColor: colors.background }]}>
            <Text style={[styles.compactSurahName, { color: colors.textPrimary }]}>{name}</Text>
            <View style={styles.compactInfoRow}>
                <Text style={[styles.compactTransliteration, { color: colors.textSecondary }]}>{transliteration}</Text>
                <Text style={[styles.dot, { color: colors.textSecondary }]}>•</Text>
                <Text style={[styles.compactInfoText, { color: colors.textSecondary }]}>Surah {number}</Text>
                <Text style={[styles.dot, { color: colors.textSecondary }]}>•</Text>
                <Text style={[styles.compactInfoText, { color: colors.textSecondary }]}>{type}</Text>
            </View>
            {showBismillah && !isFirstSurah && (
                <Text style={[styles.compactBasmala, { color: colors.textPrimary }]}>
                    بِسْمِ ٱللّٰهِ ٱلرَّحْمٰنِ ٱلرَّحِيمِ
                </Text>
            )}
        </View>
    );
};

// Styles (unchanged)
const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { paddingVertical: 16, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)' },
    title: { fontSize: 20, fontWeight: '700', textAlign: 'center', letterSpacing: 0.5 },
    subtitle: { fontSize: 14, textAlign: 'center', marginTop: 4, opacity: 0.7 },
    contentContainer: { paddingBottom: 20 },
    surahSection: { marginBottom: 8 },
    textContainer: { paddingHorizontal: 16, paddingVertical: 12 },
    compactContainer: { paddingVertical: 16, paddingHorizontal: 16, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
    compactSurahName: { fontFamily: 'ArabicFont', fontSize: 32, lineHeight: 42, textAlign: 'center', marginBottom: 8 },
    compactInfoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 12, flexWrap: 'wrap' },
    compactTransliteration: { fontSize: 14, fontWeight: '600', letterSpacing: 0.3, opacity: 0.8 },
    compactInfoText: { fontSize: 13, fontWeight: '500', textTransform: 'capitalize', opacity: 0.8 },
    dot: { marginHorizontal: 8, fontSize: 12, opacity: 0.6 },
    compactBasmala: { fontFamily: 'ArabicFont', fontSize: 24, textAlign: 'center', lineHeight: 32, marginTop: 4, letterSpacing: 1 },
    errorText: { fontSize: 16, textAlign: 'center', marginTop: 20 },
});