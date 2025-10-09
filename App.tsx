// App.tsx
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { customTheme } from './src/config/theme';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <PaperProvider theme={customTheme}>
      
      <HomeScreen />
    </PaperProvider>
  );
}
