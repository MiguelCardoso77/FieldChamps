import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert, ImageBackground, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import NavigationBar from "@/components/NavigationBar";
import TopBarStats from "@/components/TopBarStats";
import { Styles } from "@/constants/Styles";

const { height } = Dimensions.get('window');

export default function UploadGameScreen() {
    const router = useRouter();

    const handlePress = (action: string) => {
        switch (action) {
            case 'search':
                router.push('/search-games');
                break;
            case 'create':
                router.push('/create-game');
                break;
            case 'register':
                router.push('/register-game');
                break;
            case 'performance':
                router.push('/register-performance');
                break;
            default:
                Alert.alert('Erro', 'Ação não reconhecida.');
                break;
        }
    };

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBarStats />

            <View style={Styles.pageContainer}>

                {/* Grid of buttons */}
                <View style={styles.gridContainer}>
                    <Pressable style={styles.button} onPress={() => handlePress('search')}>
                        <ImageBackground
                            source={require('../assets/images/wallpaper5.jpg')}
                            style={styles.buttonBackground}
                            imageStyle={styles.buttonImage}
                        >
                            <Text style={styles.buttonText}>Procurar Jogos</Text>
                        </ImageBackground>
                    </Pressable>

                    <Pressable style={styles.button} onPress={() => handlePress('create')}>
                        <ImageBackground
                            source={require('../assets/images/wallpaper5.jpg')}
                            style={styles.buttonBackground}
                            imageStyle={styles.buttonImage}
                        >
                            <Text style={styles.buttonText}>Criar Jogo</Text>
                        </ImageBackground>
                    </Pressable>

                    <Pressable style={styles.button} onPress={() => handlePress('register')}>
                        <ImageBackground
                            source={require('../assets/images/wallpaper5.jpg')}
                            style={styles.buttonBackground}
                            imageStyle={styles.buttonImage}
                        >
                            <Text style={styles.buttonText}>Registar Jogo</Text>
                        </ImageBackground>
                    </Pressable>

                    <Pressable style={styles.button} onPress={() => handlePress('performance')}>
                        <ImageBackground
                            source={require('../assets/images/wallpaper5.jpg')}
                            style={styles.buttonBackground}
                            imageStyle={styles.buttonImage}
                        >
                            <Text style={styles.buttonText}>Registar Performance</Text>
                        </ImageBackground>
                    </Pressable>
                </View>

            </View>

            {/* Barra de Navegação */}
            <NavigationBar selected="create-game" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginVertical: 20,
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
});
