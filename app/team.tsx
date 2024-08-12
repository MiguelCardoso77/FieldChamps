import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const players = [
    { id: '1', name: 'Miguel Cardoso', position: 'Guarda-Redes', image: require('../assets/images/profile.png'), isCaptain: true },
    { id: '2', name: 'Ana Luísa', position: 'Defesa', image: require('../assets/images/profile.png'), isCaptain: false },
    { id: '3', name: 'Maria Silva', position: 'Meio-Campo', image: require('../assets/images/profile.png'), isCaptain: false },
    { id: '4', name: 'Maria Gomes', position: 'Atacante', image: require('../assets/images/profile.png'), isCaptain: false },
];

const teamName = 'FieldChamps';

const TeamScreen: React.FC = () => {
    const router = useRouter();

    const handlePlayerPress = (playerId: string) => {
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{teamName}</Text>
            <FlatList
                data={players}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.playerContainer,
                            item.isCaptain && styles.captainContainer,
                        ]}
                        onPress={() => handlePlayerPress(item.id)}
                    >
                        <Image source={item.image} style={styles.playerImage} />
                        <View>
                            <Text style={styles.playerName}>{item.name}</Text>
                            <Text style={styles.playerPosition}>{item.position}</Text>
                        </View>
                    </TouchableOpacity>
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
    captainContainer: {
        backgroundColor: '#FFCF40',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    playerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
    playerImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
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
