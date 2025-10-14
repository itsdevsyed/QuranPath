import React, { memo } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// -------------------------------------------------------------------
// 1. TYPES
// -------------------------------------------------------------------

type JuzListItemData = {
    number: number;
    arabic: string;      // Arabic name/title (e.g., الجزء الأول)
    start: string;       // Starting Surah and Ayah (e.g., Al-Fatihah:1)
    translation: string; // English translation (e.g., Part One)
    label: string;       // Commonly known opening word (e.g., Alif Lām Mīm)
};

type JuzListProps = {
    listContentStyle?: ViewStyle;
};

type RootStackParamList = {
    JuzDetails: { juzNumber: number };
};

type JuzListNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'JuzDetails'
>;

// -------------------------------------------------------------------
// 2. STATIC DATA — 30 Juzʾ WITH OPENING LABELS
// -------------------------------------------------------------------

const JUZ_DATA: JuzListItemData[] = [
    { number: 1, arabic: 'الجزء الأول', start: 'الفاتحة 1', translation: 'Part One', label: 'آلم (Alif Lām Mīm)' },
    { number: 2, arabic: 'الجزء الثاني', start: 'البقرة 142', translation: 'Part Two', label: 'سيقول (Sayaqūlu)' },
    { number: 3, arabic: 'الجزء الثالث', start: 'البقرة 253', translation: 'Part Three', label: 'تلك الرسل (Tilka r-Rusul)' },
    { number: 4, arabic: 'الجزء الرابع', start: 'آل عمران 93', translation: 'Part Four', label: 'لن تنالوا (Lan Tanālū)' },
    { number: 5, arabic: 'الجزء الخامس', start: 'النساء 24', translation: 'Part Five', label: 'والمحصنات (Wal-Muḥṣanāt)' },
    { number: 6, arabic: 'الجزء السادس', start: 'النساء 148', translation: 'Part Six', label: 'لا يحب الله (Lā Yuḥibbu llāh)' },
    { number: 7, arabic: 'الجزء السابع', start: 'المائدة 82', translation: 'Part Seven', label: 'وإذا سمعوا (Wa Idhā Samiʿū)' },
    { number: 8, arabic: 'الجزء الثامن', start: 'الأنعام 111', translation: 'Part Eight', label: 'ولو أننا (Wa Law Annā)' },
    { number: 9, arabic: 'الجزء التاسع', start: 'الأعراف 88', translation: 'Part Nine', label: 'قال الملأ (Qāla l-Malāʾu)' },
    { number: 10, arabic: 'الجزء العاشر', start: 'الأنفال 41', translation: 'Part Ten', label: 'واعلموا (Wa ʿAlamū)' },
    { number: 11, arabic: 'الجزء الحادي عشر', start: 'يونس 6', translation: 'Part Eleven', label: 'يعتذرون (Yaʿtadhirūn)' },
    { number: 12, arabic: 'الجزء الثاني عشر', start: 'هود 6', translation: 'Part Twelve', label: 'وما من دابة (Wa Mā Min Dābbah)' },
    { number: 13, arabic: 'الجزء الثالث عشر', start: 'يوسف 53', translation: 'Part Thirteen', label: 'وما أبرئ (Wa Mā Ubarriʾu)' },
    { number: 14, arabic: 'الجزء الرابع عشر', start: 'الحجر 1', translation: 'Part Fourteen', label: 'الر (Alif Lām Rāʾ)' },
    { number: 15, arabic: 'الجزء الخامس عشر', start: 'الإسراء 1', translation: 'Part Fifteen', label: 'سبحان (Subḥāna)' },
    { number: 16, arabic: 'الجزء السادس عشر', start: 'الكهف 75', translation: 'Part Sixteen', label: 'قال ألم (Qāla A Lam)' },
    { number: 17, arabic: 'الجزء السابع عشر', start: 'الأنبياء 1', translation: 'Part Seventeen', label: 'اقترب (’Iqtaraba)' },
    { number: 18, arabic: 'الجزء الثامن عشر', start: 'المؤمنون 1', translation: 'Part Eighteen', label: 'قد أفلح (Qad Aflāḥa)' },
    { number: 19, arabic: 'الجزء التاسع عشر', start: 'الفرقان 21', translation: 'Part Nineteen', label: 'وقال الذين (Wa Qāla lladhīna)' },
    { number: 20, arabic: 'الجزء العشرون', start: 'النمل 56', translation: 'Part Twenty', label: 'أمن خلق (A Man Khalaqa)' },
    { number: 21, arabic: 'الجزء الحادي والعشرون', start: 'العنكبوت 45', translation: 'Part Twenty-One', label: 'اتل ما (Utl Mā)' },
    { number: 22, arabic: 'الجزء الثاني والعشرون', start: 'الأحزاب 31', translation: 'Part Twenty-Two', label: 'ومن يقل (Wa Man Yaqul)' },
    { number: 23, arabic: 'الجزء الثالث والعشرون', start: 'يس 28', translation: 'Part Twenty-Three', label: 'ومالي (Wa Māli)' },
    { number: 24, arabic: 'الجزء الرابع والعشرون', start: 'الزمر 32', translation: 'Part Twenty-Four', label: 'فمن أظلم (Fa Man Aẓlamu)' },
    { number: 25, arabic: 'الجزء الخامس والعشرون', start: 'فصلت 47', translation: 'Part Twenty-Five', label: 'إليه يردّ (Ilayhi Yuraddu)' },
    { number: 26, arabic: 'الجزء السادس والعشرون', start: 'الأحقاف 1', translation: 'Part Twenty-Six', label: 'حم (Hā Mīm)' },
    { number: 27, arabic: 'الجزء السابع والعشرون', start: 'الذاريات 31', translation: 'Part Twenty-Seven', label: 'قال فما (Qāla Fa Mā)' },
    { number: 28, arabic: 'الجزء الثامن والعشرون', start: 'المجادلة 1', translation: 'Part Twenty-Eight', label: 'قد سمع (Qad Samiʿa)' },
    { number: 29, arabic: 'الجزء التاسع والعشرون', start: 'الملك 1', translation: 'Part Twenty-Nine', label: 'تبارك (Tabāraka)' },
    { number: 30, arabic: 'الجزء الثلاثون', start: 'النبأ 1', translation: 'Part Thirty', label: 'عمّ (ʿAmma)' },
];

