import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import NavigationBar from "@/app/NavigationBar";
import TopBar from './TopBar';
import { useRouter } from "expo-router";
import { auth, db } from '@/firebaseConfig';
import { ref, get } from 'firebase/database';

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
    const router = useRouter();
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userId = auth.currentUser?.uid;
            if (userId) {
                try {
                    const userRef = ref(db, `users/${userId}`);
                    const snapshot = await get(userRef);
                    if (snapshot.exists()) {
                        setUserProfile(snapshot.val()); // Atualiza o estado com os dados do perfil
                    } else {
                        console.log("Nenhum dado encontrado para esse usuário.");
                    }
                } catch (error) {
                    console.error("Erro ao buscar os dados do perfil:", error);
                }
            } else {
                console.log("Usuário não autenticado.");
            }
        };

        fetchUserProfile();
    }, []);

    if (!userProfile) {
        return (
            <View style={styles.container}>
                <Text>Carregando perfil...</Text>
            </View>
        );
    }

    const handleEditProfile = () => {
        router.push('/edit');
    };

    const handleBecomePremium = () => {
        router.push('/premium');
    };

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBar level={5} />

            {/* Profile Section */}
            <View style={styles.profileContainer}>
                <View style={styles.profileHeader}>
                    {/* Usa uma imagem padrão até que a funcionalidade de carregar imagens esteja implementada */}
                    <Image source={require('../assets/images/profile.png')} style={styles.profileImage} />

                    {/* Exibe as iniciais do nome do usuário caso não tenha uma imagem personalizada */}
                    <View style={styles.profileInitials}>
                        <Text style={styles.initialsText}>
                            {userProfile.name ? userProfile.name.charAt(0) : 'U'}
                        </Text>
                    </View>

                    {/* Nome do Usuário */}
                    <Text style={styles.profileName}>{userProfile.name} {userProfile.surname}</Text>

                    {/* Botão para adicionar localização */}
                    <Pressable>
                        <Text style={styles.addLocation}>Adicionar a minha localização</Text>
                    </Pressable>
                </View>

                {/* Estatísticas do Perfil */}
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{userProfile.gamesPlayed || 0}</Text>
                        <Text style={styles.statLabel}>Jogos</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{userProfile.followers || 0}</Text>
                        <Text style={styles.statLabel}>Seguidores</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{userProfile.following || 0}</Text>
                        <Text style={styles.statLabel}>A Seguir</Text>
                    </View>
                </View>

                {/* Botões de Ação */}
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.editButton} onPress={handleEditProfile}>
                        <Text style={styles.editButtonText}>Editar perfil</Text>
                    </Pressable>

                    <Pressable style={styles.premiumButton} onPress={handleBecomePremium}>
                        <Text style={styles.premiumButtonText}>Torne-se Premium</Text>
                    </Pressable>
                </View>

                {/* Seção de Preferências do Jogador */}
                <View style={styles.preferencesContainer}>
                    <Text style={styles.preferencesTitle}>Preferências do Jogador</Text>
                    <View style={styles.preferenceItem}>
                        <Text style={styles.preferenceLabel}>Pé Dominante:</Text>
                        <Text style={styles.preferenceValue}>{userProfile.preferences?.dominantFoot || 'N/A'}</Text>
                    </View>
                    <View style={styles.preferenceItem}>
                        <Text style={styles.preferenceLabel}>Posição no Campo:</Text>
                        <Text style={styles.preferenceValue}>{userProfile.preferences?.position || 'N/A'}</Text>
                    </View>
                    <View style={styles.preferenceItem}>
                        <Text style={styles.preferenceLabel}>Tipo de Jogo:</Text>
                        <Text style={styles.preferenceValue}>{userProfile.preferences?.gameType || 'N/A'}</Text>
                    </View>
                    <View style={styles.preferenceItem}>
                        <Text style={styles.preferenceLabel}>Horários Preferidos:</Text>
                        <Text style={styles.preferenceValue}>{userProfile.preferences?.preferredTimes || 'N/A'}</Text>
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