import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import DayTracker from './DayTracker';

export default function TopNavbar() {
    const { colors, isDarkMode } = useTheme();

    return (
        <SafeAreaView
            edges={['top']}
            style={[styles.safeArea, { backgroundColor: colors.background }]}
        >
            <View style={styles.container}>
                {/* Logo Section with a modern accent */}
                <View style={styles.logoWrapper}>
                    <Text style={[styles.logoText, { color: colors.primaryAccent }]}>
                        Quran<Text style={{ color: colors.textPrimary }}>Path</Text>
                    </Text>
                    <View style={[styles.activeDot, { backgroundColor: colors.primaryAccent }]} />
                </View>

                {/* Right Group with subtle background pill */}
                <View style={[
                    styles.rightGroup,
                    { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }
                ]}>
                    <DayTracker
                        activeDayBg={colors.primaryAccent} // Use your theme's accent color
                        activeDayText={isDarkMode ? '#000' : '#FFF'}
                        inactiveDayText={isDarkMode ? '#94A3B8' : '#64748B'}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        // Soft shadow instead of a harsh border
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
        zIndex: 10,
    },
    container: {
        height: 70, // Increased height for a "breathable" design
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logoWrapper: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    logoText: {
        fontSize: 22,
        fontWeight: '800', // Heavier weight for a modern brand look
        letterSpacing: -0.5,
    },
    activeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginLeft: 4,
    },
    rightGroup: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20, // Pill shape
        flexDirection: 'row',
        alignItems: 'center',
    },
});
