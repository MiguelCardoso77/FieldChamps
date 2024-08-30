import React, { useEffect, useState } from 'react';
import NavigationBar from "@/components/NavigationBar";
import { View, Text, StyleSheet, Pressable, ImageBackground, FlatList } from 'react-native';
import TopBarStats from "@/components/TopBarStats";
import { Styles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import { onValue, ref } from "firebase/database";
import { auth, db } from "@/firebaseConfig";
import { Colors } from "@/constants/Colors";

type Team = {
    id: string;
    teamName: string;
    teamCaptain: string;
    teamImage: string;
};

export default function MyTeamsScreen() {
    const router = useRouter();
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = auth.currentUser?.uid;

        if (userId) {
            const userTeamsRef = ref(db, `/users/${userId}/team`);
            onValue(userTeamsRef, async (snapshot) => {
                const teamSlots = snapshot.val();
                if (teamSlots) {
                    const teamIDs = Object.values(teamSlots).filter(teamID => teamID !== "");
                    const parsedTeams: Team[] = (await Promise.all(
                        // @ts-ignore
                        teamIDs.map(async (teamID: string): Promise<Team | null> => {
                            const teamRef = ref(db, `/teams/${teamID}`);
                            const teamSnapshot = await new Promise<any>((resolve) => {
                                onValue(teamRef, resolve, { onlyOnce: true });
                            });

                            const teamData = teamSnapshot.val();
                            if (teamData) {
                                const teamCaptainName = await fetchUserName(teamData.teamCaptain);
                                return {
                                    id: teamID,
                                    teamName: teamData.teamName,
                                    teamCaptain: teamCaptainName,
                                    teamImage: teamData.teamImage,
                                };
                            }
                            return null;
                        })
                    )).filter((team): team is Team => team !== null);

                    setTeams(parsedTeams);
                } else {
                    setTeams([]);
                }
                setLoading(false);
            });
        }
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
            return (
                <View style={styles.createAndSearchContainer}>
                    <Pressable
                        onPress={() => router.navigate('/create-team')}
                        style={[styles.halfButton, styles.leftButton]}
                    >
                        <Text style={Styles.buttonText}>Criar Equipa</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => router.navigate('/SearchTeamsScreen')}
                        style={[styles.halfButton, styles.rightButton]}
                    >
                        <Text style={Styles.buttonText}>Procurar Equipa</Text>
                    </Pressable>
                </View>
            );
        } else {
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
            <TopBarStats />

            <View style={Styles.pageContainer}>
                {loading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <FlatList
                        data={[...teams, null]}
                        renderItem={renderItem}
                        keyExtractor={(item, index) =>
                            item ? item.id : `create-team-button-${index}`
                        }
                    />
                )}
            </View>

            <NavigationBar selected="team" />
        </View>
    );
}

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
    createAndSearchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    halfButton: {
        flex: 1,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.darkBlue.buttons,
    },
    leftButton: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        marginRight: 10,
    },
    rightButton: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        marginLeft: 10,
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