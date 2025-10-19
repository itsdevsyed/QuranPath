import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface AppLoadingProps {
    message?: string;
    isError?: boolean;
}

const AppLoading: React.FC<AppLoadingProps> = ({
    message = 'Loading...',
    isError = false
}) => {
    return (
        <View style={styles.container}>
            {!isError && <ActivityIndicator size="large" color="#0000ff" />}
            <Text style={[styles.text, isError && styles.errorText]}>
                {message}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    text: {
        marginTop: 16,
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 20,
        color: '#333',
    },
    errorText: {
        color: '#ff0000',
    },
});

export default AppLoading;