import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface PlaceholderScreenProps {
  title: string;
}

const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({ title }) => {
  const { appTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: appTheme.colors.background }]}>
      <Text style={{ color: appTheme.colors.textPrimary, fontSize: 18 }}>
        {title} - Coming Soon
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80, // space for BottomNavbar
  },
});

export default PlaceholderScreen;
