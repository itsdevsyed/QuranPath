import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text as RNText,
    Dimensions,
    StatusBar,
    View,
    TouchableOpacity,
    ActivityIndicator,
    PixelRatio,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import quranMasterData from '../../assets/quran/quran.json';
import SurahHeader from '../components/SurahHeader';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    route: any;
    navigation?: any;
}

interface VerseItem {
    id: number;
    text: string;
}

interface Surah {
    id: number;
    name: string;
    transliteration: string;
    total_verses: number;
    type: 'Meccan' | 'Medinan';
    verses: VerseItem[];
}

const getResponsiveFontSize = (baseSize: number) => {
    const scale = Dimensions.get('window').width / 375;
    return Math.round(PixelRatio.roundToNearestPixel(baseSize * scale));
};

const VersesPage: React.FC<Props> = ({ route, navigation }) => {
    const { colors, isDarkMode } = useTheme();
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);

    const surahId = route?.params?.surahId;
    const juzNumber = route?.params?.juzNumber;

    // FIXED: Handle both array and object JSON structure
    const { surah, verses, pageTitle } = useMemo(() => {
        // Convert quranMasterData to array if it's an object
        const quranArray = Array.isArray(quranMasterData)
            ? quranMasterData
            : Object.values(quranMasterData);

        if (juzNumber) {
            // Get all verses for the juzz
            const juzzVerses: VerseItem[] = [];

            quranArray.forEach((surah: any) => {
                if (surah.verses && Array.isArray(surah.verses)) {
                    surah.verses.forEach((verse: any) => {
                        if (verse.juzz_number === juzNumber) {
                            juzzVerses.push({
                                id: verse.verse_number || verse.id,
                                text: verse.text
                            });
                        }
                    });
                }
            });

            return {
                surah: null,
                verses: juzzVerses,
                pageTitle: `Juzz ${juzNumber}`
            };
        } else {
            // Get verses for specific surah
            const foundSurah = quranArray.find((s: any) => s.id === surahId);
            return {
                surah: foundSurah,
                verses: foundSurah?.verses || [],
                pageTitle: foundSurah ? `${foundSurah.transliteration} (${foundSurah.name})` : 'Surah'
            };
        }
    }, [surahId, juzNumber]);

    // Responsive font size
    const quranTextFontSize = useMemo(() => getResponsiveFontSize(24), [screenWidth]);

    // Pagination logic
    const versesPerPage = 10;
    const totalPages = useMemo(() => Math.ceil(verses.length / versesPerPage), [verses.length, versesPerPage]);

    const displayedVerses = useMemo(() => {
        const startIndex = currentPage * versesPerPage;
        const endIndex = Math.min(startIndex + versesPerPage, verses.length);
        return verses.slice(startIndex, endIndex);
    }, [verses, currentPage, versesPerPage]);

    // Navigation header
    useEffect(() => {
        if (navigation) {
            navigation.setOptions({
                headerStyle: { backgroundColor: colors.background },
                headerTintColor: colors.textPrimary,
                headerTitleStyle: { fontFamily: 'ArabicFont', fontSize: 22 },
                headerTitleAlign: 'center',
                title: pageTitle || 'Quran',
            });
        }
    }, [navigation, colors, pageTitle]);

    useEffect(() => {
        StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content');
        StatusBar.setBackgroundColor(colors.background);
    }, [colors, isDarkMode]);

    // Handle orientation changes
    useEffect(() => {
        const onChange = ({ window }: { window: { width: number; height: number } }) => {
            setScreenWidth(window.width);
            setScreenHeight(window.height);
        };
        const subscription = Dimensions.addEventListener('change', onChange);
        return () => subscription?.remove();
    }, []);

    // Loading simulation
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
            scrollViewRef.current?.scrollTo({ y: 0, animated: false });
        }, 300);
        return () => clearTimeout(timer);
    }, [surahId, juzNumber, currentPage]);

    const handleNextPage = useCallback(() => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
    }, [totalPages]);

    const handlePrevPage = useCallback(() => {
        setCurrentPage(prev => Math.max(prev - 1, 0));
    }, []);

    const renderPagination = () => (
        <View style={[styles.paginationContainer, { borderColor: colors.border }]}>
            <TouchableOpacity
                onPress={handlePrevPage}
                disabled={currentPage === 0}
                style={[styles.paginationButton, currentPage === 0 && { opacity: 0.5 }]}
            >
                <Icon name="arrow-back-outline" size={24} color={colors.textPrimary} />
            </TouchableOpacity>

            <RNText style={[styles.pageNumberText, { color: colors.textPrimary }]}>
                {currentPage + 1} / {totalPages === 0 ? 1 : totalPages}
            </RNText>

            <TouchableOpacity
                onPress={handleNextPage}
                disabled={currentPage === totalPages - 1}
                style={[styles.paginationButton, currentPage === totalPages - 1 && { opacity: 0.5 }]}
            >
                <Icon name="arrow-forward-outline" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
        </View>
    );

    if (!verses.length || isLoading) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
                <View style={[styles.loadingContainer, { minHeight: screenHeight }]}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <RNText style={{ color: colors.textPrimary, marginTop: 10 }}>
                        {juzNumber ? `Loading Juzz ${juzNumber}...` : 'Loading Surah...'}
                    </RNText>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
            {/* Show SurahHeader only for surah reading, not for juzz */}
            {!juzNumber && surah && (
                <SurahHeader
                    name={surah.name}
                    transliteration={surah.transliteration}
                    bismillah={surah.id !== 1 ? 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ' : ''}
                    number={surah.id}
                    totalVerses={surah.total_verses}
                    type={surah.type as 'Meccan' | 'Medinan'}
                />
            )}

            <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >
                {/* FIXED: Unique keys for each verse */}
                {displayedVerses.map((verse: { id: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; text: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, index: any) => (
                    <RNText
                        key={`${juzNumber || surahId}-${verse.id}-${index}`} // Unique key combination
                        style={{
                            fontFamily: 'ArabicFont',
                            fontSize: quranTextFontSize,
                            lineHeight: quranTextFontSize * 2,
                            color: colors.textPrimary,
                            textAlign: 'right',
                            writingDirection: 'rtl',
                            marginBottom: 8,
                        }}
                    >
                        {verse.text}
                        <RNText style={{ fontSize: quranTextFontSize * 0.4, color: colors.textSecondary }}>
                            {' '}﴿{verse.id}﴾
                        </RNText>
                    </RNText>
                ))}
            </ScrollView>

            {renderPagination()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        writingDirection: 'rtl',
    },
    scrollViewContent: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopWidth: 1,
    },
    paginationButton: {
        padding: 10,
    },
    pageNumberText: {
        fontSize: 16,
    },
});

export default VersesPage;