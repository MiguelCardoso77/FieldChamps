import React, {useEffect, useState} from 'react';
import NavigationBar from "@/components/NavigationBar";
import { View, Text, StyleSheet, Image, Pressable, ImageBackground, FlatList } from 'react-native';
import TopBar from "@/components/TopBar";
import { Styles } from "@/constants/Styles";
import { useRouter } from "expo-router";
import { onValue, ref } from "firebase/database";
import { db } from "@/firebaseConfig";

type Team = {
    id: string;
    teamName: string;
    teamCaptain: string;
    teamImage: string;
};

const MyTeams: React.FC = () => {
    const router = useRouter();
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const teamsRef = ref(db, '/teams');
        const unsubscribe = onValue(teamsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const parsedFields = Object.keys(data).map((key) => ({
                    id: key,
                    teamName: data[key].teamName,
                    teamCaptain: data[key].teamCaptain,
                    teamImage: data[key].teamImage,
                }));
                setTeams(parsedFields);
            } else {
                setTeams([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }: { item: Team }) => (
        <Pressable
            style={styles.teamContainer}
            onPress={() => router.push(`/team`)}
        >
            <View style={styles.groupHeader}>
                <ImageBackground source={{ uri: item.teamImage }} style={styles.backgroundImage}>
                    <Text style={styles.groupName}>{item.teamName}</Text>
                    <Text style={styles.captain}>Capitão: {item.teamCaptain}</Text>
                </ImageBackground>
            </View>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBar level={5} progress={0.5} games={10}/>

            <View style={Styles.pageContainer}>

                {/* My Teams */}
                {loading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <FlatList
                        data={teams}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                )}

                {/* Create Team Button */}
                <Pressable onPress={() => router.navigate('/create-team')} style={styles.teamContainer}>
                    <Text style={styles.loadingText}>Criar Equipa</Text>
                </Pressable>

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
        alignItems: 'center',
    },
    groupName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        position: 'absolute',
        bottom: 35,
        left: 10,
    },
    captain: {
        fontSize: 16,
        color: '#AAB2BB',
        position: 'absolute',
        bottom: 15,
        left: 10,
    },
});

export default MyTeams;
