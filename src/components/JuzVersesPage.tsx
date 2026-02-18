import type { RouteProp } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import AyahText from '../components/AyahText';
import { useTheme } from '../context/ThemeContext';
import { getDb } from '../db/database';

/* -------------------- TYPES -------------------- */
type RootStackParamList = {
    JuzVersesPage: { juzNumber: number; title: string };
};

type JuzVersesRouteProp = RouteProp<RootStackParamList, 'JuzVersesPage'>;

type Verse = {
    id: number;
    surah_id: number;
    ayah_no: number;
    text: string;
};

type SurahGroup = {
    surahId: number;
    verses: Verse[];
};

/* -------------------- SCREEN -------------------- */
export default function JuzVersesPage() {
    const route = useRoute<JuzVersesRouteProp>();
    const { juzNumber, title } = route.params;
    const { colors } = useTheme();

    const [surahGroups, setSurahGroups] = useState<SurahGroup[]>([]);

    useEffect(() => {
        const loadJuzVerses = async () => {
            try {
                const db = getDb();

                // Fetch all verses for this Juz
                const rows: Verse[] = db.getAllSync(
                    `SELECT id, surah_id, ayah_no, text 
                     FROM verse 
                     WHERE juz = ? 
                     ORDER BY surah_id, ayah_no ASC`,
                    [juzNumber]
                );

                // Group by Surah
                const grouped: { [key: number]: Verse[] } = {};
                rows.forEach((verse) => {
                    if (!grouped[verse.surah_id]) grouped[verse.surah_id] = [];
                    grouped[verse.surah_id].push(verse);
                });

                const groups: SurahGroup[] = Object.keys(grouped)
                    .map((key) => ({ surahId: Number(key), verses: grouped[Number(key)] }))
                    .sort((a, b) => a.surahId - b.surahId);

                setSurahGroups(groups);
            } catch (err) {
                console.error('Error fetching Juz verses from DB:', err);
            }
        };

        loadJuzVerses();
    }, [juzNumber]);

    if (surahGroups.length === 0) {
        return (
            <View style={[styles.center, { backgroundColor: colors.background }]}>
                <Text style={{ color: colors.textPrimary }}>No verses found for this Juz</Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: colors.background }]}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={[styles.header, { backgroundColor: colors.card }]}>
                <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                    Juz {juzNumber}
                </Text>
            </View>

            {/* Content */}
            {surahGroups.map((group, groupIndex) => (
                <View key={`surah-${group.surahId}`} style={styles.surahSection}>
                    <CompactSurahHeader
                        name={`Surah ${group.surahId}`}
                        transliteration=""
                        number={group.surahId}
                        type="Meccan"
                        showBismillah={groupIndex !== 0}
                        isFirstSurah={groupIndex === 0}
                    />

                    {/* Continuous Quran Text */}
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
                                    key={`${group.surahId}-${verse.ayah_no}`}
                                    text={verse.text}
                                    ayahNumber={verse.ayah_no}
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
            <Text style={[styles.compactSurahName, { color: colors.textPrimary }]}>{name}</Text>
            <View style={styles.compactInfoRow}>
                <Text style={[styles.compactInfo, { color: colors.textSecondary }]}>{transliteration}</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={[styles.compactInfo, { color: colors.textSecondary }]}>Surah {number}</Text>
                <Text style={styles.dot}>•</Text>
                <Text style={[styles.compactInfo, { color: colors.textSecondary }]}>{type}</Text>
            </View>
        </View>
    );
};

/* -------------------- STYLES -------------------- */
const styles = StyleSheet.create({
    container: { flex: 1 },

    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

    header: { paddingVertical: 16, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.08)' },

    title: { fontSize: 20, fontWeight: '700', textAlign: 'center' },

    subtitle: { fontSize: 14, textAlign: 'center', marginTop: 4, opacity: 0.7 },

    surahSection: { marginBottom: 12 },

    textContainer: { paddingHorizontal: 20, paddingVertical: 16 },

    compactContainer: { paddingVertical: 14, paddingHorizontal: 16, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },

    compactSurahName: { fontFamily: 'ArabicFont', fontSize: 30, lineHeight: 40, marginBottom: 6 },

    compactInfoRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' },

    compactInfo: { fontSize: 13, fontWeight: '500', opacity: 0.8 },

    dot: { marginHorizontal: 6, fontSize: 12, opacity: 0.6 },

    bismillah: { fontFamily: 'ArabicFont', fontSize: 22, lineHeight: 32, marginTop: 6, textAlign: 'center' },
});
