import React, { useMemo } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useRoute, RouteProp } from '@react-navigation/native';
import AyahText from '../components/AyahText';
import SurahHeader from '../components/SurahHeader';

type RootStackParamList = {
    JuzVersesPage: {
        juzNumber: number;
        title: string;
    };
};

type JuzVersesRouteProp = RouteProp<RootStackParamList, 'JuzVersesPage'>;

type Verse = {
    id: number;
    text: string;
    juzz_number: number;
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

// Import your Quran data
import quranData from '../../assets/quran/quran.json';

// Convert integer to Arabic-Indic string
const toArabicIndic = (n: number | string | undefined) => {
    if (n == null) return '';
    const s = String(n);
    const map = ['\u0660', '\u0661', '\u0662', '\u0663', '\u0664', '\u0665', '\u0666', '\u0667', '\u0668', '\u0669'];
    return s.split('').map(ch => {
        if (/\d/.test(ch)) return map[Number(ch)];
        return ch;
    }).join('');
};

export default function JuzVersesPage() {
    const route = useRoute<JuzVersesRouteProp>();
    const { juzNumber, title } = route.params;
    const { colors } = useTheme(); // Changed from appTheme to colors

    // Get all verses for the specific juz grouped by surah
    const juzContent = useMemo(() => {
        const surahGroups: Array<{
            surah: Surah;
            verses: Verse[];
            showBismillah: boolean;
        }> = [];

        // Iterate through all surahs and collect verses for this juz
        quranData.forEach((surah: Surah) => {
            const surahVersesInJuz = surah.verses.filter(
                (verse: Verse) => verse.juzz_number === juzNumber
            );

            if (surahVersesInJuz.length > 0) {
                // Check if we should show Bismillah for this surah
                // Don't show Bismillah for Surah At-Tawbah (Surah 9)
                const showBismillah = surah.id !== 9;

                surahGroups.push({
                    surah,
                    verses: surahVersesInJuz,
                    showBismillah
                });
            }
        });

        // Sort surah groups by surah ID to maintain proper order
        surahGroups.sort((a, b) => a.surah.id - b.surah.id);

        return {
            surahGroups,
            totalVerseCount: surahGroups.reduce((total, group) => total + group.verses.length, 0)
        };
    }, [juzNumber]);

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: colors.background }]}
            showsVerticalScrollIndicator={false}
        >
            {/* Compact Juz Header - FIXED */}
            <View style={[styles.header, { backgroundColor: colors.card }]}>
                <Text style={[styles.title, { color: colors.textPrimary }]}>
                    {title}
                </Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                    {juzContent.totalVerseCount} verses
                </Text>
            </View>

            {/* Quranic Text with Compact Surah Headers */}
            <View style={styles.contentContainer}>
                {juzContent.surahGroups.map((group, groupIndex) => (
                    <View key={group.surah.id} style={styles.surahSection}>
                        {/* Compact Surah Header for each new surah in the juz */}
                        <CompactSurahHeader
                            name={group.surah.name}
                            transliteration={group.surah.transliteration}
                            number={group.surah.id}
                            type={group.surah.type === 'medinan' ? 'Medinan' : 'Meccan'}
                            showBismillah={group.showBismillah && groupIndex > 0}
                        />

                        {/* Quranic verses for this surah in the juz */}
                        <View style={styles.textContainer}>
                            <AyahText
                                text={group.verses
                                    .map((ayah: Verse, idx: number) => {
                                        const num = ayah.id ?? idx + 1;
                                        return `${ayah.text} ${toArabicIndic(num)}`;
                                    })
                                    .join(' ')}
                            />
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

// Compact Surah Header Component - FIXED
const CompactSurahHeader: React.FC<{
    name?: string;
    transliteration?: string;
    number?: number;
    type?: 'Meccan' | 'Medinan';
    showBismillah?: boolean;
}> = ({
    name = '',
    transliteration = '',
    number,
    type = 'Meccan',
    showBismillah = true,
}) => {
        const { colors } = useTheme(); // Changed from appTheme to colors

        return (
            <View style={[styles.compactContainer, { backgroundColor: colors.background }]}>
                {/* Surah Arabic Name */}
                <Text style={[styles.compactSurahName, { color: colors.textPrimary }]}>
                    {name}
                </Text>

                {/* Transliteration and Info in one line */}
                <View style={styles.compactInfoRow}>
                    <Text style={[styles.compactTransliteration, { color: colors.textSecondary }]}>
                        {transliteration}
                    </Text>
                    <Text style={[styles.dot, { color: colors.textSecondary }]}>•</Text>
                    <Text style={[styles.compactInfoText, { color: colors.textSecondary }]}>
                        Surah {number}
                    </Text>
                    <Text style={[styles.dot, { color: colors.textSecondary }]}>•</Text>
                    <Text style={[styles.compactInfoText, { color: colors.textSecondary }]}>
                        {type}
                    </Text>
                </View>

                {/* Optional Bismillah - Compact */}
                {showBismillah && (
                    <Text style={[styles.compactBasmala, { color: colors.textPrimary }]}>
                        بِسْمِ ٱللّٰهِ ٱلرَّحْمٰنِ ٱلرَّحِيمِ
                    </Text>
                )}
            </View>
        );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 13,
        textAlign: 'center',
        marginTop: 2,
        opacity: 0.8,
    },
    contentContainer: {
        paddingBottom: 10,
    },
    surahSection: {
        marginBottom: 4,
    },
    textContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    // Compact Header Styles
    compactContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    compactSurahName: {
        fontFamily: 'ArabicFont',
        fontSize: 30,
        lineHeight: 32,
        textAlign: 'center',
        letterSpacing: 1,
    },
    compactInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
        marginBottom: 8,
    },
    compactTransliteration: {
        fontSize: 13,
        fontWeight: '500',
        letterSpacing: 0.3,
        opacity: 0.8,
    },
    compactInfoText: {
        fontSize: 12,
        fontWeight: '500',
        textTransform: 'capitalize',
        opacity: 0.8,
    },
    dot: {
        marginHorizontal: 6,
        fontSize: 12,
        opacity: 0.7,
    },
    compactBasmala: {
        fontFamily: 'ArabicFont',
        fontSize: 22,
        textAlign: 'center',
        lineHeight: 28,
        marginTop: 4,
    },
});