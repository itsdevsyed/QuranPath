import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export type Tab = 'surahs' | 'juz' | 'bookmarks'; // Exporting the type for use in MushafScreen

const tabs: { key: Tab; label: string }[] = [
    { key: 'surahs', label: 'Surahs' },
    { key: 'juz', label: 'Juz' },
    { key: 'bookmarks', label: 'Bookmarks' },
];

type TabSegmentProps = {
    // 🌟 NEW PROP: Function to communicate the tab change to the parent component (MushafScreen)
    onTabChange: (tab: Tab) => void;
    // 🌟 PROP: MushafScreen will now control the active state
    activeTab: Tab;
};

// 🌟 UPDATED: Component now accepts props for external control 
export default function TabSegment({ onTabChange, activeTab }: TabSegmentProps) {
    const { isDarkMode, colors } = useTheme();

    // Dynamic colors using only existing theme properties
    const segmentBg = colors.card; // Use your theme card color for segment background
    const inactiveText = isDarkMode ? '#B0B0B0' : '#6B7280';
    const activeBgColor = isDarkMode ? '#1F2937' : '#FFFFFF';
    const activeTextColor = isDarkMode ? '#FFFFFF' : '#111827';

    // Shadows
    const shadowProps: ViewStyle = isDarkMode
        ? { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 2, elevation: 2 }
        : { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 3, elevation: 3 };

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            backgroundColor: segmentBg,
            borderRadius: 12,
            marginHorizontal: 16,
            marginVertical: 16,
            padding: 4,
        } as ViewStyle,
        tabButton: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            borderRadius: 8,
        } as ViewStyle,
        tabButtonActive: {
            backgroundColor: activeBgColor,
            ...shadowProps,
        } as ViewStyle,
        tabText: {
            fontSize: 14,
            fontWeight: '600',
            textAlign: 'center',
            color: inactiveText,
        } as TextStyle,
        tabTextActive: {
            color: activeTextColor,
        } as TextStyle,
    });

    return (
        <View style={styles.container}>
            {tabs.map((tab) => {
                const isActive = tab.key === activeTab;

                return (
                    <TouchableOpacity
                        key={tab.key}
                        // 🌟 ACTION: Call the onTabChange prop instead of local state update
                        onPress={() => onTabChange(tab.key)}
                        style={[styles.tabButton, isActive && styles.tabButtonActive]}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
