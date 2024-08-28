import React, {useEffect, useState} from 'react';
import NavigationBar from "@/components/NavigationBar";
import { View, Text, StyleSheet, Pressable, ImageBackground, FlatList } from 'react-native';
import TopBar from "@/components/TopBar";
import { Styles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import { onValue, ref } from "firebase/database";
import { db } from "@/firebaseConfig";
import TopBarStats from "@/components/TopBarStats";

type Team = {
    id: string;
    teamName: string;
    teamCaptain: string;
    teamImage: string;
};

export default function MyTeams() {
    const router = useRouter();
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const teamsRef = ref(db, '/teams');
        const unsubscribe = onValue(teamsRef, async (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Fetching team data
                const parsedTeams: Team[] = await Promise.all(
                    Object.keys(data).map(async (key) => {
                        const teamCaptainId = data[key].teamCaptain;
                        const teamCaptainName = await fetchUserName(teamCaptainId); // Fetch the captain's name

                        return {
                            id: key,
                            teamName: data[key].teamName,
                            teamCaptain: teamCaptainName, // Store the captain's name instead of the ID
                            teamImage: data[key].teamImage,
                        };
                    })
                );
                setTeams(parsedTeams);
            } else {
                setTeams([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const fetchUserName = async (userId: string): Promise<string> => {
        return new Promise((resolve) => {
            const userRef = ref(db, `/users/${userId}/profile/name`);
            onValue(userRef, (snapshot) => {
                const userName = snapshot.val();
                resolve(userName ? userName : 'Unknown');
            });
        });
    };

    const renderItem = ({ item }: { item: Team | null }) => {
        if (item === null) {
            // Render the Create Team button
            return (
                <Pressable
                    onPress={() => router.navigate('/create-team')}
                    style={styles.teamContainer}
                >
                    <View style={styles.groupHeader}>
                        <ImageBackground
                            style={[styles.backgroundImageCreateTeam, Styles.buttonBackground]}
                        >
                            <Text style={Styles.buttonText}>Criar Equipa</Text>
                        </ImageBackground>
                    </View>
                </Pressable>
            );
        } else {
            // Render a team item
            return (
                <Pressable
                    style={styles.teamContainer}
                    onPress={() => router.push(`/team`)}
                >
                    <View style={styles.groupHeader}>
                        <ImageBackground
                            source={{ uri: item.teamImage }}
                            style={styles.backgroundImage}
                        >
                            <Text style={styles.groupName}>{item.teamName}</Text>
                            <Text style={styles.captain}>Capitão: {item.teamCaptain}</Text>
                        </ImageBackground>
                    </View>
                </Pressable>
            );
        }
    };


    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBarStats />

            <View style={Styles.pageContainer}>
                {loading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <FlatList
                        data={[...teams, null]} // Add null as the last item to represent the "Create Team" button
                        renderItem={renderItem}
                        keyExtractor={(item, index) =>
                            item ? item.id : `create-team-button-${index}`
                        }
                    />
                )}
            </View>

            {/* Barra de Navegação */}
            <NavigationBar selected="team"/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1717',
    },
    teamContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    loadingText: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    groupHeader: {
        backgroundColor: '#3E4C59',
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden',
    },
    backgroundImage: {
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 10,
    },
    backgroundImageCreateTeam: {
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    groupName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'right',
        position: 'absolute',
        bottom: 35,
    },
    captain: {
        fontSize: 16,
        color: '#AAB2BB',
        textAlign: 'right',
        position: 'absolute',
        bottom: 15,
    },
});
