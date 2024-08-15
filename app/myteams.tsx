import React from 'react';
import NavigationBar from "@/app/NavigationBar";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';

const group = {
    name: 'Multi FC',  // Group name updated to match the image
    president: 'Multizao',  // President updated to match the image
    balance: 0,
    nextGame: {
        date: '08',
        day: '3ª feira',
        time: '16:50 - 17:35',
        status: 'VOCÊ ESTÁ DENTRO',
    },
    bestPlayer: {
        name: 'Maria Silva',  // Best player name updated to match the image
        position: 'ATA',
        image: require('../assets/images/profile.png'), // Update to the actual path of the image
    },
    backgroundImage: require('../assets/images/wallpaper5.jpg'), // Update to the actual path of the background image
};

const GroupScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            {/* Cabeçalho com "Meus Grupos" e "Criar Grupo" */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Meus grupos</Text>
                <View style={styles.createGroupContainer}>
                    <Text style={styles.createGroupText}>CRIAR GRUPO</Text>
                    <TouchableOpacity style={styles.createGroupButton}>
                        <View style={styles.plusIcon}>
                            <Text style={styles.plusText}>+</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Cabeçalho do Grupo com imagem de fundo */}
            <View style={styles.groupHeader}>
                <ImageBackground source={group.backgroundImage} style={styles.backgroundImage}>
                    <Text style={styles.groupName}>{group.name}</Text>
                    <Text style={styles.president}>Presidente: {group.president}</Text>
                </ImageBackground>
            </View>

            {/* Informação do Melhor Jogador e Saldo */}
            <View style={styles.infoContainer}>
                <View style={styles.bestPlayerContainer}>
                    <Image source={group.bestPlayer.image} style={styles.playerImage} />
                    <View style={styles.playerDetails}>
                        <Text style={styles.playerPosition}>{group.bestPlayer.position}</Text>
                        <Text style={styles.playerName}>{group.bestPlayer.name}</Text>
                    </View>
                </View>
                <Text style={styles.balance}>Saldo da Carteira: ${group.balance.toFixed(2)}</Text>
            </View>

            {/* Próximo Jogo */}
            <View style={styles.nextGameContainer}>
                <Text style={styles.nextGameTitle}>Melhores</Text>
                <Text style={styles.nextGameDetails}>
                    {group.nextGame.day} • {group.nextGame.time}
                </Text>
                <TouchableOpacity style={styles.statusButton}>
                    <Text style={styles.statusText}>{group.nextGame.status}</Text>
                </TouchableOpacity>
            </View>

            {/* Barra de Navegação */}
            <NavigationBar selected="calendar" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1717',
        padding: 15,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    createGroupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 3,
    },
    createGroupText: {
        fontSize: 12,
        color: '#AAB2BB',
        marginRight: 10,
    },
    createGroupButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusIcon: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#111111',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#9fdc00',
    },
    plusText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#9fdc00',
        textAlign: 'center',
        includeFontPadding: false,
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
        position: 'absolute',  // Posição absoluta para poder ajustar o posicionamento dentro da imagem
        bottom: 35,  // Distância da parte inferior da imagem
        left: 10,  // Distância do lado esquerdo da imagem
    },
    president: {
        fontSize: 16,
        color: '#AAB2BB',
        position: 'absolute',  // Posição absoluta para poder ajustar o posicionamento dentro da imagem
        bottom: 15,  // Distância da parte inferior da imagem
        left: 10,  // Distância do lado esquerdo da imagem
    },

    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    bestPlayerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    playerImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    playerDetails: {
        marginLeft: 10,
    },
    playerPosition: {
        fontSize: 12,
        color: '#9fdc00',
        fontWeight: 'bold',
    },
    playerName: {
        fontSize: 16,
        color: '#FFFFFF',
    },
    balance: {
        fontSize: 16,
        color: '#FFFFFF',
    },
    nextGameContainer: {
        backgroundColor: '#3A3636',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    nextGameTitle: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    nextGameDetails: {
        fontSize: 14,
        color: '#AAB2BB',
        marginTop: 5,
    },
    statusButton: {
        marginTop: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: '#9fdc00',
        borderRadius: 5,
    },
    statusText: {
        fontSize: 14,
        color: '#000000',
        fontWeight: 'bold',
    },
});

export default GroupScreen;
