import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface QuranTextProps {
    verseText: string;
}

const QuranText: React.FC<QuranTextProps> = ({ verseText }) => {
    return <Text style={styles.arabic}>{verseText}</Text>;
};

const styles = StyleSheet.create({
    arabic: {
        fontFamily: 'ArabicFont',
        fontSize: 22,
        lineHeight: 50, // ✅ more proportional (not too tall)
        textAlign: 'right',
        color: '#111',
        writingDirection: 'rtl',
        marginBottom: 8, // ✅ prevents clipping when stacked
    },
});

export default QuranText;
