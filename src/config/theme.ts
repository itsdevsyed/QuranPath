// src/config/theme.ts
import { MD3LightTheme } from 'react-native-paper';

export const customTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2c3e50',       // Deep blue-gray
    onPrimary: '#ffffff',     // Text on primary
    secondary: '#7f8c8d',     // Soft gray
    background: '#fdfcfb',    // Light background
    surface: '#ffffff',       // Card surface
    text: '#2c3e50',          // Default text
  },
};
