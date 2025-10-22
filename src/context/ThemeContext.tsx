import React, { createContext, useState, useContext, useMemo, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

const CustomColors = {
    light: {
        background: '#FFFFFF',
        card: '#F9F9F9',
        textPrimary: '#111',
        textSecondary: '#4B5563',
        border: '#E5E7EB',
        primary: '#111',
        primaryAccent: '#1F2937'
    },
    dark: {
        background: '#0A0A0A',
        card: '#1A1A1A',
        textPrimary: '#FFF',
        textSecondary: '#9CA3AF',
        border: '#2C2C2C',
        primary: '#FFF',
        primaryAccent: '#F9FAFB'
    },
};

// Create theme without Paper dependencies
const getAppTheme = (isDark: boolean) => {
    const colors = isDark ? CustomColors.dark : CustomColors.light;
    return {
        dark: isDark,
        colors: {
            ...colors,
            // Add any additional color keys needed for your app
            surface: colors.card,
            onSurface: colors.textPrimary,
            error: '#FF3B30',
            success: '#34C759',
            warning: '#FF9500',
        },
        fonts: {
            bodyMedium: { fontFamily: 'ArabicFont', fontSize: 14, lineHeight: 20 },
            bodyLarge: { fontFamily: 'ArabicFont', fontSize: 16, lineHeight: 24 },
            titleMedium: { fontFamily: 'ArabicFont', fontSize: 18, lineHeight: 24, fontWeight: '500' },
            titleLarge: { fontFamily: 'ArabicFont', fontSize: 22, lineHeight: 28, fontWeight: 'bold' },
            regular: { fontFamily: 'ArabicFont' },
            medium: { fontFamily: 'ArabicFont', fontWeight: '500' },
            bold: { fontFamily: 'ArabicFont', fontWeight: 'bold' },
        },
    };
};

interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
    appTheme: ReturnType<typeof getAppTheme>;
    colors: typeof CustomColors.light | typeof CustomColors.dark;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const systemColorScheme = useColorScheme();
    const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

    const toggleTheme = () => setIsDarkMode(prev => !prev);
    const appTheme = useMemo(() => getAppTheme(isDarkMode), [isDarkMode]);
    const colors = isDarkMode ? CustomColors.dark : CustomColors.light;

    const value = useMemo(() => ({
        isDarkMode,
        toggleTheme,
        appTheme,
        colors
    }), [isDarkMode, appTheme, colors]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within a ThemeProvider');
    return context;
};