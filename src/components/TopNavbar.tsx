import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TopNavbar() {
    const currentDayIndex = 4; // Placeholder: Thursday
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    return (
        <SafeAreaView style={{ backgroundColor: '#FFFFFF' }}>
            <View style={styles.container}>
                {/* LEFT: Greeting */}
                <View style={styles.greetingWrapper}>
                    <Text style={styles.greetingText}>As-salamu alaykum</Text>
                </View>

                {/* RIGHT: Day Tracker */}
                <View style={styles.dayTracker}>
                    {days.map((day, index) => {
                        const isCurrentDay = index === currentDayIndex;
                        return (
                            <View
                                key={`${day}-${index}`} // ✅ Unique key fix
                                style={[styles.dayBubble, isCurrentDay && styles.dayBubbleActive]}
                            >
                                <Text style={[styles.dayText, isCurrentDay && styles.dayTextActive]}>
                                    {day}
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 64,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB', // Soft gray
        paddingHorizontal: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    greetingWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    greetingText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    dayTracker: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dayBubble: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 6,
        backgroundColor: 'transparent',
    },
    dayBubbleActive: {
        backgroundColor: '#2563EB', // Blue-600 professional highlight
    },
    dayText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#6B7280', // Gray for inactive days
    },
    dayTextActive: {
        color: '#FFFFFF', // White for active day
    },
});
