import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface NavigationBarProps {
    selected: string;
}

export default function NavigationBar({ selected }: NavigationBarProps) {
    const router = useRouter();

    return (
        <View style={styles.menuContainer}>

            { /* Home Button */ }
            <Pressable
                style={styles.menuButton}
                onPress={() => router.push('/home')}
            >
                <MaterialCommunityIcons name={selected === 'home' ? 'home' : 'home-outline'} size={32} color="#ffffff" />
            </Pressable>

            { /* Team Button */ }
            <Pressable
                style={styles.menuButton}
                onPress={() => router.push('/myteams')}
            >
                <MaterialCommunityIcons name={selected === 'team' ? 'account-group' : 'account-group-outline'} size={32} color="#ffffff" />
            </Pressable>

            { /* Fields Button */ }
            <Pressable
                style={styles.menuButton}
                onPress={() => router.push('/fields')}
            >
                <MaterialCommunityIcons name={selected === 'fields' ? 'soccer-field' : 'soccer'} size={32} color="#ffffff" />
            </Pressable>

            { /* Calendar Button */ }
            <Pressable
                style={styles.menuButton}
                onPress={() => router.push('/calendar')}
            >
                <MaterialCommunityIcons name={selected === 'calendar' ? 'calendar' : 'calendar-blank'} size={32} color="#ffffff" />
            </Pressable>

            { /* Profile Button */ }
            <Pressable
                style={styles.menuButton}
                onPress={() => router.push('/profile')}
            >
                <MaterialCommunityIcons name={selected === 'profile' ? 'account' : 'account-outline'} size={32} color="#ffffff" />
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: Colors.dark.bars,
        paddingVertical: 14,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    menuButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
});
