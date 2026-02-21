import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

type Props = {
  juzNumber: number | string;
  title: string;
};

const JuzHeader: React.FC<Props> = ({ juzNumber, title }) => {
  const { appTheme } = useTheme();

  return (
    <View style={[styles.header, { borderBottomColor: appTheme.colors.border }]}>
      <View style={styles.headingContent}>
        {/* Juz Meta */}
        <View style={styles.juzMeta}>
          <Text style={[styles.juzLabel, { color: appTheme.colors.primaryAccent }]}>
            پارہ
          </Text>
          <Text style={[styles.juzNumber, { color: appTheme.colors.primaryAccent }]}>
            {juzNumber}
          </Text>
        </View>

        {/* Ornament */}
        <Text style={[styles.ornament, { color: appTheme.colors.primaryAccent }]}>◈</Text>

        {/* Optional Title */}
        {title && (
          <Text style={[styles.headerTitle, { color: appTheme.colors.textPrimary }]}>
            {title}
          </Text>
        )}
      </View>

      {/* Decorative line accent */}
      <View style={[styles.accentLine, { backgroundColor: appTheme.colors.primaryAccent }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    maxWidth: 480,
    alignItems: 'center',
    marginBottom: 32,
    paddingBottom: 16,
    borderBottomWidth: 2,
    position: 'relative',
  },
  headingContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 16,
  },
  juzMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  juzLabel: {
    fontFamily: 'DesignFont',
    fontSize: 28,
    letterSpacing: 2,
  },
  juzNumber: {
    fontFamily: 'DesignFont',
    fontSize: 26,
  },
  ornament: {
    fontFamily: 'DesignFont',
    fontSize: 22,
    marginHorizontal: 6,
    opacity: 0.7,
  },
  headerTitle: {
    fontFamily: 'DesignFont',
    fontSize: 28,
    lineHeight: 36,
    textAlign: 'center',
  },
  accentLine: {
    width: 70,
    height: 2,
    marginTop: 10,
    borderRadius: 1,
  },
});

export default JuzHeader;
