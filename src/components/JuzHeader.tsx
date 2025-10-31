import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface JuzHeaderProps {
    juzNumber: number;
    verseCount: number;
    title: string;
}

const JuzHeader: React.FC<JuzHeaderProps> = ({ juzNumber, verseCount, title }) => {
    const { colors } = useTheme(); // Make sure you're using colors from useTheme

    return (
        <View style={[styles.header, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
                {title}
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Juz {juzNumber} • {verseCount} verses
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingVertical: 24,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        opacity: 0.8,
    },
});

export default JuzHeader;