import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export type TabItem = { key: string; label: string };

type TabSegmentProps = {
    tabs: TabItem[];
    activeTab: string;
    onTabChange: (tab: string) => void;
};

export default function TabSegment({ tabs, activeTab, onTabChange }: TabSegmentProps) {
    const { isDarkMode, colors } = useTheme();

    // 🌑 Pure Monochrome Dark Mode Logic
    // In Dark Mode: Container is nearly black, Active Pill is a dark gray/elevated surface
    // In Light Mode: Container is very light gray, Active Pill is pure white
    const containerBg = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';
    const activePillBg = isDarkMode ? '#1A1A1A' : '#FFFFFF';
    const borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';

    // Use the primary text color from theme
    const activeText = colors.textPrimary;
    const inactiveText = isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)';

    return (
        <View style={[styles.container, { backgroundColor: containerBg, borderColor: borderColor }]}>
            {tabs.map((tab) => {
                const isActive = tab.key === activeTab;

                return (
                    <TouchableOpacity
                        key={tab.key}
                        onPress={() => onTabChange(tab.key)}
                        style={[
                            styles.tabButton,
                            isActive && [styles.activeTabShadow, { backgroundColor: activePillBg }]
                        ]}
                        activeOpacity={0.8}
                    >
                        <Text style={[
                            styles.tabText,
                            { color: isActive ? activeText : inactiveText },
                            isActive && styles.boldText
                        ]}>
                            {tab.label}
                        </Text>

                        {/* 💎 Minimalist Dot indicator instead of a line for premium feel */}
                        {isActive && (
                            <View style={[styles.indicator, { backgroundColor: activeText }]} />
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50, // Slightly more compact
        marginHorizontal: 24,
        marginVertical: 12,
        padding: 4,
        borderRadius: 25,
        alignItems: 'center',
        borderWidth: 1,
    },
    tabButton: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 21,
        position: 'relative',
    },
    activeTabShadow: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    tabText: {
        fontSize: 13,
        letterSpacing: 0.8,
        fontWeight: '500',
        textTransform: 'uppercase', // Looks more premium in Black/White themes
    },
    boldText: {
        fontWeight: '800',
    },
    indicator: {
        position: 'absolute',
        bottom: 6,
        width: 4,
        height: 4,
        borderRadius: 2,
    }
});
