import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { auth, db } from '@/firebaseConfig';
import NavigationBar from "@/components/NavigationBar";
import TopBar from "@/components/TopBar";
import { signOut } from "@firebase/auth";
import { deleteUser } from '@firebase/auth';
import { ref, remove } from 'firebase/database';

export default function SettingsScreen() {
    const router = useRouter();
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

    const toggleNotifications = () => setIsNotificationsEnabled(previousState => !previousState);
    const toggleDarkMode = () => setIsDarkModeEnabled(previousState => !previousState);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            Alert.alert('Logout Error', 'There was an error logging out. Please try again.');
        }
    };

    const handleDeleteAccount = async () => {
        const user = auth.currentUser;
        if (!user) {
            Alert.alert('Error', 'No user is currently logged in.');
            return;
        }

        const userId = user.uid;
        const userRef = ref(db, `users/${userId}`);

        // TODO: Ask the user to confirm the account deletion

        try {
            // Delete user data from Firebase Realtime Database
            await remove(userRef);

            // Delete the user account from Firebase Authentication
            await deleteUser(user);

            router.push('/login');
        } catch (error) {
            Alert.alert('Delete Account Error', 'There was an error deleting your account. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBar level={5} progress={0.5} games={10}/>

            <Text style={styles.header}>Settings</Text>

            {/* Notificações */}
            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Enable Notifications</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isNotificationsEnabled ? '#007BFF' : '#f4f3f4'}
                    onValueChange={toggleNotifications}
                    value={isNotificationsEnabled}
                />
            </View>

            {/* Modo Escuro */}
            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Enable Dark Mode</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isDarkModeEnabled ? '#007BFF' : '#f4f3f4'}
                    onValueChange={toggleDarkMode}
                    value={isDarkModeEnabled}
                />
            </View>

            {/* Logout */}
            <View style={styles.logoutButton}>
                <Pressable onPress={ handleLogout }>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </Pressable>
            </View>

            {/* Delete Account */}
            <View style={styles.logoutButton}>
                <Pressable onPress={ handleDeleteAccount }>
                    <Text style={styles.logoutButtonText}>Delete Account</Text>
                </Pressable>
            </View>

            {/* Barra de Navegação */}
            <NavigationBar selected="profile" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        backgroundColor: '#f8f8f8',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    settingText: {
        fontSize: 18,
        color: '#333',
    },
    logoutButton: {
        marginTop: 40,
        paddingVertical: 15,
        backgroundColor: '#ff3b30',
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
