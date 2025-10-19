import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Text as RNText } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar, Card, Title, Paragraph, Text } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';
import { useRoute, useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const MAX_WIDTH = 768;

const VersesPage = () => {
  const { colors } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  
  const params = route.params as any;
  const { surahId, juzNumber, title } = params || {};

  const displayTitle = title || 'سورة الفاتحة';
  const displaySubtitle = surahId ? `Surah ${surahId}` : juzNumber ? `Juz ${juzNumber}` : 'مقتطفات قرآنية';

  const quranTextContent = `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
الرَّحْمَٰنِ الرَّحِيمِ
مَالِكِ يَوْمِ الدِّينِ
إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ
اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ
صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ`;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <Appbar.Header style={[styles.appBar, { backgroundColor: colors.primary }]}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="#fff" />
        <Appbar.Content 
          titleStyle={[styles.appBarTitle, { color: '#fff' }]} 
          title={displayTitle} 
        />
      </Appbar.Header>

      <View style={styles.pageWrapper}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Card style={[styles.quranCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Card.Content style={styles.cardContent}>
              <View style={[styles.header, { borderBottomColor: colors.primary }]}>
                <Title style={[styles.surahTitle, { color: colors.primary }]}>{displayTitle}</Title>
                <Paragraph style={[styles.pageInfo, { color: colors.textSecondary }]}>{displaySubtitle}</Paragraph>
              </View>

              <View style={styles.quranTextContainer}>
                <RNText style={[styles.quranText, { color: colors.textPrimary }]}>{quranTextContent}</RNText>
              </View>

              <View style={[styles.footer, { borderTopColor: colors.border }]}>
                <Text style={[styles.footerText, { color: colors.textSecondary }]}>-- صفحة ١ --</Text>
              </View>
            </Card.Content>
          </Card>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  appBar: { elevation: 0 },
  appBarTitle: { textAlign: 'center', fontSize: 18, fontWeight: 'bold' },
  pageWrapper: { flex: 1, alignItems: 'center', paddingVertical: 20 },
  scrollViewContent: { alignItems: 'center', paddingBottom: 40, flexGrow: 1 },
  quranCard: { width: Math.min(width * 0.95, MAX_WIDTH), borderRadius: 8, elevation: 2 },
  cardContent: { padding: 30, borderRadius: 8 },
  header: { borderBottomWidth: 2, paddingBottom: 12, marginBottom: 25, alignItems: 'center' },
  surahTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  pageInfo: { fontSize: 16, marginTop: 4, textAlign: 'center' },
  quranTextContainer: { width: '100%' },
  quranText: { 
    fontFamily: 'ArabicFont', 
    fontSize: 28, 
    fontWeight: '500', 
    lineHeight: 55, 
    textAlign: 'center', 
    writingDirection: 'rtl' 
  },
  footer: { marginTop: 30, borderTopWidth: 1, paddingTop: 12, alignItems: 'center' },
  footerText: { fontSize: 16 },
});

export default VersesPage;