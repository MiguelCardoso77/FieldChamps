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
    gameLocation: number;
    gameLocationCoords: string | null;
    fieldName: string | null;
    duration: number;
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
        const gameRef = ref(db, `/games/${id}`);
        const unsubscribe = onValue(gameRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setGame({
                    id: id as string,
                    gameDate: data.gameDate,
                    gameStartTime: data.gameStartTime,
                    gameDuration: data.gameDuration,
                    gameType: data.gameType,
                    team1: data.team1,
                    team1Level: data.team1Level,
                    team1Image: data.team1Image,
                    team2: data.team2,
                    team2Level: data.team2Level,
                    team2Image: data.team2Image,
                    gameLocation: data.gameLocation,
                    gameLocationCoords: data.gameLocationCoords,
                    fieldName: data.fieldName,
                    duration: data.duration,
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

            // Check if team2 is already assigned
            if (game.team2) {
                Alert.alert('Erro', 'Um time já está registrado para este jogo.');
                return;
            }

            try {
                // Update team2 to the new team ID
                await update(gameRef, { team2: userTeamId });
                router.push('/home');
                Alert.alert('Sucesso', 'Seu time foi registrado com sucesso para o jogo.');
            } catch (error) {
                Alert.alert('Erro', 'Falha ao registrar seu time. Por favor, tente novamente mais tarde.');
            }
        } else {
            Alert.alert('Erro', 'Você não está autorizado a registrar um time.');
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text style={styles.loadingText}>Carregando detalhes...</Text>
            </View>
        );
    }

    if (!game) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Jogo não encontrado.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBarReturn selected={'SearchGamesScreen'} title={'Detalhes do Jogo'} />

            <View style={Styles.pageContainer}>
                {/* Conditionally render the image or a placeholder if the image is null */}
                {game.team1Image ? (
                    <Image source={{ uri: game.team1Image }} style={styles.gameImage} />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.imagePlaceholderText}>Nenhuma Imagem Disponível</Text>
                    </View>
                )}

                <View style={styles.infoContainer}>
                    <Text style={styles.gameName}>{game.gameType}</Text>
                    <Text style={styles.gameLocation}>{game.fieldName || 'Campo Desconhecido'}</Text>
                    <Text style={styles.gameDate}>Data: {game.gameDate}</Text>
                    <Text style={styles.gameTime}>Hora: {game.gameStartTime}</Text>
                    <Text style={styles.gameDuration}>Duração: {game.gameDuration} min</Text>
                    <Text style={styles.gamePrice}>Preço: Gratuito</Text>
                    <Text style={styles.gameDescription}>{game.team2 ? 'Times estão registrados.' : 'Nenhuma descrição disponível.'}</Text>

                    {isCaptain ? (
                        <Pressable style={styles.signUpButton} onPress={handleSignUp}>
                            <Text style={styles.signUpButtonText}>Inscrever Meu Time</Text>
                        </Pressable>
                    ) : (
                        <Text style={styles.signUpButtonText}>Não é Capitão</Text>
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
    imagePlaceholder: {
        width: '100%',
        height: 300,
        backgroundColor: '#333',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholderText: {
        color: '#fff',
        fontSize: 18,
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
    gameDuration: {
        fontSize: 16,
        color: '#cccccc',
        marginBottom: 20,
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
