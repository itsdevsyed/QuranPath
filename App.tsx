import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppLoading from './src/components/AppLoading';
import ErrorBoundary from './src/components/ErrorBoundary';
import AppNavigator from './src/navigation/AppNavigator';

const AppContentWithTheme = () => {
  const { appTheme } = useTheme();

  return (
    <PaperProvider theme={appTheme}>
      <StatusBar
        backgroundColor={appTheme.colors.background}
        barStyle={appTheme.dark ? "light-content" : "dark-content"}
      />
      <AppNavigator />
    </PaperProvider>
  );
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'ArabicFont': require('./assets/fonts/Arabic.ttf'),
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