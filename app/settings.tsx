import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import NavigationBar from "@/app/NavigationBar";
import TopBar from "@/app/TopBar";

export default function SettingsScreen() {
    const router = useRouter();
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

    const toggleNotifications = () => setIsNotificationsEnabled(previousState => !previousState);
    const toggleDarkMode = () => setIsDarkModeEnabled(previousState => !previousState);

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBar level={5} />

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

            {/* Barra de Navegação */}
            <NavigationBar selected="profile" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
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
