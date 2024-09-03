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

            {/* Home Button */}
            <Pressable
                style={styles.menuButton}
                onPress={() => router.push('/home')}
            >
                <MaterialCommunityIcons
                    name={selected === 'home' ? 'home' : 'home-outline'}
                    size={32}
                    color={selected === 'home' ? Colors.darkBlue.buttons : '#ffffff'}
                />
            </Pressable>

            {/* Team Button */}
            <Pressable
                style={styles.menuButton}
                onPress={() => router.push('/MyTeamsScreen')}
            >
                <MaterialCommunityIcons
                    name={selected === 'MyTeamsScreen' ? 'account-group' : 'account-group-outline'}
                    size={32}
                    color={selected === 'MyTeamsScreen' ? Colors.darkBlue.buttons : '#ffffff'}
                />
            </Pressable>

            {/* Upload Game Button */}
            <Pressable
                style={styles.menuButton}
                onPress={() => router.push('/upload-game')}
            >
                <MaterialCommunityIcons
                    name={selected === 'upload-game' ? 'soccer' : 'soccer'}
                    size={32}
                    color={selected === 'upload-game' ? Colors.darkBlue.buttons : '#ffffff'}
                />
            </Pressable>

            {/* Fields Button */}
            <Pressable
                style={styles.menuButton}
                onPress={() => router.push('/FieldsScreen')}
            >
                <MaterialCommunityIcons
                    name={selected === 'FieldsScreen' ? 'soccer-field' : 'soccer-field'}
                    size={32}
                    color={selected === 'FieldsScreen' ? Colors.darkBlue.buttons : '#ffffff'}
                />
            </Pressable>

            {/* Profile Button */}
            <Pressable
                style={styles.menuButton}
                onPress={() => router.push('/ProfileScreen')}
            >
                <MaterialCommunityIcons
                    name={selected === 'ProfileScreen' ? 'account' : 'account-outline'}
                    size={32}
                    color={selected === 'ProfileScreen' ? Colors.darkBlue.buttons : '#ffffff'}
                />
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: Colors.darkBlue.bars,
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
