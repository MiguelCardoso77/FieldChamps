import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Lista de jogadores como exemplo
const players = [
    { id: '1', name: 'João Silva', position: 'Goleiro' },
    { id: '2', name: 'Pedro Santos', position: 'Defensor' },
    { id: '3', name: 'Ana Oliveira', position: 'Meio-campista' },
    { id: '4', name: 'Maria Fernandes', position: 'Atacante' },
];

const TeamScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Minha Equipe de Futebol</Text>
            <FlatList
                data={players}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.playerContainer}>
                        <Text style={styles.playerName}>{item.name}</Text>
                        <Text style={styles.playerPosition}>{item.position}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    playerContainer: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    playerName: {
        fontSize: 18,
        fontWeight: '600',
    },
    playerPosition: {
        fontSize: 14,
        color: '#666',
    },
});

export default TeamScreen;