// -------------------------------------------------------------------
// 3. COMPONENTS
// -------------------------------------------------------------------

const JuzListItem = memo(({ item, colors }: { item: JuzListItemData; colors: any }) => {
    const navigation = useNavigation<JuzListNavigationProp>();

    const indexContainerStyle = {
        borderColor: colors.primaryAccent || colors.primary,
        borderWidth: 1.5,
        backgroundColor: colors.isDarkMode
            ? `${colors.primaryAccent || colors.primary}15`
            : `${colors.primaryAccent || colors.primary}10`,
    };

    return (
        <TouchableOpacity
            style={styles.row}
            activeOpacity={0.65}
            accessibilityRole="button"
            accessibilityLabel={`Juz ${item.translation}, starts at ${item.start}`}
            onPress={() => navigation.navigate('JuzDetails', { juzNumber: item.number })}
        >
            {/* Juz Number Badge */}
            <View style={[styles.indexNumberContainer, indexContainerStyle]}>
                <Text style={[styles.indexNumberText, { color: colors.primaryAccent || colors.primary }]}>
                    {item.number}
                </Text>
            </View>

            {/* English Title + Starting Point */}
            <View style={styles.textContainer}>
                <Text
                    style={[styles.englishText, { color: colors.textPrimary }]}
                    numberOfLines={1}
                >
                    {item.translation}
                </Text>
                <Text
                    style={[styles.subtitle, { color: colors.textSecondary }]}
                    numberOfLines={1}
                >
                    {item.label} • Starts at {item.start}
                </Text>
            </View>

            {/* Arabic Title */}
            <Text style={[styles.arabicText, { color: colors.primary }]} numberOfLines={1}>
                {item.arabic}
            </Text>
        </TouchableOpacity>
    );
});

const ListSeparator = memo(({ color }: { color: string }) => (
    <View style={[styles.separator, { backgroundColor: color }]} />
));

// -------------------------------------------------------------------
// 4. MAIN COMPONENT
// -------------------------------------------------------------------

export default function JuzList({ listContentStyle }: JuzListProps) {
    const { colors } = useTheme();

    if (!JUZ_DATA?.length) {
        return (
            <View style={[styles.errorContainer, { backgroundColor: colors.background }]}>
                <Text style={{ color: colors.textPrimary, textAlign: 'center' }}>
                    ⚠️ Error: Could not load Juzʾ data.
                </Text>
            </View>
        );
    }

    return (
        <FlatList
            data={JUZ_DATA}
            renderItem={({ item }) => <JuzListItem item={item} colors={colors} />}
            keyExtractor={(item) => item.number.toString()}
            contentContainerStyle={[styles.listContentContainer, listContentStyle]}
            ItemSeparatorComponent={() => (
                <ListSeparator color={`${colors.textSecondary}20`} />
            )}
            style={styles.container}
            initialNumToRender={12}
            windowSize={18}
            showsVerticalScrollIndicator={false}
        />
    );
}

// -------------------------------------------------------------------
// 5. STYLES
// -------------------------------------------------------------------

const styles = StyleSheet.create({
    container: { flex: 1 },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    listContentContainer: { paddingVertical: 8 },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    separator: { height: 1, marginHorizontal: 16 },
    indexNumberContainer: {
        width: 34,
        height: 34,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    indexNumberText: { fontWeight: '700', fontSize: 14 },
    textContainer: { flex: 1, justifyContent: 'center' },
    englishText: { fontSize: 17, fontWeight: '600', letterSpacing: 0.3 },
    subtitle: { fontSize: 12, fontWeight: '400', marginTop: 2, opacity: 0.7 },
    arabicText: {
        fontSize: 26,
        fontFamily: 'ArabicFont',
        textAlign: 'right',
        marginLeft: 12,
    },
});
