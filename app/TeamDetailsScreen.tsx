import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Image, Pressable, ActivityIndicator} from 'react-native';
import {useRouter, useLocalSearchParams} from 'expo-router';
import {db} from '@/firebaseConfig';
import {ref, get} from "firebase/database";
import NavigationBar from "@/components/NavigationBar";
import {Styles} from "@/constants/Styles";
import TopBarReturn from "@/components/TopBarReturn";

type Player = {
    id: string;
    name: string;
    position: string;
    image: string;
    isCaptain: boolean;
    age: number;
    nationality: string;
};

type Team = {
    id: string;
    name: string;
    wins: number;
    ties: number;
    losses: number;
    players: Player[];
    creationDate: string;
    description: string;
    image: string;
    location: string;
    memberCount: number;
};

export default function TeamScreen() {
    const router = useRouter();
    const {id} = useLocalSearchParams(); // Capturing the team ID from URL parameters
    const [team, setTeam] = useState<Team | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                // Reference to team data
                const teamRef = ref(db, `/teams/${id}`);
                const teamSnapshot = await get(teamRef);
                const teamData = teamSnapshot.val();

                if (teamData) {
                    // Fetch player IDs (which are userIds)
                    const playerIds = teamData.players ? Object.values(teamData.players) : [];

                    // Fetch player details from the `users` node using the playerIds
                    const playerPromises = playerIds.map(async (userId) => {
                        const userRef = ref(db, `/users/${userId}/profile`);
                        const userSnapshot = await get(userRef);
                        return {id: userId, ...userSnapshot.val()};
                    });

                    const players = await Promise.all(playerPromises);

                    setTeam({
                        id: id as string,
                        name: teamData.teamName,
                        wins: teamData.stats.wins || 0,
                        ties: teamData.stats.ties || 0,
                        losses: teamData.stats.losses || 0,
                        players: players || [],
                        creationDate: teamData.teamCreationDate || 'N/A',
                        description: teamData.teamDescription || 'No description available.',
                        image: teamData.teamImage || '',
                        location: teamData.teamLocation || 'Unknown location',
                        memberCount: teamData.teamMemberCount || 0,
                    });
                } else {
                    setTeam(null);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setTeam(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handlePlayerPress = (player: Player) => {
        router.push(`/PlayerProfileScreen?id=${player.id}`);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF"/>
                <Text style={styles.loadingText}>Carregando detalhes...</Text>
            </View>
        );
    }

    if (!team) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Equipe não encontrada.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBarReturn selected={'MyTeamsScreen'} title={'Detalhes da Equipa'}/>

            <View style={Styles.pageContainer}>

                <Text style={styles.header}>{team.name}</Text>

                {/* Team Image */}
                <Image source={{uri: team.image}} style={styles.teamImage}/>

                {/* Team Description */}
                <Text style={styles.description}>{team.description}</Text>

                {/* Team Location */}
                <Text style={styles.location}>Localização: {team.location}</Text>

                {/* Team Creation Date */}
                <Text style={styles.creationDate}>Criado em: {new Date(team.creationDate).toLocaleDateString()}</Text>

                {/* Team Member Count */}
                <Text style={styles.memberCount}>Número de Membros: {team.memberCount}</Text>

                {/* Team Statistics */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <View style={styles.statCircleGreen}>
                            <Text style={styles.statNumber}>{team.wins}</Text>
                        </View>
                        <Text style={styles.statLabel}>Vitórias</Text>
                    </View>
                    <View style={styles.statItem}>
                        <View style={styles.statCircleYellow}>
                            <Text style={styles.statNumber}>{team.ties}</Text>
                        </View>
                        <Text style={styles.statLabel}>Empates</Text>
                    </View>
                    <View style={styles.statItem}>
                        <View style={styles.statCircleRed}>
                            <Text style={styles.statNumber}>{team.losses}</Text>
                        </View>
                        <Text style={styles.statLabel}>Derrotas</Text>
                    </View>
                </View>

                <FlatList
                    data={team.players}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <Pressable style={styles.playerContainer} onPress={() => handlePlayerPress(item)}>
                            <Image source={{uri: item.image}} style={styles.playerImage}/>
                            <View>
                                <Text style={styles.playerName}>{item.name}</Text>
                                <Text style={styles.playerPosition}>{item.position}</Text>
                            </View>
                        </Pressable>
                    )}
                />
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
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 20,
        textAlign: 'center',
    },
    teamImage: {
        width: '100%',
        height: 200,
        marginBottom: 15,
    },
    description: {
        fontSize: 16,
        color: '#cccccc',
        marginHorizontal: 15,
        marginBottom: 10,
    },
    location: {
        fontSize: 16,
        color: '#ffffff',
        marginHorizontal: 15,
        marginBottom: 10,
    },
    creationDate: {
        fontSize: 16,
        color: '#ffffff',
        marginHorizontal: 15,
        marginBottom: 10,
    },
    memberCount: {
        fontSize: 16,
        color: '#ffffff',
        marginHorizontal: 15,
        marginBottom: 20, // Add extra margin if needed
    },
    playerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginBottom: 12,
        backgroundColor: '#2a2a2a',
        borderRadius: 8,
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    captainContainer: {
        backgroundColor: '#FFD700',
    },
    playerImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    playerInfo: {
        flex: 1,
    },
    playerName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#ffffff',
    },
    playerPosition: {
        fontSize: 16,
        color: '#cccccc',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
    },
    modalImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 15,
    },
    modalName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#343a40',
        marginBottom: 5,
    },
    modalPosition: {
        fontSize: 18,
        color: '#6c757d',
        marginBottom: 10,
    },
    modalDetails: {
        fontSize: 16,
        color: '#495057',
    },
    closeButton: {
        marginTop: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    statItem: {
        alignItems: 'center',
    },
    statCircleGreen: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 8,
        borderColor: '#4caf50',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        backgroundColor: 'transparent',
    },
    statCircleYellow: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 8,
        borderColor: '#ffeb3b',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        backgroundColor: 'transparent',
    },
    statCircleRed: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 8,
        borderColor: '#f44336',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        backgroundColor: 'transparent',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    statLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
    createTeamButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 20,
        marginHorizontal: 30,
    },
    createTeamButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
    },
    loadingText: {
        color: '#ffffff',
        marginTop: 10,
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
        marginHorizontal: 30,
    },
});