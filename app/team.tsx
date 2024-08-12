import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

type Player = {
    id: string;
    name: string;
    position: string;
    image: any;
    isCaptain: boolean;
    age: number;
    nationality: string;
};

const players: Player[] = [
    { id: '1', name: 'Miguel Cardoso', position: 'Guarda-Redes', image: require('../assets/images/profile.png'), isCaptain: true, age: 28, nationality: 'Portuguese' },
    { id: '2', name: 'Ana Luísa', position: 'Defesa', image: require('../assets/images/profile.png'), isCaptain: false, age: 24, nationality: 'Spanish' },
    { id: '3', name: 'Maria Silva', position: 'Meio-Campo', image: require('../assets/images/profile.png'), isCaptain: false, age: 26, nationality: 'Brazilian' },
    { id: '4', name: 'Maria Gomes', position: 'Atacante', image: require('../assets/images/profile.png'), isCaptain: false, age: 23, nationality: 'Argentinian' },
];

const teamName = 'FieldChamps';

const TeamScreen: React.FC = () => {
    const router = useRouter();
    const [selectedPlayer, setSelectedPlayer] = React.useState<Player | null>(null);
    const [modalVisible, setModalVisible] = React.useState<boolean>(false);

    const handlePlayerPress = (player: Player) => {
        setSelectedPlayer(player);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedPlayer(null);
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
                        onPress={() => handlePlayerPress(item)}
                    >
                        <Image source={item.image} style={styles.playerImage} />
                        <View style={styles.playerInfo}>
                            <Text style={styles.playerName}>{item.name}</Text>
                            <Text style={styles.playerPosition}>{item.position}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* Modal for player details */}
            {selectedPlayer && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={handleCloseModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Image source={selectedPlayer.image} style={styles.modalImage} />
                            <Text style={styles.modalName}>{selectedPlayer.name}</Text>
                            <Text style={styles.modalPosition}>{selectedPlayer.position}</Text>
                            <Text style={styles.modalDetails}>Age: {selectedPlayer.age}</Text>
                            <Text style={styles.modalDetails}>Nationality: {selectedPlayer.nationality}</Text>
                            <Pressable style={styles.closeButton} onPress={handleCloseModal}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#e9ecef',
    },
    captainContainer: {
        backgroundColor: '#FFD700',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 20,
        textAlign: 'center',
    },
    playerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginBottom: 12,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
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
        color: '#343a40',
    },
    playerPosition: {
        fontSize: 16,
        color: '#6c757d',
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
        shadowOffset: { width: 0, height: 2 },
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
});

export default TeamScreen;
