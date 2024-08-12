import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface NavigationBarProps {
    selected: string;
}

export default function NavigationBar({ selected }: NavigationBarProps) {
    const router = useRouter();

    return (
        <View style={styles.menuContainer}>
            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => router.push('/profile')}
            >
                <MaterialCommunityIcons name={selected === 'home' ? 'home' : 'home-outline'} size={32} color="#ffffff" />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => router.push('/team')}
            >
                <MaterialCommunityIcons name={selected === 'team' ? 'account-group' : 'account-group-outline'} size={32} color="#ffffff" />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => router.push('/fields')}
            >
                <MaterialCommunityIcons name={selected === 'fields' ? 'soccer-field' : 'soccer'} size={32} color="#ffffff" />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => router.push('/calendar')}
            >
                <MaterialCommunityIcons name={selected === 'calendar' ? 'calendar' : 'calendar-outline'} size={32} color="#ffffff" />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuButton}
                onPress={() => router.push('/profile')}
            >
                <MaterialCommunityIcons name={selected === 'profile' ? 'account' : 'account-outline'} size={32} color="#ffffff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#0e0a18',
        paddingVertical: 12,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    menuButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
});
