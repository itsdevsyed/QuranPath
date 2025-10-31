import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface SurahHeaderProps {
    name?: string;
    transliteration?: string;
    number?: number;
    totalVerses?: number;
    type?: 'Meccan' | 'Medinan';
    showBismillah?: boolean;
}

const SurahHeader: React.FC<SurahHeaderProps> = ({
    name = '',
    transliteration = '',
    number,
    totalVerses,
    type = 'Meccan',
    showBismillah = true,
}) => {
    const { appTheme } = useTheme();
    const colors = appTheme.colors;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Surah Arabic Name */}
            <Text style={[styles.surahName, { color: colors.textPrimary }]}>
                {name}
            </Text>

            {/* Transliteration */}
            {transliteration ? (
                <Text style={[styles.transliteration, { color: colors.textSecondary }]}>
                    {transliteration}
                </Text>
            ) : null}

            {/* Decorative Divider */}
            <View style={[styles.decorativeLineContainer]}>
                <View style={[styles.decorativeLine, { backgroundColor: colors.border }]} />
            </View>

            {/* Surah Info Row */}
            <View style={styles.infoRow}>
                {number && (
                    <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                        Surah {number}
                    </Text>
                )}

                <Text style={[styles.dot, { color: colors.textSecondary }]}>•</Text>

                <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                    {type}
                </Text>

                {totalVerses && (
                    <>
                        <Text style={[styles.dot, { color: colors.textSecondary }]}>•</Text>
                        <Text style={[styles.infoText, { color: colors.textSecondary }]}>
                            {totalVerses} Verses
                        </Text>
                    </>
                )}
            </View>

            {/* Optional Bismillah */}
            {showBismillah && (
                <Text style={[styles.basmala, { color: colors.textPrimary }]}>
                    بِسْمِ ٱللّٰهِ ٱلرَّحْمٰنِ ٱلرَّحِيمِ
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    surahName: {
        fontFamily: 'ArabicFont',
        fontSize: 30,
        lineHeight: 40,
        textAlign: 'center',
        letterSpacing: 1,
    },
    transliteration: {
        fontSize: 15,
        marginTop: 4,
        fontWeight: '400',
        letterSpacing: 0.3,
        textAlign: 'center',
        opacity: 0.8,
    },
    decorativeLineContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    decorativeLine: {
        width: 80,
        height: 2,
        borderRadius: 2,
        opacity: 0.5,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
    },
    infoText: {
        fontSize: 13,
        fontWeight: '500',
        textTransform: 'capitalize',
    },
    dot: {
        marginHorizontal: 6,
        fontSize: 14,
        opacity: 0.7,
    },
    basmala: {
        fontFamily: 'ArabicFont',
        fontSize: 24,
        textAlign: 'center',
        lineHeight: 36,
        marginTop: 8,
    },
});

export default SurahHeader;
