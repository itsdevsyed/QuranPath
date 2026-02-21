import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface SurahHeaderProps {
  name?: string;
  number?: number;
  totalVerses?: number;
  type?: 'Meccan' | 'Medinan';
  showBismillah?: boolean;
}

const SurahHeader: React.FC<SurahHeaderProps> = ({
  name = '',
  number,
  totalVerses,
  type = 'Meccan',
  showBismillah = true,
}) => {
  const { appTheme } = useTheme();
  const colors = appTheme.colors;

  const toArabic = (num: number) =>
    String(num).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[Number(d)]);

  const typeMap = { Meccan: 'مكية', Medinan: 'مدنية' };

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: colors.border,
          backgroundColor: colors.surface,
        },
      ]}
    >
      {/* Top decorative line */}
      <View
        style={[
          styles.topAccent,
          { backgroundColor: colors.primaryAccent },
        ]}
      />

      <View style={styles.headerRow}>
        {number && (
          <View style={styles.surahMeta}>
            <Text style={[styles.surahMetaText, { color: colors.primaryAccent }]}>
              سورة
            </Text>
            <Text style={[styles.surahMetaText, { color: colors.primaryAccent }]}>
              {toArabic(number)}
            </Text>
          </View>
        )}

        <Text style={[styles.separator, { color: colors.primaryAccent }]}>◈</Text>

        <Text style={[styles.surahName, { color: colors.textPrimary }]}>
          {name}
        </Text>

        {(totalVerses || type) && (
          <Text style={[styles.separator, { color: colors.primaryAccent }]}>
            ◈
          </Text>
        )}

        <View style={styles.infoTags}>
          {totalVerses && (
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>
              {toArabic(totalVerses)} آيات
            </Text>
          )}
          {type && (
            <Text
              style={[
                styles.typeBadge,
                {
                  borderColor: colors.primaryAccent,
                  color: colors.primaryAccent,
                },
              ]}
            >
              {typeMap[type]}
            </Text>
          )}
        </View>
      </View>

      {/* Divider line under header row */}
      <View
        style={[
          styles.bottomDivider,
          { backgroundColor: colors.border },
        ]}
      />

      {showBismillah && (
        <Text style={[styles.bismillah, { color: colors.textPrimary }]}>
          بِسْمِ ٱللّٰهِ ٱلرَّحْمٰنِ ٱلرَّحِيمِ
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 20,
    overflow: 'hidden',
  },
  topAccent: {
    height: 3,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    gap: 8,
    marginBottom: 12,
  },
  surahMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  surahMetaText: {
    fontFamily: 'DesignFont',
    fontSize: 16,
  },
  separator: {
    fontFamily: 'DesignFont',
    fontSize: 22,
    opacity: 0.8,
  },
  surahName: {
    fontFamily: 'DesignFont',
    fontSize: 26,
  },
  infoTags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontFamily: 'DesignFont',
    fontSize: 14,
    opacity: 0.8,
  },
  typeBadge: {
    fontFamily: 'DesignFont',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  bottomDivider: {
    height: 1,
    width: '100%',
    marginBottom: 12,
    opacity: 0.4,
  },
  bismillah: {
    fontFamily: 'DesignFont',
    fontSize: 20,
    textAlign: 'center',
    opacity: 0.95,
  },
});

export default SurahHeader;
