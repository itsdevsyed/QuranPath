import "./global.css";
import React, { useEffect } from "react";
import { StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import { ThemeProvider, useTheme } from "./src/context/ThemeContext";
import AppNavigator from "./src/navigation/AppNavigator";
import AppLoading from "./src/components/AppLoading";
import ErrorBoundary from "./src/components/ErrorBoundary";

// ⚡ Inner content that reacts to theme changes
const AppContentWithTheme = () => {
  const { appTheme, isDarkMode } = useTheme();

  // Sync status bar background instantly when theme changes
  useEffect(() => {
    StatusBar.setBackgroundColor(
      appTheme.colors?.background || "#ffffff",
      true
    );
  }, [appTheme.colors?.background]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appTheme.colors?.background || "#ffffff",
      }}
    >
      <StatusBar
        backgroundColor={appTheme.colors?.background || "#ffffff"}
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        translucent={false}
      />
      <AppNavigator />
    </View>
  );
};

// ⚡ Main App Component
export default function App() {
  // Load custom Arabic font
  const [fontsLoaded, fontError] = useFonts({
    ArabicFont: require("./assets/fonts/Ar.otf"),
  });

  // Show loading screen until fonts are ready
  if (!fontsLoaded && !fontError) return <AppLoading />;

  // Show fallback if fonts fail
  if (fontError)
    return (
      <AppLoading
        message="Failed to load app resources. Please restart the app."
        isError={true}
      />
    );

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppContentWithTheme />
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}