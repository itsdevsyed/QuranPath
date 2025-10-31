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

    const currentDayIndex = new Date().getDay();
    const adjustedDayIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    const defaultActiveBg = activeDayBg || appTheme.colors.primary;
    const defaultActiveText = activeDayText || '#FFFFFF';
    const defaultInactiveText = inactiveDayText || '#6B7280';

    return (
        <View style={styles.dayTracker}>
            {days.map((day, index) => {
                const isActive = index === adjustedDayIndex;
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
                                {
                                    color: isActive ? defaultActiveText : defaultInactiveText,
                                },
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
    dayTracker: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    dayBubble: {
        width: 28,
        height: 28,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
    },
    dayText: {
        fontSize: 12,
        fontWeight: '700'
    },
});