import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import DayTracker from './DayTracker';
import ThemeToggle from './ThemeToggle';

export default function TopNavbar() {
    const { colors, isDarkMode } = useTheme();

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <View style={styles.container}>
                <Text style={[styles.greetingText, { color: colors.textPrimary }]}>
                    QuranPath
                </Text>
                <View style={styles.rightGroup}>
                    <DayTracker
                        activeDayBg={isDarkMode ? '#FFFFFF' : '#111827'}
                        activeDayText={isDarkMode ? '#111827' : '#FFFFFF'}
                        inactiveDayText={isDarkMode ? '#F1F5F9' : '#6B7280'}
                    />
                    <ThemeToggle />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    container: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    greetingText: {
        fontSize: 20,
        fontWeight: '700',
        fontFamily: 'ArabicFont',
    },
    rightGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
});