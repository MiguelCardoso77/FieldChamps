import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground, Dimensions, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import NavigationBar from "@/components/NavigationBar";
import TopBarStats from "@/components/TopBarStats";
import { Styles } from "@/constants/Styles";
import { onValue, ref } from "firebase/database";
import { db } from "@/firebaseConfig";

const { height } = Dimensions.get('window');

type Game = {
    id: string;
    gameLocation: string;
    gameStartTime: string;
    gameDuration: number;
    available: number;
};

export default function SearchGamesScreen() {
    const router = useRouter();
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const gamesRef = ref(db, '/games');
        const unsubscribe = onValue(gamesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Fetching game data
                const fetchedGames: Game[] = Object.keys(data).map(key => ({
                    id: key,
                    gameLocation: data[key].gameLocation,
                    gameStartTime: data[key].gameStartTime,
                    gameDuration: data[key].gameDuration,
                    available: data[key].available,
                })).filter(game => game.available == 0);
                setGames(fetchedGames);
            } else {
                setGames([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handlePress = (gameId: string) => {
        router.push(`/myteams`);
    };

    const renderItem = ({ item }: { item: Game }) => (
        <Pressable
            style={styles.button}
            onPress={() => handlePress(item.id)}
        >
            //TODO: Colocar cartão com vaga para duas equipas e implementar menu de inscrição
            <ImageBackground
                source={{ uri: item.gameStartTime }}
                style={styles.buttonBackground}
                imageStyle={styles.buttonImage}
            >
                <Text style={styles.buttonText}>{item.gameLocation}</Text>
            </ImageBackground>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBarStats />

            <View style={Styles.pageContainer}>
                {loading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <FlatList
                        data={games}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        numColumns={2}  // Display items in a 2x2 grid
                        columnWrapperStyle={styles.gridContainer}
                    />
                )}
            </View>

            {/* Barra de Navegação */}
            <NavigationBar selected="search-games" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
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
    loadingText: {
        color: '#000000',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
});