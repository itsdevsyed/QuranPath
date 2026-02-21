import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface TabButtonProps {
  icon: React.FC<{ color: string; size: number }>;
  label: string;
  focused: boolean;
  onPress: () => void;
  primaryColor: string;
}

export default function TabButton({ icon: Icon, label, focused, onPress, primaryColor }: TabButtonProps) {
  const color = focused ? primaryColor : '#9CA3AF';
  return (
    <TouchableOpacity
      style={styles.tabButton}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityState={{ selected: focused }}
    >
      <Icon color={color} size={24} />
      <Text style={[styles.tabLabel, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabButton: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  tabLabel: { fontSize: 12, marginTop: 2 },
});
