import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomNavigation, useTheme } from 'react-native-paper';
import { Home, BookOpenText, Mic, Layers3, IconProps } from 'lucide-react-native';

// --- ROUTES ---
type IconName = 'Home' | 'BookOpenText' | 'Mic' | 'Layers3';

interface Route {
    key: 'home' | 'mushaf' | 'recitations' | 'more';
    title: string;
    icon: IconName;
}

const IconMap: Record<IconName, React.FC<IconProps>> = {
    Home,
    BookOpenText,
    Mic,
    Layers3,
};

// --- PLACEHOLDER SCREENS ---
const Screen = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <View style={styles.screenContainer}>
        <Text style={styles.screenText}>{title}</Text>
        <Text style={styles.screenDetails}>{subtitle}</Text>
    </View>
);

const renderScene = BottomNavigation.SceneMap({
    home: () => <Screen title="Home" subtitle="Surah Index" />,
    mushaf: () => <Screen title="Mushaf" subtitle="Continuous Reading" />,
    recitations: () => <Screen title="Recitations" subtitle="Audio Player" />,
    more: () => <Screen title="More" subtitle="Settings / Info" />,
});

// --- COLORS ---
const ACTIVE_COLOR = '#0F172A'; // Deep black-blue for active icon
const ACTIVE_FILL = '#d3cbcbff';  // Light gray pill behind active tab
const INACTIVE_COLOR = '#9CA3AF'; // Gray-400 for inactive icons

// --- ICON RENDER ---
const renderIcon = ({
    route,
    focused,
}: {
    route: Route;
    color: string;
    focused: boolean;
}) => {
    const IconComponent = IconMap[route.icon];
    const iconColor = focused ? ACTIVE_COLOR : INACTIVE_COLOR;
    const fill = focused ? ACTIVE_FILL : 'none';
    return <IconComponent color={iconColor} fill={fill} size={24} />;
};

// --- MAIN COMPONENT ---
export default function BottomNavbar() {
    const [index, setIndex] = useState(0);
    const theme = useTheme();

    const routes: Route[] = [
        { key: 'home', title: 'Home', icon: 'Home' },
        { key: 'mushaf', title: 'Mushaf', icon: 'BookOpenText' },
        { key: 'recitations', title: 'Recitations', icon: 'Mic' },
        { key: 'more', title: 'More', icon: 'Layers3' },
    ];

    const customTheme = {
        ...theme,
        colors: {
            ...theme.colors,
            primary: ACTIVE_COLOR,          // Overrides active tab color
            accent: ACTIVE_FILL,            // Subtle highlight
            secondaryContainer: ACTIVE_FILL, // Fixes default ripple/purple tint
            onSecondaryContainer: ACTIVE_COLOR,
            background: '#FFFFFF',
            surface: '#FFFFFF',
        },
    };

    return (
        <BottomNavigation<Route>
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            renderIcon={renderIcon}
            activeColor={ACTIVE_COLOR}
            inactiveColor={INACTIVE_COLOR}
            barStyle={styles.barStyle}
            labelStyle={styles.labelStyle}
            shifting={false} // disables default purple ripple
            theme={customTheme}
        />
    );
}

// --- STYLES ---
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
    },
    screenText: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
    },
    screenDetails: {
        marginTop: 6,
        fontSize: 15,
        color: '#6B7280',
    },
    barStyle: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },
    labelStyle: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 0.3,
        color: '#111827',
    },
});
