import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import TopBar from "@/components/TopBar";
import NavigationBar from "@/components/NavigationBar";

interface Notification {
    id: string;
    title: string;
    description: string;
}

const fakeNotifications: Notification[] = [
    { id: '1', title: 'Welcome to FieldChamps!', description: 'Thank you for joining us. Let’s get started!' },
    { id: '2', title: 'New Achievement Unlocked!', description: 'You’ve unlocked the "Explorer" achievement.' },
    { id: '3', title: 'Friend Request', description: 'John Doe has sent you a friend request.' },
    { id: '4', title: 'Event Reminder', description: 'Don’t forget the FieldChamps event tomorrow at 10 AM.' },
    { id: '5', title: 'Weekly Update', description: 'Here’s what you missed this week on FieldChamps.' },
];

export default function NotificationsScreen() {
    const renderItem = ({ item }: { item: Notification }) => (
        <View style={styles.notificationItem}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationDescription}>{item.description}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBar level={5} progress={0.5} games={10}/>

            <Text style={styles.header}>Notifications</Text>
            <FlatList
                data={fakeNotifications}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />

            {/* Barra de Navegação */}
            <NavigationBar selected="profile" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0e0a18',
        paddingTop: 20,
    },
    header: {
        fontSize: 24,
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 10,
    },
    list: {
        paddingHorizontal: 15,
    },
    notificationItem: {
        backgroundColor: '#1f1b29',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    notificationTitle: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    notificationDescription: {
        color: '#b3b3b3',
        fontSize: 14,
        marginTop: 5,
    },
});
