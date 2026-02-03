import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {
    Heart,
    BookOpen,
    Clock,
    Compass
} from 'lucide-react-native';

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    useWindowDimensions
} from 'react-native';
import {
    Heart,
    BookOpen,
    Clock,
    Compass
} from 'lucide-react-native';

const HORIZONTAL_PADDING = 12;
const GAP = 16;

const QuickMenuGrid: React.FC = () => {
    const { width } = useWindowDimensions();
    const cardWidth = (width - HORIZONTAL_PADDING * 2 - GAP) / 2;

    // ... rest of component
    interface MenuItem {
        title: string;
        sub: string;
        icon: any;
        color: string;
    }

    const QuickMenuGrid: React.FC = () => {
        const menuItems: MenuItem[] = [
            {
                title: 'Daily Dua',
                sub: 'Morning & Night',
                icon: Heart,
                color: '#10b981' // Emerald
            },
            {
                title: 'Ayah Day',
                sub: 'Daily Wisdom',
                icon: BookOpen,
                color: '#3b82f6' // Blue
            },
            {
                title: 'Prayer',
                sub: 'Asr in 2h 15m',
                icon: Clock,
                color: '#f59e0b' // Amber
            },
            {
                title: 'Qibla',
                sub: 'Find Direction',
                icon: Compass,
                color: '#6366f1' // Indigo
            },
        ];

        return (
            <View style={styles.container}>
                {menuItems.map((item, idx) => (
                    <TouchableOpacity
                        key={idx}
                        activeOpacity={0.85}
                        style={styles.cardWrapper}
                    >
                        <View style={[styles.card, { backgroundColor: item.color }]}>
                            {/* Glossy overlay to replace the gradient feel */}
                            <View style={styles.glossOverlay} />

                            <View style={styles.iconContainer}>
                                <item.icon color="#FFFFFF" size={22} strokeWidth={2.5} />
                            </View>

                            <View>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.subTitle}>{item.sub}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingHorizontal: 12,
            marginTop: 8,
        },
        cardWrapper: {
            marginBottom: 16,
            borderRadius: 28,
            // Shadow for Android/iOS to keep it looking premium
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.12,
            shadowRadius: 8,
        },
        card: {
            width: cardWidth,
            height: cardWidth,
            borderRadius: 28,
            padding: 20,
            justifyContent: 'space-between',
            overflow: 'hidden',
            position: 'relative',
        },
        glossOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            borderBottomLeftRadius: 100,
            borderBottomRightRadius: 100,
            transform: [{ scaleX: 2 }, { translateY: -20 }],
        },
        iconContainer: {
            width: 44,
            height: 44,
            borderRadius: 14,
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
        },
        title: {
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '700',
            letterSpacing: -0.3,
            zIndex: 2,
        },
        subTitle: {
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: 11,
            fontWeight: '600',
            marginTop: 2,
            zIndex: 2,
        },
    });

    export default QuickMenuGrid;