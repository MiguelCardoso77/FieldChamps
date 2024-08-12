import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface TopBarProps {
    level: number;
}

export default function TopBar({ level }: TopBarProps) {
    const router = useRouter();

    return (
        <View style={styles.topBarContainer}>

            {/* Nível da conta */}
            <View style={styles.levelContainer}>
                <Text style={styles.levelText}>Level {level}</Text>
            </View>

            {/* Botão de Definições */}
            <TouchableOpacity
                style={styles.settingsButton}
                onPress={() => router.push('/settings')}
            >
                <MaterialCommunityIcons name="cog-outline" size={28} color="#ffffff" />
            </TouchableOpacity>

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
        flex: 1,
    },
    levelText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    settingsButton: {
        flex: 1,
        alignItems: 'flex-end',
    },
});
