import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { auth, db } from '@/firebaseConfig';
import TopBar from '@/components/TopBar';

const TopBarStats = () => {
    const [level, setLevel] = useState(0);
    const [progress, setProgress] = useState(0);
    const [games, setGames] = useState(0);
    const [loading, setLoading] = useState(true);

    const userId = auth.currentUser?.uid;

    useEffect(() => {
        if (userId) {
            const userRef = ref(db, `/users/${userId}/stats`);
            const unsubscribe = onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setLevel(data.level || 0);
                    setProgress(data.progress || 0);
                    setGames(data.gamesPlayed || 0);
                } else {
                    setLevel(0);
                    setProgress(0);
                    setGames(0);
                }
                setLoading(false);
            });

            return () => unsubscribe();
        } else {
            // Handle case when userId is not available (e.g., user not logged in)
            setLoading(false);
        }
    }, [userId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <TopBar level={level} progress={progress} games={games} />
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
    },
    loadingText: {
        fontSize: 16,
        marginTop: 10,
        color: '#cccccc',
    },
});

export default TopBarStats;