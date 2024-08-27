import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import NavigationBar from "@/components/NavigationBar";
import TopBar from '../components/TopBar';
import { useRouter } from "expo-router";
import { auth, db } from '@/firebaseConfig';
import { ref, get } from 'firebase/database';

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
                        setUserProfile(snapshot.val());
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

    const handleEditPreferences = () => {
        router.push('/preferences');
    }

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBar level={5} progress={0.5} games={10}/>

            {/* Profile Section */}
            <View style={styles.profileContainer}>
                <View style={styles.profileHeader}>
                    {/* Exibe as iniciais do nome do usuário caso não tenha uma imagem personalizada */}
                    <View style={styles.profileInitials}>
                        <Text style={styles.initialsText}>
                            {userProfile.profile.name ? userProfile.profile.name.charAt(0) : '?'}
                        </Text>
                    </View>

                    {/* Nome do Usuário */}
                    <Text style={styles.profileName}>{userProfile.profile.name} {userProfile.profile.surname}</Text>

                    {/* Botão para adicionar localização */}
                    <Pressable>
                        <Text style={styles.addLocation}>Adicionar a minha localização</Text>
                    </Pressable>
                </View>

                {/* Estatísticas do Perfil */}
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{userProfile.stats.gamesPlayed || 0}</Text>
                        <Text style={styles.statLabel}>Jogos</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{userProfile.stats.followers || 0}</Text>
                        <Text style={styles.statLabel}>Seguidores</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{userProfile.stats.following || 0}</Text>
                        <Text style={styles.statLabel}>A Seguir</Text>
                    </View>
                </View>

                {/* Botões de Ação */}
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.editButton} onPress={ handleEditProfile }>
                        <Text style={styles.editButtonText}>Editar perfil</Text>
                    </Pressable>

                    <Pressable style={styles.premiumButton} onPress={ handleBecomePremium }>
                        <Text style={styles.premiumButtonText}>Torne-se Premium</Text>
                    </Pressable>
                </View>

                {/* Seção de Preferências do Jogador */}
                <View style={styles.preferencesContainer}>
                    <View style={styles.preferencesHeader}>
                        <Text style={styles.preferencesTitle}>Preferências do Jogador</Text>
                        <Text style={styles.editText} onPress={handleEditPreferences}>Editar</Text>
                    </View>

                    <View style={styles.preferenceItem}>
                        <Text style={styles.preferenceLabel}>🦶 Pé Dominante:</Text>
                        <Text style={styles.preferenceValue}>{userProfile.preferences?.dominantFoot || 'Não definido'}</Text>
                    </View>

                    <View style={styles.preferenceItem}>
                        <Text style={styles.preferenceLabel}>🧩 Posição no Campo:</Text>
                        <Text style={styles.preferenceValue}>{userProfile.preferences?.position || 'Não definido'}</Text>
                    </View>

                    <View style={styles.preferenceItem}>
                        <Text style={styles.preferenceLabel}>🏟️ Tipo de Jogo:</Text>
                        <Text style={styles.preferenceValue}>{userProfile.preferences?.gameType || 'Não definido'}</Text>
                    </View>

                    <View style={styles.preferenceItem}>
                        <Text style={styles.preferenceLabel}>🕒 Horários Preferidos:</Text>
                        <Text style={styles.preferenceValue}>{userProfile.preferences?.preferredTimes || 'Não definido'}</Text>
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
        paddingTop: 60,
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

    /* Preferences Section */
    preferencesContainer: {
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    preferencesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    preferencesTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
    },
    editText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1e3d7c',
    },
    preferenceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    preferenceLabel: {
        fontSize: 20,
        color: '#333',
    },
    preferenceValue: {
        fontSize: 20,
        color: '#555',
    },
});