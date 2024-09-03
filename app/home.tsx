import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import NavigationBar from '@/components/NavigationBar';
import TopBarStats from '@/components/TopBarStats';
import { Styles } from '@/constants/Styles';
import { db, auth } from '@/firebaseConfig';
import { ref, onValue } from 'firebase/database';

export default function HomeScreen() {
    const [userName, setUserName] = useState<string | null>(null);
    const [statistics, setStatistics] = useState<{ id: string; label: string; value: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [profileImageUri, setProfileImageUri] = useState<string | null>(null);
    const userId = auth.currentUser?.uid;

    useEffect(() => {
        if (userId) {
            // Fetch user profile data including the image URI
            const userRef = ref(db, `/users/${userId}/profile`);
            onValue(userRef, (snapshot) => {
                const userData = snapshot.val();
                if (userData) {
                    setUserName(`${userData.name} ${userData.surname}` || 'User');
                    setProfileImageUri(userData.image || null);  // Add this line
                }
            });

            // Fetch user statistics data
            const statsRef = ref(db, `/users/${userId}/stats`);
            onValue(statsRef, (snapshot) => {
                const statsData = snapshot.val();
                if (statsData) {
                    setStatistics([
                        { id: '1', label: 'Matches Played', value: statsData.gamesPlayed?.toString() || '0' },
                        { id: '2', label: 'Goals Scored', value: statsData.goalsScored?.toString() || '0' },
                        { id: '3', label: 'Assists', value: statsData.assists?.toString() || '0' },
                    ]);
                }
                setLoading(false);
            });
        }
    }, [userId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6C63FF" />
                <Text style={styles.loadingText}>Loading data...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBarStats />

            <View style={Styles.pageContainer}>

                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <Image
                        source={profileImageUri ? { uri: profileImageUri } : require('../assets/images/profile.png')}
                        style={styles.profileImage}
                    />
                    <View style={styles.profileTextContainer}>
                        <Text style={styles.greetingText}>Olá,</Text>
                        <Text style={styles.userName}>{userName}</Text>
                    </View>
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

                {/* Recent Matches Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Matches</Text>
                </View>

                {/* Upcoming Matches Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Upcoming Matches</Text>
                </View>

            </View>

            {/* Navigation Bar */}
            <NavigationBar selected={'home'} />
        </View>
    );
}

//TODO: Recent Matches List
//TODO: Upcoming Matches List

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191524',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#191524',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#FFFFFF',
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
        color: '#FFFFFF',
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        padding: 20,
        backgroundColor: '#252036',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
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
        color: '#BBBBBB',
    },
    userName: {
        fontSize: 22,
        color: '#FFFFFF',
        fontWeight: '700',
    },
    section: {
        backgroundColor: '#252036',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
        color: '#FFFFFF',
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
        color: '#BBBBBB',
    },
    statValue: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: '700',
    },
});