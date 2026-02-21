import { BadgeInfo, BookOpenText, HeartPlus, Home, MoonStar } from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import TabButton from '../../components/BottomNavbar/TabButton';
import { useTheme } from '../../context/ThemeContext';
import HomeScreen from '../../screens/HomeScreen';
import MushafScreen from '../../screens/MushafScreen';
import PlaceholderScreen from '../../screens/PlaceholderScreen';

type IconName = 'Home' | 'BookOpenText' | 'MoonStar' | 'HeartPlus' | 'BadgeInfo';

interface Route {
  key: 'Home' | 'Mushaf' | 'Tafseer' | 'Dikr' | 'About';
  title: string;
  icon: IconName;
  component: React.FC;
}

const IconMap: Record<IconName, React.FC<any>> = { Home, BookOpenText, MoonStar, HeartPlus, BadgeInfo };

export default function BottomNavbar() {
  const [index, setIndex] = useState(0);
  const { appTheme } = useTheme();
  const screenWidth = Dimensions.get('window').width;

  const routes: Route[] = [
    { key: 'Home', title: 'Home', icon: 'Home', component: HomeScreen },
    { key: 'Mushaf', title: 'Mushaf', icon: 'BookOpenText', component: MushafScreen },
    { key: 'Tafseer', title: 'Tafseer', icon: 'MoonStar', component: () => <PlaceholderScreen title="Tafseer" /> },
    { key: 'Dikr', title: 'Dikr', icon: 'HeartPlus', component: () => <PlaceholderScreen title="Dikr" /> },
    { key: 'About', title: 'About', icon: 'BadgeInfo', component: () => <PlaceholderScreen title="About" /> },
  ];

  const ActiveScreen = routes[index].component;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ActiveScreen />
      </View>

      <View
        style={[
          styles.floatingBar,
          {
            width: screenWidth - 32,
            backgroundColor: appTheme.dark ? 'rgba(18,18,18,0.85)' : 'rgba(255,255,255,0.85)',
            borderColor: appTheme.dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
            shadowColor: '#000',
          },
        ]}
      >
        {routes.map((routeItem, idx) => {
          const focused = index === idx;
          const IconComponent = IconMap[routeItem.icon];
          return (
            <TabButton
              key={routeItem.key}
              icon={IconComponent}
              label={routeItem.title}
              focused={focused}
              onPress={() => setIndex(idx)}
              primaryColor={appTheme.colors.primary}
            />
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
    shadowOpacity: 0.15,
    shadowRadius: 10,
    zIndex: 100,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
