import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import NavigationBar from "@/components/NavigationBar";
import TopBarStats from "@/components/TopBarStats";
import { useRouter } from "expo-router";
import { auth, db } from '@/firebaseConfig';
import { ref, get } from 'firebase/database';
import { Styles } from "@/constants/Styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ProfileScreen() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState<any>(null);
    const [profileImageUri, setProfileImageUri] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<string>('stats');

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userId = auth.currentUser?.uid;
            if (userId) {
                try {
                    const userRef = ref(db, `users/${userId}`);
                    const snapshot = await get(userRef);
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        setUserProfile(userData);
                        setProfileImageUri(userData.profile.image || null);  // Fetch profile image URI
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
                <Text style={styles.loadingText}>Carregando perfil...</Text>
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

    const getTrustFactorColor = (trustFactor: number) => {
        if (trustFactor < 1.0) {
            return '#FF0000'; // Red
        } else if (trustFactor >= 1.0 && trustFactor < 2.0) {
            return '#FFFF00'; // Yellow
        } else if (trustFactor >= 2.0 && trustFactor < 4.5) {
            return '#00FF00'; // Green
        } else {
            return '#007BFF'; // Blue
        }
    };

    const renderTrophies = (trophies: any[]) => {
        if (!trophies || trophies.length === 0) {
            return <Text style={styles.noTrophiesText}>No trophies to display</Text>;
        }

        return (
            <View style={styles.trophyContainer}>
                {trophies.slice(0, 3).map((trophy, index) => (
                    <View key={index} style={styles.trophyBox}>
                        <Image source={{ uri: trophy.image }} style={styles.trophyImage} />
                        <Text style={styles.trophyName}>{trophy.name}</Text>
                    </View>
                ))}
            </View>
        );
    };

    // Menu options to switch sections
    const renderMenuOptions = () => (
        <View style={styles.menuContainer}>
            <Pressable
                style={[styles.menuOption, activeSection === 'trophies' && styles.menuOptionSelected]}
                onPress={() => setActiveSection('trophies')}>
                <MaterialCommunityIcons name="trophy" size={24} color={activeSection === 'trophies' ? "#FFFFFF" : "#cccccc"} />
                <Text style={styles.menuText}>Trophies</Text>
            </Pressable>

            <Pressable
                style={[styles.menuOption, activeSection === 'stats' && styles.menuOptionSelected]}
                onPress={() => setActiveSection('stats')}>
                <MaterialCommunityIcons name="progress-star" size={24} color={activeSection === 'stats' ? "#FFFFFF" : "#cccccc"} />
                <Text style={styles.menuText}>Stats</Text>
            </Pressable>

            <Pressable
                style={[styles.menuOption, activeSection === 'preferences' && styles.menuOptionSelected]}
                onPress={() => setActiveSection('preferences')}>
                <MaterialCommunityIcons name="cog" size={24} color={activeSection === 'preferences' ? "#FFFFFF" : "#cccccc"} />
                <Text style={styles.menuText}>Preferences</Text>
            </Pressable>
        </View>
    );

    // Render the content based on the selected section
    const renderContent = () => {
        switch (activeSection) {
            case 'trophies':
                return (
                    <View style={styles.trophiesSection}>
                        {userProfile.trophies ? renderTrophies(userProfile.trophies) : <Text style={styles.noTrophiesText}>No trophies to display</Text>}
                    </View>
                );
            case 'stats':
                return (
                    <View style={styles.statsContainer}>
                        <View style={styles.statBox}>
                            <Text style={styles.statNumber}>{userProfile.stats.gamesPlayed || 0}</Text>
                            <Text style={styles.statLabel}>Jogos</Text> {/* Display Games */}
                        </View>

                        <View style={styles.statBox}>
                            <Text style={styles.statNumber}>{userProfile.stats.goalsScored || 0}</Text>
                            <Text style={styles.statLabel}>Golos</Text> {/* Display Goals */}
                        </View>

                        <View style={styles.statBox}>
                            <Text style={styles.statNumber}>{userProfile.stats.assists || 0}</Text>
                            <Text style={styles.statLabel}>Assistências</Text> {/* Display Assists */}
                        </View>
                    </View>
                );
            case 'preferences':
                return (
                    <View style={styles.preferencesContainer}>
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

                        {/* Button to edit preferences always visible */}
                        <Pressable style={styles.editButton} onPress={handleEditPreferences}>
                            <Text style={styles.editButtonText}>Editar Preferências</Text>
                        </Pressable>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBarStats />

            <View style={Styles.pageContainer}>

                {/* Profile Section */}
                <View style={styles.profileContainer}>

                    {/* Exibe a imagem de perfil se disponível, caso contrário, mostra as iniciais */}
                    <View style={styles.profileHeader}>
                        {profileImageUri ? (
                            <Image source={{ uri: profileImageUri }} style={styles.profileImage} />
                        ) : (
                            <View style={styles.profileInitials}>
                                <Text style={styles.initialsText}>
                                    {userProfile.profile.name ? userProfile.profile.name.charAt(0) : '?'}
                                </Text>
                            </View>
                        )}

                        {/* Nome do Usuário */}
                        <Text style={styles.profileName}>{userProfile.profile.name} {userProfile.profile.surname}</Text>

                        {/* Botão para adicionar localização */}
                        <Text style={styles.addLocation}>{userProfile.profile.country}</Text>
                    </View>

                    {/* Estatísticas do Perfil */}
                    <View style={styles.statsContainer}>
                        <View style={styles.statBox}>
                            <Text style={styles.statNumber}>{userProfile.stats.followers || 0}</Text>
                            <Text style={styles.statLabel}>Seguidores</Text>
                        </View>

                        {/* Trust Factor */}
                        <View style={styles.statBox}>
                            <Text
                                style={[
                                    styles.statNumber,
                                    { color: getTrustFactorColor(userProfile.trustFactor) }
                                ]}
                            >
                                {userProfile.trustFactor.toFixed(1)}
                            </Text>
                            <Text style={styles.statLabel}>Trust Factor</Text>
                        </View>

                        <View style={styles.statBox}>
                            <Text style={styles.statNumber}>{userProfile.stats.following || 0}</Text>
                            <Text style={styles.statLabel}>Seguindo</Text>
                        </View>
                    </View>

                    <View style={styles.unifiedContainer}>
                        {/* Renderiza as opções de navegação (Trophies, Stats, Preferences) */}
                        {renderMenuOptions()}

                        {/* Renderiza o conteúdo com base na seção ativa */}
                        {renderContent()}
                    </View>
                </View>

                {/* Edit Profile and Premium Buttons */}
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.editButton} onPress={handleEditProfile}>
                        <Text style={styles.editButtonText}>Editar Perfil</Text>
                    </Pressable>
                    <Pressable style={styles.premiumButton} onPress={handleBecomePremium}>
                        <Text style={styles.premiumButtonText}>Tornar-se Premium</Text>
                    </Pressable>
                </View>
            </View>

            {/* Bottom Navigation */}
            <NavigationBar selected="ProfileScreen"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191524',
    },
    unifiedContainer: {
        backgroundColor: '#242031',
        borderRadius: 15,
        padding: 20,
        marginVertical: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
        borderWidth: 1,
        borderColor: '#453e50',
    },
    loadingText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    profileContainer: {
        paddingHorizontal: 20,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 25,
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
        color: '#ffffff',  // Set text color to white
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
        color: '#ffffff',  // Set text color to white
    },
    statLabel: {
        fontSize: 14,
        color: '#cccccc',  // Set text color to a lighter shade for contrast
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
        borderColor: '#ffffff',
        alignItems: 'center',
    },
    editButtonText: {
        color: '#ffffff',
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
        backgroundColor: '#242031',  // Match the dark background color
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
        color: '#ffffff',  // Set text color to white
    },
    editText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007BFF',
    },
    preferenceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    preferenceLabel: {
        fontSize: 20,
        color: '#ffffff',  // Set text color to white
    },
    preferenceValue: {
        fontSize: 20,
        color: '#cccccc',  // Set text color to a lighter shade for contrast
    },

    // Menu Styles
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        paddingHorizontal: 15,
    },
    menuOption: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuText: {
        color: '#FFFFFF',
        marginTop: 5,
        fontSize: 14,
        fontWeight: '500',
    },
    menuOptionSelected: {
        backgroundColor: '#5E56E0',
        borderWidth: 1,
        borderColor: '#FFFFFF',
    },

    /* Trophies Section */
    trophyContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    trophyBox: {
        width: '30%', // Adjust the width according to your layout preference
        alignItems: 'center',
        marginBottom: 15,
    },
    trophyImage: {
        width: 50,
        height: 50,
        marginBottom: 5,
    },
    trophyName: {
        color: '#ffffff',
        textAlign: 'center',
    },
    noTrophiesText: {
        color: '#cccccc',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
    },
    trophiesSection: {
        padding: 10,
        backgroundColor: 'transparent',
        borderWidth: 0,
        marginVertical: 0,
    },
    trophiesTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 10,
    },
});
