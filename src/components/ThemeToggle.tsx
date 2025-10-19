import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
    const { isDarkMode, toggleTheme, colors } = useTheme();

    const iconName = isDarkMode ? 'sun' : 'moon';
    const iconColor = colors.textPrimary;

    return (
        <TouchableOpacity
            style={styles.toggleButton}
            onPress={toggleTheme}
            activeOpacity={0.7}
        >
            <Icon
                name={iconName}
                size={20}
                color={iconColor}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    toggleButton: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
});