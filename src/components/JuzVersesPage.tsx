import type { RouteProp } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import AyahText from '../components/AyahText';
import { useTheme } from '../context/ThemeContext';
import { getVerseJuz } from '../utils/juzUtils';

import quranDataRaw from '../../assets/quran/quran_structured.json';

/* -------------------- TYPES -------------------- */

type RootStackParamList = {
    JuzVersesPage: { juzNumber: number; title: string };
};

type JuzVersesRouteProp = RouteProp<
    RootStackParamList,
    'JuzVersesPage'
>;

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

interface SurahGroup {
    surah: Surah;
    verses: Verse[];
    showBismillah: boolean;
}

const quranData = quranDataRaw as unknown as Surah[];

/* -------------------- SCREEN -------------------- */

export default function JuzVersesPage() {
    const route = useRoute<JuzVersesRouteProp>();
    const { juzNumber, title } = route.params;
    const { colors } = useTheme();

    /* ---------- Build Juz content ---------- */
    const surahGroups = useMemo<SurahGroup[]>(() => {
        const groups: SurahGroup[] = [];

        quranData.forEach((surah) => {
            const versesInJuz = surah.verses.filter((verse) => {
                const existingJuz =
                    verse.juzz_number ||
                    verse.juz_number ||
                    verse.juzz ||
                    verse.juz;

                const verseJuz = getVerseJuz(
                    surah.id,
                    verse.id ?? 1,
                    existingJuz
                );

                return verseJuz === juzNumber;
            });

            if (versesInJuz.length > 0) {
                groups.push({
                    surah,
                    verses: versesInJuz,
                    showBismillah: surah.id !== 1 && surah.id !== 9,
                });
            }
        });

        return groups.sort((a, b) => a.surah.id - b.surah.id);
    }, [juzNumber]);

    if (surahGroups.length === 0) {
        return (
            <View style={[styles.center, { backgroundColor: colors.background }]}>
                <Text style={{ color: colors.textPrimary }}>
                    No verses found for this Juz
                </Text>
            </View>
        );
    }

    /* -------------------- UI -------------------- */

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: colors.background }]}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={[styles.header, { backgroundColor: colors.card }]}>
                <Text style={[styles.title, { color: colors.textPrimary }]}>
                    {title}
                </Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                    Juz {juzNumber}
                </Text>
            </View>

            {/* Content */}
            {surahGroups.map((group, groupIndex) => (
                <View key={`surah-${group.surah.id}`} style={styles.surahSection}>
                    <CompactSurahHeader
                        name={group.surah.name}
                        transliteration={group.surah.transliteration}
                        number={group.surah.id}
                        type={group.surah.type === 'medinan' ? 'Medinan' : 'Meccan'}
                        showBismillah={group.showBismillah}
                        isFirstSurah={groupIndex === 0}
                    />

                    {/* 🔥 Continuous Quran Text */}
                    <View style={styles.textContainer}>
                        <Text
                            style={{
                                writingDirection: 'rtl',
                                textAlign: 'justify',
                                includeFontPadding: false,
                            }}
                        >
                            {group.verses.map((verse, index) => (
                                <AyahText
                                    key={`${group.surah.id}-${verse.id ?? index}`}
                                    text={verse.text}
                                    ayahNumber={verse.id ?? index + 1}
                                />
                            ))}
                        </Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

/* -------------------- COMPACT SURAH HEADER -------------------- */

interface CompactSurahHeaderProps {
    name: string;
    transliteration: string;
    number: number;
    type: 'Meccan' | 'Medinan';
    showBismillah: boolean;
    isFirstSurah: boolean;
}

const CompactSurahHeader: React.FC<CompactSurahHeaderProps> = ({
    name,
    transliteration,
    number,
    type,
    showBismillah,
    isFirstSurah,
}) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.compactContainer, { backgroundColor: colors.background }]}>
            <Text style={[styles.compactSurahName, { color: colors.textPrimary }]}>
                {name}
            </Text>

            <View style={styles.compactInfoRow}>
                <Text style={[styles.compactInfo, { color: colors.textSecondary }]}>
                    {transliteration}
                </Text>
                <Text style={styles.dot}>•</Text>
                <Text style={[styles.compactInfo, { color: colors.textSecondary }]}>
                    Surah {number}
                </Text>
                <Text style={styles.dot}>•</Text>
                <Text style={[styles.compactInfo, { color: colors.textSecondary }]}>
                    {type}
                </Text>
            </View>

            {/* {showBismillah && !isFirstSurah && (
                <Text style={[styles.bismillah, { color: colors.textPrimary }]}>
                    بِسْمِ ٱللّٰهِ ٱلرَّحْمٰنِ ٱلرَّحِيمِ
                </Text>
            )} */}
        </View>
    );
};

/* -------------------- STYLES -------------------- */

const styles = StyleSheet.create({
    container: { flex: 1 },

    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    header: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.08)',
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 4,
        opacity: 0.7,
    },

    surahSection: {
        marginBottom: 12,
    },

    textContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },

    compactContainer: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },

    compactSurahName: {
        fontFamily: 'ArabicFont',
        fontSize: 30,
        lineHeight: 40,
        marginBottom: 6,
    },

    compactInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },

    compactInfo: {
        fontSize: 13,
        fontWeight: '500',
        opacity: 0.8,
    },

    dot: {
        marginHorizontal: 6,
        fontSize: 12,
        opacity: 0.6,
    },

    bismillah: {
        fontFamily: 'ArabicFont',
        fontSize: 22,
        lineHeight: 32,
        marginTop: 6,
        textAlign: 'center',
    },
});
