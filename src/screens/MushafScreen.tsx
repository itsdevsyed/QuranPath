import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TopNavbar from '../components/TopNavbar';
// 🌟 IMPORT CHANGES: Import Tab type and JuzList component
import TabSegment, { Tab } from '../components/TabSegment';
import { useTheme } from '../context/ThemeContext';
import SurahList from '../components/SurahList';
import JuzList from '../components/Juz'; // Import the JuzList component

const MushafScreen: React.FC = () => {
  const { colors } = useTheme();

  // 🌟 STATE: Keep track of the currently active tab (default to 'surahs')
  const [activeTab, setActiveTab] = useState<Tab>('surahs');

  // 🌟 HELPER FUNCTION: Renders the appropriate list component based on the activeTab
  const renderContent = () => {
    switch (activeTab) {
      case 'surahs':
        return <SurahList listContentStyle={styles.listPadding} />;
      case 'juz':
        return <JuzList listContentStyle={styles.listPadding} />;
      case 'bookmarks':
        // Placeholder for Bookmarks list
        return <View style={styles.emptyContent} />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      {/* 1. Static Header Content (No scrolling) */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <TopNavbar />
        {/* 🌟 PROP PASSING: Pass the active state and the setter function to TabSegment */}
        <TabSegment
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </View>

      {/* 2. Scrollable List Content (Conditional Rendering) */}
      {renderContent()}

    </View>
  );
};

export default MushafScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the entire screen is covered
  },
  header: {
    // This View contains the static elements that don't scroll
    zIndex: 1, // Ensures the header is above the list content
    paddingTop: 16, // Example: for status bar clearance if TopNavbar doesn't handle it
  },
  listPadding: {
    // This style is applied to the FlatList's contentContainerStyle
    paddingHorizontal: 16,
    paddingBottom: 120, // Padding bottom to avoid BottomNavbar overlap
  },
  emptyContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 120,
    // Add styling for when the list is not implemented yet
  }
});
