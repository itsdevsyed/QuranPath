import { RouteProp } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { getVersesByJuz } from '../db/queries';
import AyahText from '../components/AyahText';
import { useTheme } from '../context/ThemeContext';

/* -------------------- TYPES -------------------- */
type RootStackParamList = {
    JuzVersesPage: { juzNumber: number; title: string };
};

type JuzVersesRouteProp = RouteProp<
    RootStackParamList,
    'JuzVersesPage'
>;

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
        try {
            const rows: Verse[] = getVersesByJuz(juzNumber);
            const grouped: Record<number, Verse[]> = {};

            rows.forEach((verse) => {
                if (!grouped[verse.surah_id]) {
                    grouped[verse.surah_id] = [];
                }
                grouped[verse.surah_id].push(verse);
            });

            const groups: SurahGroup[] = Object.keys(grouped)
                .map((key) => ({
                    surahId: Number(key),
                    verses: grouped[Number(key)],
                }))
                .sort((a, b) => a.surahId - b.surahId);

            setSurahGroups(groups);
        } catch (err) {
            console.error('Error loading Juz:', err);
        }
    }, [juzNumber]);

    if (!surahGroups.length) {
        return (
            <View style={[styles.center, { backgroundColor: colors.background }]}>
                <Text style={{ color: colors.textPrimary }}>
                    No verses found
                </Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: colors.background }]}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            {/* Mushaf Page Wrapper */}
            <View style={styles.mushafPage}>

                {/* Inner Border */}
                <View style={styles.innerBorder} />

                {/* Header (UNCHANGED — your good design) */}
                <View style={styles.header}>
                    <Text style={styles.juzLabel}>
                        JUZ {juzNumber}
                    </Text>

                    <View style={styles.surahFrameContainer}>
                        <View style={styles.surahFrameSideLine} />
                        <View style={styles.surahFrame}>
                            <Text style={styles.headerTitle}>
                                {title}
                            </Text>
                        </View>
                        <View style={styles.surahFrameSideLine} />
                    </View>
                </View>

                {/* Clean Content */}
                <View style={styles.contentWrapper}>
                    {surahGroups.map((group) => (
                        <View
                            key={`surah-${group.surahId}`}
                            style={styles.surahSection}
                        >
                            {/* Only show mini header if more than one surah */}
                            {surahGroups.length > 1 && (
                                <View style={styles.miniSurahHeader}>
                                    <Text style={styles.surahName}>
                                        Surah {group.surahId}
                                    </Text>
                                </View>
                            )}

                            <View style={styles.textContainer}>
                                <Text style={styles.ayahStream}>
                                    {group.verses.map((verse) => (
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
                </View>
            </View>
        </ScrollView>
    );
}

/* -------------------- STYLES -------------------- */
const styles = StyleSheet.create({
    container: { flex: 1 },

    scrollContent: {
        alignItems: 'center',
    },

    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    /* Mushaf Page Look */
    mushafPage: {
        backgroundColor: '#ffffffff',
        width: '100%',
        maxWidth: 480,
        paddingVertical: 40,
        borderWidth: 1,
        borderColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
        position: 'relative',
    },

    innerBorder: {
        position: 'absolute',
        borderRadius: 18,
        opacity: 0.9,
        pointerEvents: 'none',
    },

    /* Header */
    header: {
        alignItems: 'center',
        marginBottom: 30,
        paddingHorizontal: 20,
    },

    juzLabel: {
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 22,
        marginBottom: 12,
        textTransform: 'uppercase',
        color: '#b59453',
    },

    surahFrameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    surahFrame: {
        backgroundColor: '#ffffff',
        borderWidth: 1.5,
        borderColor: '#b59453',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 12,
    },

    surahFrameSideLine: {
        width: 25,
        height: 1,
        backgroundColor: '#b59453',
        marginHorizontal: 5,
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
    },

    /* Clean Content */
    contentWrapper: {
        paddingTop: 10,
    },

    surahSection: {
        marginBottom: 28,
    },

    miniSurahHeader: {
        alignItems: 'center',
        marginBottom: 12,
    },

    surahName: {
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: '#b59453',
        opacity: 0.8,
    },

    textContainer: {
        paddingHorizontal: 30,
    },

    ayahStream: {
        writingDirection: 'rtl',
        textAlign: 'justify',
        fontSize: 24,
        lineHeight: 42,
    },
});
