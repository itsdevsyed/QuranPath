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
        textAlign: 'right',
        lineHeight: 40,
        color: '#111',
        writingDirection: 'rtl',
    },
});

export default QuranText;
