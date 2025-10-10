import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
    // 1. Consume the global theme state and toggle function
    const { isDarkMode, toggleTheme, colors } = useTheme();

    // Determine the icon and color dynamically
    const iconName = isDarkMode ? 'sun' : 'moon';
    const iconColor = colors.textPrimary;

    return (
        <TouchableOpacity
            style={styles.toggleButton}
            onPress={toggleTheme} // Call the global toggle function
            activeOpacity={0.7}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
            <Icon
                name={iconName}
                size={20}
                color={iconColor} // Dynamic color
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
