import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Home, BookOpenText, MoonStar, Repeat2, HeartPlus, BadgeInfo } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import HomeScreen from '../screens/HomeScreen';
import MushafScreen from '../screens/MushafScreen';
import TarjumaScreen from '../screens/TarjumaScreen';

type IconName = 'Home' | 'BookOpenText' | 'MoonStar' | 'HeartPlus'   | 'BadgeInfo' ;

interface Route {
  key: 'Home' | 'Mushaf' | 'Tarjuma' | 'Dikr' | 'About';
  title: string;
  icon: IconName;
}

const IconMap: Record<IconName, React.FC<any>> = { Home, BookOpenText, MoonStar , HeartPlus, BadgeInfo};

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
  const screenWidth = Dimensions.get('window').width;

  const routes: Route[] = [
    { key: 'Home', title: 'Home', icon: 'Home' },
    { key: 'Mushaf', title: 'Mushaf', icon: 'BookOpenText' },
    { key: 'Tarjuma', title: 'Tarjuma', icon: 'MoonStar' },
    { key: 'Dikr', title: 'Dikr', icon: 'HeartPlus' },
    { key: 'About', title: 'About', icon: 'BadgeInfo' },

  ];

  const renderScene = () => {
    const route = routes[index];
    switch (route.key) {
      case 'Home':
        return <HomeScreen />;
      case 'Mushaf':
        return <MushafScreen />;
      case 'Tarjuma':
        return <TarjumaScreen />;
      case 'Dikr':
        return <PlaceholderScreen title="Dikr" />;
      case 'About':
        return <PlaceholderScreen title="About" />;

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderScene()}</View>

      <View
        style={[
          styles.floatingBar,
          {
            width: screenWidth - 32,
            // Use theme color with transparency
            backgroundColor: appTheme.dark
              ? 'rgba(18,18,18,0.85)' // dark mode
              : 'rgba(255, 255, 255, 0.85)', // light mode
            shadowColor: '#000',
            shadowOpacity: 0.15,
            borderColor: appTheme.dark
              ? 'rgba(255,255,255,0.1)'
              : 'rgba(0,0,0,0.05)',
          },
        ]}
      >
        {routes.map((routeItem, idx) => {
          const focused = index === idx;
          const IconComponent = IconMap[routeItem.icon];
          const color = focused ? appTheme.colors.primary : '#9CA3AF';

          return (
            <TouchableOpacity
              key={routeItem.key}
              style={styles.tabButton}
              activeOpacity={0.7}
              onPress={() => setIndex(idx)}
            >
              <IconComponent color={color} size={24} />
              <Text style={[styles.tabLabel, { color }]}>{routeItem.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },

  floatingBar: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 12,
    elevation: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    zIndex: 100,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(236, 49, 49, 0.05)', // subtle border for depth
  },

  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabLabel: {
    fontSize: 12,
    marginTop: 2,
  },

  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80
  },
});
