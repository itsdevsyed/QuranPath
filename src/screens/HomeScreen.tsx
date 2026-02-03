import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import TopNavbar from '../components/TopNavbar';
import ContinueReadingCard from '../components/ContinueReadingCard';
import { useTheme } from '../context/ThemeContext';
import {
  Heart,
  BookOpen,
  Clock,
  Compass
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  // Using the theme context as provided in your project
  const { colors } = useTheme();

  const menuItems = [
    { title: 'Daily Dua', sub: 'Morning & Night', icon: Heart, color: '#10b981' },
    { title: 'Ayah Day', sub: 'Daily Wisdom', icon: BookOpen, color: '#3b82f6' },
    { title: 'Prayer', sub: 'Asr in 2h 15m', icon: Clock, color: '#f59e0b' },
    { title: 'Qibla', sub: 'Find Direction', icon: Compass, color: '#6366f1' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top navbar */}
      <TopNavbar />

      {/* Scrollable content */}
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Continue Reading Card */}
        <ContinueReadingCard />

        {/* Colorful Menu Grid */}
        <View style={styles.gridContainer}>
          {menuItems.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.85}
              style={[styles.menuCard, { backgroundColor: item.color }]}
            >
              {/* Glossy Overlay effect */}
              <View style={styles.glossyOverlay} />

              <View style={styles.iconContainer}>
                <item.icon size={22} color="#FFFFFF" strokeWidth={2.5} />
              </View>

              <View>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSub}>{item.sub}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Mock content blocks using theme colors */}
        {[...Array(3)].map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.mockContent,
              {
                backgroundColor: colors.card,
                borderColor: colors.border
              },
            ]}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    padding: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 12,
  },
  menuCard: {
    width: (width - 36) / 2,
    aspectRatio: 1,
    borderRadius: 28,
    padding: 20,
    marginBottom: 12,
    justifyContent: 'space-between',
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  glossyOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    transform: [{ scaleX: 2 }, { translateY: -15 }],
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  menuSub: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  mockContent: {
    height: 200,
    borderWidth: 1,
    borderRadius: 24,
    marginBottom: 16,
  },
});

export default HomeScreen;