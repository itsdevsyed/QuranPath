import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const toArabicIndic = (n: number) => {
    const map = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return String(n).replace(/\d/g, d => map[Number(d)]);
};

const AyahMarker = ({ number }: { number: number }) => {
    return (
        <View style={styles.container}>
            {/* Ayah circle */}
            <Text style={styles.symbol}>۝</Text>

            {/* Number overlay */}
            <Text style={styles.number}>
                {toArabicIndic(number)}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 6,
    },
    symbol: {
        fontFamily: 'ArabicFont', // NoorHuda
        fontSize: 34,
        position: 'absolute',
    },
    number: {
        fontFamily: 'ArabicFont',
        fontSize: 10,
        lineHeight: 18,
        marginTop: 2, // optical centering
    },
});

export default AyahMarker;
