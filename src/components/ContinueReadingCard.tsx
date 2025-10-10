// ContinueReadingCard.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { Repeat2 } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

export default function ContinueReadingCard() {
    const { colors, isDarkMode } = useTheme();

    const lastRead = {
        title: "Continue Reading",
        surahArabic: "سورة الفاتحة",
        surahEnglish: "Surah Al-Fatiha",
        ayahInfo: "Ayah 3/7",
    };

    const cardBackground = isDarkMode ? colors.card : colors.card;
    const cardBorderColor = isDarkMode ? colors.border : colors.border;
    const titleColor = isDarkMode ? '#FFFFFF' : '#111827';
    const arabicColor = isDarkMode ? '#FFFFFF' : '#111827';
    const subTextColor = isDarkMode ? '#D1D5DB' : '#6B7280';
    const buttonBg = isDarkMode ? '#FFFFFF' : '#111827'; // WHITE button in dark mode
    const buttonTextColor = isDarkMode ? '#111827' : '#FFFFFF'; // BLACK text in dark mode
    const iconColor = isDarkMode ? '#FFFFFF' : '#111827';

    const shadowProps = isDarkMode
        ? { shadowColor: '#000', shadowOpacity: 0.3, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 3 }
        : { shadowColor: 'rgba(0,0,0,0.1)', shadowOpacity: 0.3, shadowOffset: { width: 0, height: 4 }, shadowRadius: 6, elevation: 5 };

    const styles = StyleSheet.create({
        cardContainer: {
            width: width - 24,
            alignSelf: 'center',
            marginVertical: 16,
            padding: 20,
            backgroundColor: cardBackground,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: cardBorderColor,
            ...shadowProps,
        },
        header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
        icon: { marginRight: 10 },
        title: { fontSize: 16, fontWeight: '700', color: titleColor },
        surahArabic: { fontSize: 32, fontWeight: 'bold', color: arabicColor, textAlign: 'right', marginBottom: 6 },
        surahEnglishInfo: { fontSize: 16, color: subTextColor, marginBottom: 20 },
        readButton: {
            backgroundColor: buttonBg,
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 12,
            alignSelf: 'flex-start',
            ...shadowProps,
        },
        readButtonText: { fontSize: 16, fontWeight: '700', color: buttonTextColor },
    });

    return (
        <View style={styles.cardContainer}>
            <View style={styles.header}>
                <Repeat2 color={iconColor} size={24} style={styles.icon} />
                <Text style={styles.title}>{lastRead.title}</Text>
            </View>
            <Text style={styles.surahArabic}>{lastRead.surahArabic}</Text>
            <Text style={styles.surahEnglishInfo}>{lastRead.surahEnglish} • {lastRead.ayahInfo}</Text>
            <TouchableOpacity style={styles.readButton} activeOpacity={0.8}>
                <Text style={styles.readButtonText}>Start Reading</Text>
            </TouchableOpacity>
        </View>
    );
}
