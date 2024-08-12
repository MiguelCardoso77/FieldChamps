// screens/PlayerProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

// Simula uma função para buscar detalhes do jogador com base no ID
const fetchPlayerDetails = async (id: string | string[]) => {
    // Simule uma chamada à API ou carregamento de dados
    return {
        id,
        name: 'Miguel Cardoso',
        position: 'Guarda-Redes',
        image: require('../assets/images/profile.png'),
    };
};

const PlayerProfileScreen: React.FC = () => {
    const { playerId } = useLocalSearchParams();
    const [player, setPlayer] = useState<any>(null);

    useEffect(() => {
        if (playerId) {
            fetchPlayerDetails(playerId).then(setPlayer);
        }
    }, [playerId]);

    if (!player) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Image source={player.image} style={styles.image} />
            <Text style={styles.name}>{player.name}</Text>
            <Text style={styles.position}>{player.position}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    position: {
        fontSize: 18,
        color: '#666',
    },
});

export default PlayerProfileScreen;
