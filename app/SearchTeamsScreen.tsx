import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground, Dimensions, FlatList, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import NavigationBar from "@/components/NavigationBar";
import TopBarReturn from "@/components/TopBarReturn";
import { Styles } from "@/constants/Styles";
import { onValue, ref } from "firebase/database";
import { db } from "@/firebaseConfig";

const { height } = Dimensions.get('window');

type Team = {
    id: string;
    teamName: string;
    teamCaptain: string;
    teamImage: string;
    teamPrivacy: string;
};

export default function SearchTeamsScreen() {
    const router = useRouter();
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const teamsRef = ref(db, '/teams');
        const unsubscribe = onValue(teamsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Fetching team data
                const fetchedTeams: Team[] = Object.keys(data).map(key => ({
                    id: key,
                    teamName: data[key].teamName,
                    teamCaptain: data[key].teamCaptain,
                    teamImage: data[key].teamImage || 'default-image-url', // Fallback image if none provided
                    teamPrivacy: data[key].teamPrivacy || 'public', // Default to public if privacy is not defined
                }));
                setTeams(fetchedTeams);
            } else {
                setTeams([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const filteredTeams = teams.filter(team =>
        team.teamPrivacy === 'public' && team.teamName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handlePress = (teamId: string) => {
        router.push(`/team`);
    };

    const renderItem = ({ item }: { item: Team }) => (
        <Pressable
            style={styles.button}
            onPress={() => handlePress(item.id)}
        >
            <ImageBackground
                source={{ uri: item.teamImage }}
                style={styles.buttonBackground}
                imageStyle={styles.buttonImage}
            >
                <Text style={styles.buttonText}>{item.teamName}</Text>
                <Text style={styles.buttonSubText}>Capitão: {item.teamCaptain}</Text>
            </ImageBackground>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBarReturn selected="myteams"/>

            <View style={Styles.pageContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Insira o código da equipa"
                    placeholderTextColor="#b0b0b0"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />

                {loading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <FlatList
                        data={filteredTeams}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        numColumns={2}  // Display items in a 2x2 grid
                        columnWrapperStyle={styles.gridContainer}
                    />
                )}
            </View>

            {/* Barra de Navegação */}
            <NavigationBar selected="search-teams" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    searchInput: {
        height: 40,
        borderColor: '#ced4da',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#ffffff',
        marginBottom: 15,
    },
    gridContainer: {
        justifyContent: 'space-between',
    },
    button: {
        width: '48%',
        height: (height * 0.4) / 2,
        marginBottom: 20,
        borderRadius: 8,
        overflow: 'hidden',
    },
    buttonBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
    },
    buttonImage: {
        borderRadius: 8,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    buttonSubText: {
        color: '#ffffff',
        fontSize: 14,
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    loadingText: {
        color: '#000000',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
});