import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Platform } from 'react-native';
import { Bookmark, ArrowRight } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

export default function ContinueReadingCard() {
    const { isDarkMode } = useTheme();

    const lastRead = {
        title: "CONTINUE READING",
        surahArabic: "سورة الفاتحة",
        surahEnglish: "Surah Al-Fatiha",
        ayahInfo: "Ayah 3 of 7",
        progress: 0.42,
    };

    // 🌑 The Luxury "Polarity" Logic
    // If it's light mode, the card is black. If it's dark mode, the card is white.
    const cardBg = isDarkMode ? '#FFFFFF' : '#000000';
    const textColor = isDarkMode ? '#000000' : '#FFFFFF';
    const subTextColor = isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)';
    const btnBg = isDarkMode ? '#000000' : '#FFFFFF';
    const btnText = isDarkMode ? '#FFFFFF' : '#000000';

    return (
        <View style={styles.outerWrapper}>
            <View style={[styles.container, { backgroundColor: cardBg }]}>

                {/* 1. TOP SECTION: Minimalist Header */}
                <View style={styles.header}>
                    <View style={styles.badge}>
                        <Bookmark color={textColor} size={12} fill={textColor} />
                        <Text style={[styles.badgeText, { color: textColor }]}>{lastRead.title}</Text>
                    </View>
                    <View style={[styles.dot, { backgroundColor: subTextColor }]} />
                </View>

                {/* 2. MIDDLE SECTION: Elegant Typography */}
                <View style={styles.body}>
                    <View>
                        <Text style={[styles.englishTitle, { color: textColor }]}>{lastRead.surahEnglish}</Text>
                        <Text style={[styles.ayahText, { color: subTextColor }]}>{lastRead.ayahInfo}</Text>
                    </View>
                    <Text style={[styles.arabicText, { color: textColor }]}>{lastRead.surahArabic}</Text>
                </View>

                {/* 3. FOOTER SECTION: Progress & Action */}
                <View style={styles.footer}>
                    <View style={styles.progressBox}>
                        <View style={[styles.track, { backgroundColor: subTextColor + '33' }]}>
                            <View style={[styles.fill, { width: `${lastRead.progress * 100}%`, backgroundColor: textColor }]} />
                        </View>
                        <Text style={[styles.percent, { color: textColor }]}>
                            {Math.round(lastRead.progress * 100)}% <Text style={{fontWeight: '400', color: subTextColor}}>read</Text>
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.actionBtn, { backgroundColor: btnBg }]}
                        activeOpacity={0.9}
                    >
                        <Text style={[styles.btnLabel, { color: btnText }]}>Resume</Text>
                        <ArrowRight color={btnText} size={14} strokeWidth={3} />
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    outerWrapper: {
        width: width - 32,
        alignSelf: 'center',
        marginVertical: 15,
        // Sharp, modern shadow
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.1,
                shadowRadius: 15,
            },
            android: { elevation: 6 },
        }),
    },
    container: {
        borderRadius: 24,
        padding: 24,
        // Fine border for definition
        borderWidth: 1,
        borderColor: 'rgba(150,150,150,0.1)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1.5,
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 30,
    },
    englishTitle: {
        fontSize: 24,
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 2,
    },
    ayahText: {
        fontSize: 13,
        fontWeight: '600',
    },
    arabicText: {
        fontSize: 34,
        fontFamily: 'ArabicFont',
        lineHeight: 45,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
    },
    progressBox: {
        flex: 1,
    },
    track: {
        height: 3,
        borderRadius: 1.5,
        marginBottom: 8,
    },
    fill: {
        height: '100%',
        borderRadius: 1.5,
    },
    percent: {
        fontSize: 12,
        fontWeight: '800',
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        gap: 6,
    },
    btnLabel: {
        fontSize: 14,
        fontWeight: '800',
    },
});
