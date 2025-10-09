import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import BottomNavbar from '../components/BottomNavBar';
import TopNavbar from '../components/TopNavbar';

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaProvider>

        <TopNavbar />

        {/* Main content */}
        <View style={styles.content}>
        </View>

        <BottomNavbar />
    </SafeAreaProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    // optional padding or margin for content
  },
});
