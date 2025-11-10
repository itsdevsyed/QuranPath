import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface QuranTextProps {
    verseText: string;
}

const QuranText: React.FC<QuranTextProps> = ({ verseText }) => {
    return (
        <Text
            style={styles.arabic}
            numberOfLines={0}
            allowFontScaling={false}
        >
            {verseText}
        </Text>
    );
};

const styles = StyleSheet.create({
    arabic: {
        fontFamily: 'ArabicFont',      // Replace with your Arabic/Quran font
        fontSize: 30,
        lineHeight: 50,                // proportional spacing
        textAlign: 'justify',          // fixes last line alignment
        writingDirection: 'rtl',       // ensures lines start from the right
        marginBottom: 8,
        color: '#111',
    },
});

export default QuranText;
