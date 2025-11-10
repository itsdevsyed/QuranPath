import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface AyahTextProps {
    text: string;
}

const AyahText: React.FC<AyahTextProps> = ({ text }) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text
                style={[
                    styles.arabicText,
                    { color: colors.textPrimary },
                ]}
            >
                {'\u200F' + text + '\u200F'}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    arabicText: {
        fontFamily: 'ArabicFont',        // use Quran-optimized font if possible
        fontSize: 26,
        lineHeight: 54,
        writingDirection: 'rtl',         // enforce RTL direction
        textAlign: 'justify',            // even line endings
        includeFontPadding: false,       // cleaner vertical alignment
        textAlignVertical: 'center',
        letterSpacing: 0.3,
    },
});

export default AyahText;
