import React, { createContext, useState, useContext, useMemo, ReactNode } from 'react';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

const CustomColors = {
    light: { background: '#FFFFFF', card: '#F9F9F9', textPrimary: '#111', textSecondary: '#4B5563', border: '#E5E7EB', primary: '#111', primaryAccent: '#1F2937' },
    dark: { background: '#0A0A0A', card: '#1A1A1A', textPrimary: '#FFF', textSecondary: '#9CA3AF', border: '#2C2C2C', primary: '#FFF', primaryAccent: '#F9FAFB' },
};

const getAppTheme = (isDark: boolean) => {
    const baseTheme = isDark ? MD3DarkTheme : MD3LightTheme;
    const colors = isDark ? CustomColors.dark : CustomColors.light;
    return {
        ...baseTheme,
        dark: isDark,
        colors: { ...baseTheme.colors, ...colors, isDarkMode: isDark },
        fonts: { ...baseTheme.fonts, bodyMedium: { ...baseTheme.fonts.bodyMedium, fontFamily: 'ArabicFont' }, bodyLarge: { ...baseTheme.fonts.bodyLarge, fontFamily: 'ArabicFont' }, titleMedium: { ...baseTheme.fonts.titleMedium, fontFamily: 'ArabicFont' }, titleLarge: { ...baseTheme.fonts.titleLarge, fontFamily: 'ArabicFont' } },
    };
};

interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
    appTheme: ReturnType<typeof getAppTheme>;
    colors: typeof CustomColors.light;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleTheme = () => setIsDarkMode(prev => !prev);
    const appTheme = useMemo(() => getAppTheme(isDarkMode), [isDarkMode]);
    const colors = isDarkMode ? CustomColors.dark : CustomColors.light;

    const value = useMemo(() => ({ isDarkMode, toggleTheme, appTheme, colors }), [isDarkMode, appTheme, colors]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within a ThemeProvider');
    return context;
};
