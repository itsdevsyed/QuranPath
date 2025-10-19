import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import { Home, BookOpenText, Mic, Layers3 } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import HomeScreen from '../screens/HomeScreen';
import MushafScreen from '../screens/MushafScreen';

type IconName = 'Home' | 'BookOpenText' | 'Mic' | 'Layers3';

interface Route {
  key: 'home' | 'mushaf' | 'tafseer' | 'more';
  title: string;
  icon: IconName;
}

const IconMap: Record<IconName, React.FC<any>> = { Home, BookOpenText, Mic, Layers3 };

const PlaceholderScreen = ({ title }: { title: string }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.placeholder, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.textPrimary }}>{title} - Coming Soon</Text>
    </View>
  );
};

export default function BottomNavbar() {
  const [index, setIndex] = useState(0);
  const { appTheme } = useTheme();

  const routes: Route[] = [
    { key: 'home', title: 'Home', icon: 'Home' },
    { key: 'mushaf', title: 'Mushaf', icon: 'BookOpenText' },
    { key: 'tafseer', title: 'Tafseer', icon: 'Mic' },
    { key: 'more', title: 'More', icon: 'Layers3' },
  ];

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    mushaf: MushafScreen,
    tafseer: () => <PlaceholderScreen title="Tafseer" />,
    more: () => <PlaceholderScreen title="More" />,
  });

  const renderIcon = ({ route, focused }: { route: Route; color: string; focused: boolean }) => {
    const IconComponent = IconMap[route.icon];
    return <IconComponent color={focused ? appTheme.colors.primary : '#9CA3AF'} size={24} />;
  };

  return (
    <BottomNavigation<Route>
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      renderIcon={renderIcon}
      barStyle={[styles.barStyle, {
        backgroundColor: appTheme.colors.surface,
        borderTopColor: appTheme.colors.border
      }]}
      inactiveColor="#9CA3AF"
      activeColor={appTheme.colors.primary}
    />
  );
}

const styles = StyleSheet.create({
  barStyle: {
    borderTopWidth: 1,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});