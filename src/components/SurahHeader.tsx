import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface SurahHeaderProps {
    name: string;
    transliteration: string;
    bismillah?: string;
    number: number;
    totalVerses: number;
    type: 'Meccan' | 'Medinan';
}

const SurahHeader: React.FC<SurahHeaderProps> = ({
    name,
    transliteration,
    bismillah = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
    number,
    totalVerses,
    type,
}) => {
    return (
        <View style={styles.container}>
            {bismillah ? (
                <Text style={styles.bismillah}>{bismillah}</Text>
            ) : null}

            <Text style={styles.arabicName}>{name}</Text>

            <Text style={styles.transliteration}>{transliteration}</Text>

            <View style={styles.metaContainer}>
                <Text style={styles.metaText}>Surah {number}</Text>
                <Text style={styles.metaDot}>•</Text>
                <Text style={styles.metaText}>{totalVerses} Verses</Text>
                <Text
                    style={[
                        styles.typeTag,
                        type === 'Medinan' ? styles.medinanTag : styles.meccanTag,
                    ]}
                >
                    {type}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        alignItems: 'center',
        paddingHorizontal: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },

    bismillah: {
        fontFamily: 'ArabicFont',
        fontSize: 22,
        textAlign: 'center',
        color: '#333',
        marginBottom: 4,
    },

    arabicName: {
        fontFamily: 'ArabicFont',
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        color: '#111',
        marginBottom: 2,
    },

    transliteration: {
        fontSize: 14,
        color: '#555',
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 4,
    },

    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },

    metaText: {
        fontSize: 11,
        color: '#777',
        fontWeight: '500',
    },

    metaDot: {
        fontSize: 12,
        color: '#aaa',
        marginHorizontal: 4,
    },

    typeTag: {
        fontSize: 10,
        fontWeight: 'bold',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        overflow: 'hidden',
        marginLeft: 6,
        textAlign: 'center',
    },

    medinanTag: {
        backgroundColor: '#1E40AF',
        color: '#fff',
    },

    meccanTag: {
        backgroundColor: '#D97706',
        color: '#fff',
    },
});

export default SurahHeader;
