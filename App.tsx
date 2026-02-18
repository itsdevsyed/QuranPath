
import React, { useEffect, useState } from "react";
import { StatusBar, useColorScheme, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { initDb, getDb } from "./src/db/database";  
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";
import AppNavigator from "./src/navigation/AppNavigator";
import AppLoading from "./src/components/AppLoading";
import ErrorBoundary from "./src/components/ErrorBoundary";

const AppContentWithTheme = () => {
  const { appTheme, isDarkMode } = useTheme();
  const colorScheme = useColorScheme();
  const [dbReady, setDbReady] = useState(false);
  useEffect(() => {
    StatusBar.setBackgroundColor(
      appTheme.colors?.background || "#ffffff",
      true
    );
  }, [appTheme.colors?.background]);
  useEffect(() => {
    (async () => {
      try {
        await initDb();
        setDbReady(true);
        console.log('DB ready');
      } catch (e) {
        console.error('DB init failed', e);
      }
    })();
  }, []);

  if (!dbReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading database…</Text>
      </View>
    );
  }

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
    ArabicFont: require("./assets/fonts/noorehuda_font.ttf"),
    DesignFont: require("./assets/fonts/kitab_regular.ttf"),

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
