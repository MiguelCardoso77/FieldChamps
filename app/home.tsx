import React, {useState} from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import NavigationBar from "@/components/NavigationBar";
import TopBar from "../components/TopBar";
import TopBarStats from "@/components/TopBarStats";

const userName = 'Miguel Cardoso';

const notifications = [
    {id: '1', message: 'New message from Sarah', time: '5 minutes ago'},
    {id: '2', message: 'Your profile was updated', time: '1 hour ago'},
    {id: '3', message: 'New team member joined', time: '2 hours ago'},
];

const statistics = [
    {id: '1', label: 'Matches Played', value: '25'},
    {id: '2', label: 'Goals Scored', value: '15'},
    {id: '3', label: 'Assists', value: '8'},
];

export default function HomeScreen() {
    const [selected, setSelected] = useState('home');

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBarStats />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Welcome</Text>
                <MaterialCommunityIcons name="account-circle" size={40} color="#007BFF"/>
            </View>

            {/* Profile Section */}
            <View style={styles.profileSection}>
                <Image
                    source={require('../assets/images/profile.png')}
                    style={styles.profileImage}
                />
                <View style={styles.profileTextContainer}>
                    <Text style={styles.greetingText}>Hello,</Text>
                    <Text style={styles.userName}>{userName}</Text>
                </View>
            </View>

            {/* Notifications Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Notifications</Text>
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <View style={styles.notificationItem}>
                            <Text style={styles.notificationMessage}>{item.message}</Text>
                            <Text style={styles.notificationTime}>{item.time}</Text>
                        </View>
                    )}
                />
            </View>

            {/* Statistics Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Statistics</Text>
                <View style={styles.statsContainer}>
                    {statistics.map(stat => (
                        <View key={stat.id} style={styles.statItem}>
                            <Text style={styles.statLabel}>{stat.label}</Text>
                            <Text style={styles.statValue}>{stat.value}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Navigation Bar */}
            <NavigationBar selected={selected}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 70, // Space for the NavigationBar
        paddingTop: 60,    // Space for the TopBar
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
    headerText: {
        fontSize: 26,
        fontWeight: '700',
        color: '#333',
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginRight: 15,
    },
    profileTextContainer: {
        justifyContent: 'center',
    },
    greetingText: {
        fontSize: 18,
        color: '#777',
    },
    userName: {
        fontSize: 22,
        color: '#222',
        fontWeight: '700',
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
    },
    notificationItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 10,
    },
    notificationMessage: {
        fontSize: 16,
        color: '#444',
    },
    notificationTime: {
        fontSize: 12,
        color: '#999',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statItem: {
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
    },
    statValue: {
        fontSize: 20,
        color: '#222',
        fontWeight: '700',
    },
});
