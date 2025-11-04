import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface ModernJuzHeaderProps {
    title: string;
    juzNumber: number;
    verseCount: number;
}

const ModernJuzHeader: React.FC<ModernJuzHeaderProps> = ({ title, juzNumber, verseCount }) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.card }]}>
            <View style={styles.inner}>
                <Text style={[styles.juzBadge, { color: colors.primary, borderColor: colors.primary }]}>
                    Juz {juzNumber}
                </Text>

                <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={2}>
                    {title}
                </Text>

                <Text style={[styles.subText, { color: colors.textSecondary }]}>
                    {verseCount} verses
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        paddingVertical: 28,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
    },
    inner: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    juzBadge: {
        fontSize: 13,
        fontWeight: '600',
        borderWidth: 1.2,
        borderRadius: 50,
        paddingVertical: 4,
        paddingHorizontal: 12,
        marginBottom: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 50,
        marginBottom: 10,
    },
    subText: {
        fontSize: 14,
        opacity: 0.8,
    },
});

export default ModernJuzHeader;
