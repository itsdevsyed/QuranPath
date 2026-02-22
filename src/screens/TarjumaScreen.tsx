import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import TabSegment, { TabItem } from '../components/TabSegment';
import { useTheme } from '../context/ThemeContext';
import SurahList from '../components/SurahList';
import JuzList from '../components/Juz'; // JuzList component

const MushafScreen: React.FC = () => {
  const { colors } = useTheme();

  // Dynamic tab data
  const tabs: TabItem[] = [
    { key: 'juz', label: 'Juz' },
    { key: 'surahs', label: 'Surahs' },
    { key: 'BookMark', label: 'BookMark' },


  ];

  // Active tab state
  const [activeTab, setActiveTab] = useState<string>('juz');

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
        case 'juz':
        return <JuzList listContentStyle={styles.listPadding} />;
        case 'surahs':
        return <SurahList listContentStyle={styles.listPadding} />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Static Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <TopNavbar />
        {/* Reusable TabSegment with dynamic tabs */}
        <TabSegment
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </View>

      {/* Conditional scrollable content */}
      {renderContent()}
    </View>
  );
};

export default MushafScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    zIndex: 1,
    paddingTop: 16,
  },
  listPadding: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  emptyContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
});
