import React, { createContext, useState, useContext, useMemo, ReactNode } from 'react';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

// --- 1. Black & White Theme Definitions ---
const CustomColors = {
    light: {
        background: '#FFFFFF',      // White background
        card: '#F9F9F9',           // Slightly off-white card
        textPrimary: '#111111',     // Black main text
        textSecondary: '#4B5563',   // Gray secondary text
        border: '#E5E7EB',          // Light gray borders
        primary: '#111111',          // Primary accent color (icons/buttons)
    },
    dark: {
        background: '#0A0A0A',      // Black background
        card: '#1A1A1A',            // Dark card
        textPrimary: '#FFFFFF',     // White main text
        textSecondary: '#9CA3AF',   // Gray secondary text
        border: '#2C2C2C',          // Dark borders
        primary: '#FFFFFF',          // Primary accent color (icons/buttons)
    },
};

// --- 2. Paper Theme ---
const getAppTheme = (isDark: boolean) => {
    const baseTheme = isDark ? MD3DarkTheme : MD3LightTheme;
    const colors = isDark ? CustomColors.dark : CustomColors.light;

    return {
        ...baseTheme,
        dark: isDark,
        colors: {
            ...baseTheme.colors,
            primary: colors.primary,
            background: colors.background,
            surface: colors.card,
            text: colors.textPrimary,
            onSurface: colors.textPrimary,
            border: colors.border,
            backdrop: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)',
        },
    };
};

// --- 3. Context ---
interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
    appTheme: ReturnType<typeof getAppTheme>;
    colors: typeof CustomColors.light;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// --- 4. Provider ---
interface ThemeProviderProps { children: ReactNode; }

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleTheme = () => setIsDarkMode(prev => !prev);

    const appTheme = useMemo(() => getAppTheme(isDarkMode), [isDarkMode]);
    const customColors = isDarkMode ? CustomColors.dark : CustomColors.light;

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, appTheme, colors: customColors }}>
            {children}
        </ThemeContext.Provider>
    );
};

// --- 5. Hook ---
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within a ThemeProvider');
    return context;
};
