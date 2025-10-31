import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import BottomNavbar from '../components/BottomNavBar';
import VersesPage from '../components/VersesPage';
import JuzVersesPage from '../components/JuzVersesPage';

export type RootStackParamList = {
    MainTabs: undefined;
    VersesPage: {
        surahId: number;
        title?: string;
    };
    JuzVersesPage: {
        juzNumber: number;
        title?: string;
    };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    const { colors, isDarkMode } = useTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: colors.background
                },
                headerTintColor: colors.textPrimary,
                headerTitleStyle: {
                    color: colors.textPrimary,
                },
            }}
        >
            <Stack.Screen name="MainTabs" component={BottomNavbar} />

            {/* Surah Reader */}
            <Stack.Screen
                name="VersesPage"
                component={VersesPage}
                options={{
                    headerShown: true,
                    title: 'Surah',
                    headerStyle: { backgroundColor: colors.background },
                    headerTintColor: colors.textPrimary,
                    headerTitleStyle: {
                        color: colors.textPrimary,
                    },
                }}
            />

            {/* Juz Reader */}
            <Stack.Screen
                name="JuzVersesPage"
                component={JuzVersesPage}
                options={{
                    headerShown: true,
                    title: 'Juz',
                    headerStyle: { backgroundColor: colors.background },
                    headerTintColor: colors.textPrimary,
                    headerTitleStyle: {
                        color: colors.textPrimary,
                    },
                }}
            />
        </Stack.Navigator>
    );
}