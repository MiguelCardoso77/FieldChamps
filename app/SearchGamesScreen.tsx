import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import NavigationBar from "@/components/NavigationBar";
import { Styles } from "@/constants/Styles";
import { onValue, ref, get } from "firebase/database";
import { db } from "@/firebaseConfig";
import TopBarReturn from "@/components/TopBarReturn";

type Game = {
    id: string;
    gameDate: string;
    gameStartTime: string;
    gameDuration: number;
    gameType: string;
    team1: string;
    team1Level: number | null;
    team1Image: string | null;
    team2: string | null;
    team2Level: number | null;
    team2Image: string | null;
    gameLocation: string;
    duration: number;
};

export default function SearchGamesScreen() {
    const router = useRouter();
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const gamesRef = ref(db, '/games');

        const fetchTeamData = async (teamID: any) => {
            if (!teamID) return { teamLevel: null, teamImage: null };
            const teamRef = ref(db, `/teams/${teamID}`);
            const snapshot = await get(teamRef);

            if (!snapshot.exists()) return { teamLevel: null, teamImage: null };

            const teamData = snapshot.val();
            return {
                teamLevel: teamData.stats?.teamLevel ?? null,  // Optional chaining for safety
                teamImage: teamData.teamImage ?? null,
            };
        };

        const unsubscribe = onValue(gamesRef, async (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const fetchedGames: Game[] = await Promise.all(
                    Object.keys(data).map(async (key) => {
                        const team1Data = await fetchTeamData(data[key].team1);
                        const team2Data = data[key].team2 ? await fetchTeamData(data[key].team2) : { teamLevel: null, teamImage: null };

                        return {
                            id: key,
                            gameDate: data[key].gameDate,
                            gameStartTime: data[key].gameStartTime,
                            gameDuration: data[key].gameDuration,
                            gameType: data[key].gameType,
                            team1: data[key].team1,
                            team1Level: team1Data.teamLevel,
                            team1Image: team1Data.teamImage,
                            team2: data[key].team2,
                            team2Level: team2Data.teamLevel,
                            team2Image: team2Data.teamImage,
                            gameLocation: data[key].gameLocation,
                            duration: data[key].duration,
                        };
                    })
                );

                const availableGames = fetchedGames.filter(game => !game.team2); // Filter games where team2 is empty
                setGames(availableGames);
            } else {
                setGames([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handlePress = (gameId: string) => {
        router.push(`/GameDetailsScreen`);
    };

    const renderItem = ({ item }: { item: Game }) => (
        <Pressable
            style={styles.cardContainer}
            onPress={() => handlePress(item.id)}
        >
            <View style={styles.cardHeader}>
                <Text style={styles.gameTime}>{item.gameDate} | {item.gameStartTime}</Text>
                <Text style={styles.gameType}>{item.gameType}</Text>
            </View>
            <View style={styles.teamsContainer}>
                <View style={styles.team}>
                    <ImageBackground
                        source={{ uri: item.team1Image || 'default_image_url' }}
                        style={styles.playerImage}
                    >
                        <Text style={styles.playerName}>{item.team1}</Text>
                    </ImageBackground>
                    <Text style={styles.playerScore}>{item.team1Level?.toFixed(2) ?? 'N/A'}</Text>  {/* Show 'N/A' if teamLevel is null */}
                </View>
                <View style={styles.team}>
                    <ImageBackground
                        source={{ uri: item.team2Image || 'default_image_url' }}
                        style={styles.playerImage}
                    >
                        <Text style={styles.playerName}>{item.team2}</Text>
                    </ImageBackground>
                    <Text style={styles.playerScore}>{item.team2Level?.toFixed(2) ?? 'N/A'}</Text>  {/* Show 'N/A' if teamLevel is null */}
                </View>
            </View>
            <View style={styles.gameInfo}>
                <Text style={styles.locationText}>{item.gameLocation}</Text>
                <Text style={styles.distanceText}>{item.gameLocation}km · {item.gameLocation}</Text>
                <Text style={styles.durationText}>{item.duration}min</Text>
            </View>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBarReturn selected={'upload-game'} title={'Procurar Jogo'}/>

            <View style={Styles.pageContainer}>
                {loading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <FlatList
                        data={games}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                )}
            </View>

            {/* Barra de Navegação */}
            <NavigationBar selected="search-games" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    loadingText: {
        color: '#000000',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    cardContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
        width: '100%', // Adjusted to full width
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    gameTime: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    gameType: {
        fontSize: 14,
        color: '#888',
    },
    teamsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    team: {
        alignItems: 'center',
    },
    playerImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playerName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    playerScore: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        backgroundColor: '#ffecb3',
        paddingHorizontal: 5,
        borderRadius: 4,
    },
    gameInfo: {
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10,
    },
    locationText: {
        fontSize: 14,
        color: '#555',
    },
    distanceText: {
        fontSize: 14,
        color: '#888',
    },
    durationText: {
        fontSize: 14,
        color: '#888',
    },
});