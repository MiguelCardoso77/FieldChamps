import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Pressable, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { db, auth } from '@/firebaseConfig';
import { ref, onValue, update } from 'firebase/database';
import TopBarReturn from '@/components/TopBarReturn';
import NavigationBar from '@/components/NavigationBar';
import { Styles } from '@/constants/Styles';

type Game = {
    id: string;
    name: string;
    location: string;
    date: string;
    time: string;
    image: any;
    description: string;
    price: string;
    registeredTeams: { [teamId: string]: boolean }; // Track registered teams
};

export default function GameDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [game, setGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState(true);
    const [userTeamId, setUserTeamId] = useState<string | null>(null);
    const [isCaptain, setIsCaptain] = useState(false);
    const userId = auth.currentUser?.uid;

    useEffect(() => {
        // Load game details
        const gameRef = ref(db, `/games/${id}`);
        const unsubscribe = onValue(gameRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setGame({
                    id: id as string,
                    name: data.name,
                    location: data.location,
                    date: data.date,
                    time: data.time,
                    image: data.image,
                    description: data.description || 'No description available.',
                    price: data.price || 'Free',
                    registeredTeams: data.registeredTeams || {},
                });
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [id]);

    const checkCaptainStatus = async () => {
        if (userId) {
            const userTeamsRef = ref(db, `/users/${userId}/team`);
            onValue(userTeamsRef, (snapshot) => {
                const userTeams = snapshot.val() || {};
                const teamId = Object.keys(userTeams).find(teamId => userTeams[teamId].isCaptain);
                setUserTeamId(teamId || null);
                setIsCaptain(!!teamId);
            });
        }
    };

    const handleSignUp = async () => {
        // Check if the user is the captain
        await checkCaptainStatus();

        if (userTeamId && game) {
            const gameRef = ref(db, `/games/${game.id}`);
            const newRegisteredTeams = { ...game.registeredTeams, [userTeamId]: true };

            try {
                await update(gameRef, { registeredTeams: newRegisteredTeams });
                router.push('/home');
                Alert.alert('Success', 'Your team has been successfully registered for the game.');
            } catch (error) {
                Alert.alert('Error', 'Failed to register your team. Please try again later.');
            }
        } else {
            Alert.alert('Error', 'You are not authorized to register a team.');
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text style={styles.loadingText}>Loading details...</Text>
            </View>
        );
    }

    if (!game) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Game not found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBarReturn selected={'upload-game'} title={'Detalhes do Jogo'} />

            <View style={Styles.pageContainer}>
                <Image source={{ uri: game.image }} style={styles.gameImage} />
                <View style={styles.infoContainer}>
                    <Text style={styles.gameName}>{game.name}</Text>
                    <Text style={styles.gameLocation}>{game.location}</Text>
                    <Text style={styles.gameDate}>Date: {game.date}</Text>
                    <Text style={styles.gameTime}>Time: {game.time}</Text>
                    <Text style={styles.gamePrice}>Price: {game.price}</Text>
                    <Text style={styles.gameDescription}>{game.description}</Text>
                    {isCaptain && (
                        <Pressable style={styles.signUpButton} onPress={handleSignUp}>
                            <Text style={styles.signUpButtonText}>Sign Up My Team</Text>
                        </Pressable>
                    )}
                </View>
            </View>

            {/* Navigation Bar */}
            <NavigationBar selected="games" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    gameImage: {
        width: '100%',
        height: 300,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    infoContainer: {
        padding: 20,
        backgroundColor: '#2a2a2a',
        borderRadius: 12,
        margin: 10,
    },
    gameName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 10,
    },
    gameLocation: {
        fontSize: 18,
        color: '#cccccc',
        marginBottom: 5,
    },
    gameDate: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#8ece11',
        marginBottom: 10,
    },
    gameTime: {
        fontSize: 16,
        color: '#cccccc',
        marginBottom: 10,
    },
    gamePrice: {
        fontSize: 16,
        color: '#cccccc',
        marginBottom: 20,
    },
    gameDescription: {
        fontSize: 16,
        color: '#e0e0e0',
        lineHeight: 24,
    },
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
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
    },
    errorText: {
        fontSize: 18,
        color: '#FF6347',
    },
    signUpButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20,
    },
    signUpButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
