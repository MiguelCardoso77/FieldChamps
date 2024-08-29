import React from 'react';
import { View, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface TopBarReturnProps {
    selected: string;
}

export default function TopBarReturn({ selected }: TopBarReturnProps) {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.topBarContainer}>
                {/* Back Arrow */}
                <Pressable
                    style={styles.backButton}
                    // @ts-ignore
                    onPress={() => router.push(selected)}
                >
                    <MaterialCommunityIcons name="arrow-left" size={28} color="#ffffff" />
                </Pressable>

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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#0e0a18',
    },
    topBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0e0a18',
        paddingVertical: 14,
        paddingHorizontal: 15,
        width: '100%',
        elevation: 4,
        zIndex: 1000,
    },
    backButton: {
        marginLeft: 15,
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
