import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import BottomNavbar from './src/components/BottomNavBar';

const MainAppContent = () => {
  const { appTheme } = useTheme();

  return (
    <PaperProvider theme={appTheme}>
      {/* BottomNavbar handles all screens */}
      <BottomNavbar />
    </PaperProvider>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <MainAppContent />
    </ThemeProvider>
  );
}
