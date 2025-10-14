import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import BottomNavbar from './src/components/BottomNavBar';
import { NavigationContainer } from '@react-navigation/native';
// 🌟 1. REQUIRED: Import useFonts from expo-font 🌟
import { useFonts } from 'expo-font';

const MainAppContent = () => {
  const { appTheme } = useTheme();

  return (
    <PaperProvider theme={appTheme}>
      <BottomNavbar />
    </PaperProvider>
  );
};

export default function App() {
  // 🌟 2. REQUIRED: Load the custom font before rendering the app 🌟
  // This uses the path relative to this App.tsx file.
  const [fontsLoaded] = useFonts({
    // 'ArabicFont' is the key name we used in ThemeContext.tsx
    'ArabicFont': require('./assets/fonts/Arabic.ttf'),
  });

  // If the font hasn't loaded yet, return null (or a splash screen)
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <MainAppContent />
      </NavigationContainer>
    </ThemeProvider>
  );
}
