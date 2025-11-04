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
                    {
                        color: colors.textPrimary,
                    }
                ]}
            >
                {text.replace(/ /g, '‎ ')}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 8,
    },
    arabicText: {
        fontFamily: 'ArabicFont',
        fontSize: 26,
        lineHeight: 54,
        writingDirection: 'rtl',
        textAlign: 'justify',
        textAlignVertical: 'center',
    },
});

export default AyahText;