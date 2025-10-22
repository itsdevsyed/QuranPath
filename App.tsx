import "./global.css"
import React from 'react';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppLoading from './src/components/AppLoading';
import ErrorBoundary from './src/components/ErrorBoundary';
import AppNavigator from './src/navigation/AppNavigator';

const AppContentWithTheme = () => {
  const { appTheme, isDarkMode } = useTheme(); // Changed from isDark to isDarkMode

  return (
    <View className="flex-1 bg-background">
      <StatusBar
        backgroundColor={appTheme.colors?.background || '#ffffff'}
        barStyle={isDarkMode ? "light-content" : "dark-content"} // Fixed variable name
      />
      <AppNavigator />
    </View>
  );
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'ArabicFont': require('./assets/fonts/Ar.otf'),
  });

  if (!fontsLoaded && !fontError) {
    return <AppLoading />;
  }

  if (fontError) {
    return (
      <AppLoading
        message="Failed to load app resources. Please restart the app."
        isError={true}
      />
    );
  }

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <ThemeProvider>
          <NavigationContainer>
            <AppContentWithTheme />
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}