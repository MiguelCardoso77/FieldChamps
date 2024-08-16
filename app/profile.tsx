import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import NavigationBar from "@/app/NavigationBar";
import TopBar from './TopBar';

const userProfile = {
    name: 'Miguel Cardoso',
    email: 'miguel@example.com',
    image: require('../assets/images/profile.png'),
    gamesPlayed: 120,
    followers: 340,
    following: 180,
    preferences: {
        dominantFoot: 'Direito',
        position: 'Atacante',
        gameType: 'Amigável',
        preferredTimes: 'Noites de semana',
    }
};

export default function ProfileScreen() {
    const navigation = useNavigation();

    const handleEditProfile = () => {
        // @ts-ignore
        navigation.navigate('edit'); // Navega para a tela de edição
    };

    const handleBecomePremium = () => {
        // Lógica para se tornar membro Gold
    };

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBar level={5} />

            {/* Profile Section */}
            <View style={styles.profileContainer}>
                <View style={styles.profileHeader}>
                    {userProfile.image ? (
                        <Image source={userProfile.image} style={styles.profileImage} />
                    ) : (
                        <View style={styles.profileInitials}>
                            <Text style={styles.initialsText}>MC</Text>
                        </View>
                    )}
                    <Text style={styles.profileName}>{userProfile.name}</Text>
                    <TouchableOpacity>
                        <Text style={styles.addLocation}>Adicionar a minha localização</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{userProfile.gamesPlayed}</Text>
                        <Text style={styles.statLabel}>Jogos</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{userProfile.followers}</Text>
                        <Text style={styles.statLabel}>Seguidores</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{userProfile.following}</Text>
                        <Text style={styles.statLabel}>A Seguir</Text>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                        <Text style={styles.editButtonText}>Editar perfil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.premiumButton} onPress={handleBecomePremium}>
                        <Text style={styles.premiumButtonText}>Torne-se Premium</Text>
                    </TouchableOpacity>
                </View>

                {/* Seção de Preferências do Jogador */}
                <View style={styles.preferencesContainer}>
                    <Text style={styles.preferencesTitle}>Preferências do Jogador</Text>
                    <View style={styles.preferenceItem}>
                        <Text style={styles.preferenceLabel}>Pé Dominante:</Text>
                        <Text style={styles.preferenceValue}>{userProfile.preferences.dominantFoot}</Text>
                    </View>
                    <View style={styles.preferenceItem}>
                        <Text style={styles.preferenceLabel}>Posição no Campo:</Text>
                        <Text style={styles.preferenceValue}>{userProfile.preferences.position}</Text>
                    </View>
                    <View style={styles.preferenceItem}>
                        <Text style={styles.preferenceLabel}>Tipo de Jogo:</Text>
                        <Text style={styles.preferenceValue}>{userProfile.preferences.gameType}</Text>
                    </View>
                    <View style={styles.preferenceItem}>
                        <Text style={styles.preferenceLabel}>Horários Preferidos:</Text>
                        <Text style={styles.preferenceValue}>{userProfile.preferences.preferredTimes}</Text>
                    </View>
                </View>

            </View>

            {/* Barra de Navegação */}
            <NavigationBar selected="profile" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    profileContainer: {
        paddingTop: 60, // Extra space for the top bar
        paddingHorizontal: 20,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
    },
    profileInitials: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#0e0a18',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    initialsText: {
        color: '#ffffff',
        fontSize: 36,
        fontWeight: 'bold',
    },
    profileName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    addLocation: {
        fontSize: 14,
        color: '#007BFF',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    statBox: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    statLabel: {
        fontSize: 14,
        color: '#777',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    editButton: {
        flex: 1,
        marginRight: 10,
        paddingVertical: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#333',
        alignItems: 'center',
    },
    editButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
    premiumButton: {
        flex: 1,
        marginLeft: 10,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: '#333',
        alignItems: 'center',
    },
    premiumButtonText: {
        color: '#FFD700',
        fontSize: 16,
        fontWeight: 'bold',
    },
    preferencesContainer: {
        marginTop: 30,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 2,
    },
    preferencesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    preferenceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    preferenceLabel: {
        fontSize: 16,
        color: '#777',
    },
    preferenceValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});