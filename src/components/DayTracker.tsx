// src/components/DayTracker.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

type DayTrackerProps = {
    activeDayBg?: string;
    activeDayText?: string;
    inactiveDayText?: string;
};

export default function DayTracker({
    activeDayBg,
    activeDayText,
    inactiveDayText,
}: DayTrackerProps) {
    const { appTheme } = useTheme();

    const currentDayIndex = 4; // Example: Friday
    const days = ['M', 'T', 'W', 'T', 'F'];

    const defaultActiveBg = activeDayBg || appTheme.colors.primary;
    const defaultActiveText = activeDayText || '#FFFFFF';
    const defaultInactiveText = inactiveDayText || '#6B7280'; // gray fallback

    return (
        <View style={styles.dayTracker}>
            {days.map((day, index) => {
                const isActive = index === currentDayIndex;
                return (
                    <View
                        key={`${day}-${index}`}
                        style={[
                            styles.dayBubble,
                            { backgroundColor: isActive ? defaultActiveBg : 'transparent' },
                        ]}
                    >
                        <Text
                            style={[
                                styles.dayText,
                                { color: isActive ? defaultActiveText : defaultInactiveText },
                            ]}
                        >
                            {day}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    dayTracker: { flexDirection: 'row', alignItems: 'center' },
    dayBubble: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 6,
    },
    dayText: { fontSize: 12, fontWeight: '700' },
});
