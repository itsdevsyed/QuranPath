import React, { memo } from 'react';
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
import { useSurahList } from '../hooks/useSurahList';

const toUrduNumber = (num: number) => {
    const urduDigits = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    return num.toString().split('').map(d => urduDigits[parseInt(d)]).join('');
};

const SurahListItem = memo(({ item, colors, isDarkMode, navigation }: any) => {
    const handlePress = () => {
        navigation.navigate('VersesPage', { surahId: item.number, title: item.arabic });
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.8}
            style={[styles.scriptRow, { backgroundColor: colors.surface }]}
        >
            {/* BACKGROUND DECORATIVE NUMBER */}
            <Text style={[styles.bgNumber, { color: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }]}>
                {toUrduNumber(item.number)}
            </Text>

            {/* LEFT SIDE: ID */}
            <View style={styles.leftInfo}>
                <Text style={[styles.idText, { color: colors.primaryAccent }]}>
                    {String(item.number).padStart(2, '0')}
                </Text>
                <View style={[styles.verticalDivider, { backgroundColor: colors.primaryAccent, opacity: 0.3 }]} />
            </View>

            {/* CENTER: ARABIC & METADATA */}
            <View style={styles.centerInfo}>
                <Text style={[styles.arabicMain, { color: colors.primary }]}>
                    {item.arabic}
                </Text>
                <Text style={[styles.urduSubtitle, { color: colors.textSecondary }]}>
                    {item.location}  •  {item.verses} / {toUrduNumber(item.verses)} آيات
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

export default function SurahList({ listContentStyle }: any) {
    const { colors, isDarkMode } = useTheme();
    const navigation = useNavigation<any>();
    const surahList = useSurahList();

    return (
        <FlatList
            data={surahList}
            renderItem={({ item }) => <SurahListItem item={item} colors={colors} isDarkMode={isDarkMode} navigation={navigation} />}
            keyExtractor={(item) => item.number.toString()}
            contentContainerStyle={[styles.listContent, listContentStyle]}
            style={{ backgroundColor: colors.background }}
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
        overflow: 'hidden', // Required for the background number
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
        width: 50,
    },
    idText: {
        fontSize: 16,
        fontWeight: '900',
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    verticalDivider: {
        width: 2,
        height: 20,
        marginLeft: 10,
    },
    centerInfo: {
        flex: 1,
        alignItems: 'center',
        zIndex: 1,
    },
    arabicMain: {
        fontSize: 26,
        fontFamily: 'ArabicFont',
    },
    urduSubtitle: {
        fontSize: 14,
        fontFamily: 'ArabicFont',
        marginTop: 4,
        opacity: 0.8,
    },
    rightInfo: {
        width: 40,
        alignItems: 'flex-end',
    },
    urduIdText: {
        fontSize: 22,
        fontFamily: 'ArabicFont',
    }
});
