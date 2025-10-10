// TopNavbar.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import DayTracker from './DayTracker';
import ThemeToggle from './ThemeToggle';

export default function TopNavbar() {
    const { colors, isDarkMode } = useTheme();

    const styles = StyleSheet.create({
        safeArea: {
            backgroundColor: colors.card,
            borderBottomColor: colors.border,
            borderBottomWidth: 1,
        },
        container: {
            height: 64,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
        },
        greetingText: {
            fontSize: 18,
            fontWeight: '600',
            color: colors.textPrimary,
        },
        rightGroup: {
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 12,
        },
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.greetingText}>As-salamu alaykum</Text>
                <View style={styles.rightGroup}>
                    <DayTracker
                        activeDayBg={isDarkMode ? '#FFFFFF' : '#111827'}   // white bg in dark mode
                        activeDayText={isDarkMode ? '#111827' : '#FFFFFF'} // black text in dark mode
                        inactiveDayText={isDarkMode ? '#F1F5F9' : '#6B7280'} // subtle gray
                    />
                    <ThemeToggle />
                </View>
            </View>
        </SafeAreaView>
    );
}
