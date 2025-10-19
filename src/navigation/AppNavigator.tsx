import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavbar from '../components/BottomNavBar';
import VersesPage from '../components/VersesPage';

export type RootStackParamList = {
    MainTabs: undefined;
    VersesPage: {
        surahId?: number;
        juzNumber?: number;
        title?: string;
    };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={BottomNavbar} />
            <Stack.Screen
                name="VersesPage"
                component={VersesPage}
                options={{ headerShown: true, title: 'Quran' }}
            />
        </Stack.Navigator>
    );
}