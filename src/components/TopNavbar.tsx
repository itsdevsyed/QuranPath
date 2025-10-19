import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import DayTracker from './DayTracker';
import ThemeToggle from './ThemeToggle';

export default function TopNavbar() {
    const { colors, isDarkMode } = useTheme();

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.card }]}>
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
        borderBottomColor: '#E5E7EB',
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
    },
    rightGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 12,
    },
});