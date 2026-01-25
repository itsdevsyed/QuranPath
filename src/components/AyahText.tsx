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
                    { color: colors.textPrimary }
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
        // DO NOT add fontFamily here—your global font handles it
        fontFamily: 'ArabicFont',        // use Quran-optimized font if possible
        fontSize: 36,
        lineHeight: 54,
        writingDirection: 'rtl',
        textAlign: 'justify',
        includeFontPadding: false,
        textAlignVertical: 'center',
        letterSpacing: 0.3,
    },
});

export default AyahText;
