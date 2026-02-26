import React, { memo, useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ViewStyle,
    Platform,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getDb } from '../db/database';

type RootStackParamList = {
    JuzVersesPage: {
        juzNumber: number;
        title: string;
    };
};

type JuzListNavigationProp = NativeStackNavigationProp<RootStackParamList, 'JuzVersesPage'>;

type JuzListItemData = {
    number: number;
    arabic: string;
    transliteration: string;
    verse_count: number;
};

const toUrduNumber = (num: number) => {
    const urduDigits = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    return num.toString().split('').map(d => urduDigits[parseInt(d)]).join('');
};

const JuzListItem = memo(({ item, colors, isDarkMode }: { item: JuzListItemData; colors: any; isDarkMode: boolean; }) => {
    const navigation = useNavigation<JuzListNavigationProp>();

    const handlePress = () => {
        navigation.navigate('JuzVersesPage', {
            juzNumber: item.number,
            title: item.arabic,
        });
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={handlePress}
            style={[styles.scriptRow, { backgroundColor: colors.surface }]}
        >
            {/* BACKGROUND DECORATIVE NUMBER */}
            <Text style={[styles.bgNumber, { color: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }]}>
                {toUrduNumber(item.number)}
            </Text>

            {/* LEFT SIDE: ID with VERTICAL DIVIDER | */}
            <View style={styles.leftInfo}>
                <Text style={[styles.idText, { color: colors.primaryAccent }]}>
                    {String(item.number).padStart(2, '0')}
                </Text>
                <View style={[styles.verticalDivider, { backgroundColor: colors.primaryAccent, opacity: 0.3 }]} />
            </View>

            {/* CENTER: ARABIC & DUAL AYAH COUNT */}
            <View style={styles.centerInfo}>
                <Text style={[styles.arabicMain, { color: colors.primary }]} numberOfLines={1}>
                    {item.arabic}
                </Text>
                <Text style={[styles.urduSubtitle, { color: colors.textSecondary }]} numberOfLines={1}>
                    {item.verse_count} / {toUrduNumber(item.verse_count)} آيات
                </Text>
            </View>

            {/* RIGHT SIDE: URDU ID */}
            <View style={styles.rightInfo}>
                <Text style={[styles.urduIdText, { color: colors.primaryAccent }]}>
                    {toUrduNumber(item.number)}
                </Text>
            </View>
        </TouchableOpacity>
    );
});

export default function JuzList({ listContentStyle }: { listContentStyle?: ViewStyle }) {
    const { colors, isDarkMode } = useTheme();
    const [juzData, setJuzData] = useState<JuzListItemData[]>([]);

    useEffect(() => {
        const loadJuz = () => {
            try {
                const db = getDb();
                const rows: any[] = db.getAllSync(`
                    SELECT id AS number, arabic_name AS arabic, total_ayahs AS verse_count
                    FROM juz ORDER BY id ASC;
                `);
                setJuzData(rows);
            } catch (err) {
                console.error('Error loading Juz metadata:', err);
            }
        };
        loadJuz();
    }, []);

    return (
        <FlatList
            data={juzData}
            renderItem={({ item }) => <JuzListItem item={item} colors={colors} isDarkMode={isDarkMode} />}
            keyExtractor={(item) => item.number.toString()}
            contentContainerStyle={[styles.listContent, listContentStyle]}
            style={{ backgroundColor: colors.background }}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    listContent: { padding: 16 },
    scriptRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginBottom: 12,
        overflow: 'hidden',
    },
    bgNumber: {
        position: 'absolute',
        right: -10,
        bottom: -20,
        fontSize: 100,
        fontFamily: 'ArabicFont',
        zIndex: 0,
    },
    leftInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 55,
    },
    idText: {
        fontSize: 16,
        fontWeight: '900',
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    verticalDivider: {
        width: 2,
        height: 24,
        marginLeft: 12,
    },
    centerInfo: {
        flex: 1,
        alignItems: 'center',
        zIndex: 1,
    },
    arabicMain: {
        fontSize: 24,
        fontFamily: 'ArabicFont',
    },
    urduSubtitle: {
        fontSize: 14,
        fontFamily: 'ArabicFont',
        marginTop: 4,
        opacity: 0.8,
    },
    rightInfo: {
        width: 45,
        alignItems: 'flex-end',
    },
    urduIdText: {
        fontSize: 22,
        fontFamily: 'ArabicFont',
    }
});
