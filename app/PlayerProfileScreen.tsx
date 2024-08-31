import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import {db} from '@/firebaseConfig';
import {ref, get} from 'firebase/database';
import {useEffect, useState} from 'react';
import TopBarReturn from "@/components/TopBarReturn";
import NavigationBar from "@/components/NavigationBar";
import {Styles} from "@/constants/Styles";
import {calculateAge} from "@/constants/References";

type Player = {
    id: string;
    name: string;
    surname: string;
    country: string;
    description: string;
    image: string;
    birthDate: number;
    preferences: {
        position: string;
        dominantFoot: string;
        preferredTime: string;
        gameType: string;
    };
};

export default function PlayerProfileScreen() {
    const {id} = useLocalSearchParams(); // The player ID is passed as a route param
    const [player, setPlayer] = useState<Player | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlayerData = async () => {
            try {
                setLoading(true);
                // Fetch profile data
                const profileRef = ref(db, `/users/${id}/profile`);
                const profileSnapshot = await get(profileRef);
                const profileData = profileSnapshot.val();

                // Fetch preferences data
                const preferencesRef = ref(db, `/users/${id}/preferences`);
                const preferencesSnapshot = await get(preferencesRef);
                const preferencesData = preferencesSnapshot.val();

                if (profileData && preferencesData) {
                    setPlayer({
                        id: id as string,
                        ...profileData,
                        preferences: preferencesData,
                    });
                }
            } catch (error) {
                console.error('Error fetching player data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPlayerData();
        }
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading player data...</Text>
            </View>
        );
    }

    if (!player) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Player not found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBarReturn selected={'MyTeamsScreen'} title={'Player Details'}/>

            <View style={Styles.pageContainer}>

                <Image source={{ uri: player.image }} style={styles.playerImage} />
                <Text style={styles.playerName}>{`${player.name} ${player.surname}`}</Text>
                <Text style={styles.playerPosition}>{player.preferences.position}</Text>

                <Text style={styles.playerDetail}>Age: {calculateAge(player.birthDate)}</Text>
                <Text style={styles.playerDetail}>Nationality: {player.country}</Text>
                <Text style={styles.playerDetail}>Dominant Foot: {player.preferences.dominantFoot}</Text>
                <Text style={styles.playerDetail}>Preferred Time: {player.preferences.preferredTime}</Text>
                <Text style={styles.playerDetail}>Game Type: {player.preferences.gameType}</Text>

                <Text style={styles.playerBio}>{player.description}</Text>

            </View>

            {/* Navigation Bar */}
            <NavigationBar selected={'MyTeamsScreen'}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    playerImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: 'center',
        marginBottom: 20,
    },
    playerName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
    },
    playerPosition: {
        fontSize: 18,
        color: '#cccccc',
        textAlign: 'center',
        marginBottom: 10,
    },
    playerDetail: {
        fontSize: 16,
        color: '#ffffff',
        marginBottom: 5,
    },
    playerBio: {
        fontSize: 16,
        color: '#cccccc',
        marginTop: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
    },
    loadingText: {
        color: '#ffffff',
        fontSize: 16,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
    },
    errorText: {
        color: '#ff6b6b',
        fontSize: 18,
        textAlign: 'center',
    },
});
