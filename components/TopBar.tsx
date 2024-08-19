import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface TopBarProps {
    level: number;
    progress: number;
    games: number;
}

export default function TopBar({ level, progress, games }: TopBarProps) {
    const router = useRouter();

    return (
        <View style={styles.topBarContainer}>

            {/* Level Indicator with Progress */}
            <View style={styles.levelContainer}>
                <View style={styles.levelBadge}>
                    <Text style={styles.levelNumber}>{level}</Text>
                </View>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
                </View>
            </View>

            {/* Games Played */}
            <View style={styles.iconsContainer}>
                <View style={styles.flamesContainer}>
                    <MaterialCommunityIcons name="soccer-field" size={24} color="#5b5568" />
                    <Text style={styles.flamesText}>{games}</Text>
                </View>
            </View>

            {/* Notifications and Settings Buttons */}
            <View style={styles.rightIconsContainer}>
                <Pressable
                    style={styles.notificationButton}
                    onPress={() => router.push('/notifications')}
                >
                    <MaterialCommunityIcons name="bell-outline" size={28} color="#ffffff" />
                </Pressable>

                <Pressable
                    style={styles.settingsButton}
                    onPress={() => router.push('/settings')}
                >
                    <MaterialCommunityIcons name="cog-outline" size={28} color="#ffffff" />
                </Pressable>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    topBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0e0a18',
        paddingVertical: 10,
        paddingHorizontal: 15,
        position: 'absolute',
        top: 0,
        width: '100%',
        elevation: 4,
        zIndex: 1000,
    },
    levelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    levelBadge: {
        backgroundColor: '#0077ff',
        padding: 6,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },
    levelNumber: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    progressBar: {
        backgroundColor: '#3b3b3b',
        width: 100,
        height: 10,
        borderRadius: 5,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#0077ff',
        borderRadius: 5,
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flamesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    flamesText: {
        color: '#ffffff',
        fontSize: 16,
        marginLeft: 5,
    },
    eggsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    eggsText: {
        color: '#ffffff',
        fontSize: 16,
        marginLeft: 5,
    },
    rightIconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    notificationButton: {
        marginRight: 15,
    },
    settingsButton: {
        marginLeft: 15,
    },
});