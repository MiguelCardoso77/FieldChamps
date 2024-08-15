import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const group = {
    name: 'so os craques',
    president: 'craquebarca',
    balance: 0,
    nextGame: {
        date: '08',
        day: '3ª feira',
        time: '16:50 - 17:35',
        status: 'VOCÊ ESTÁ DENTRO',
    },
    bestPlayer: {
        name: 'craquebarca',
        position: 'ZAG',
        image: require('../assets/images/profile.png'), // Substitua pelo caminho real da imagem
    },
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

            {/* Cabeçalho do Grupo */}
            <View style={styles.groupHeader}>
                <Text style={styles.groupName}>{group.name}</Text>
                <Text style={styles.president}>Presidente: {group.president}</Text>
            </View>

            {/* Melhor Jogador */}
            <View style={styles.bestPlayerContainer}>
                <Image source={group.bestPlayer.image} style={styles.playerImage} />
                <View style={styles.playerInfo}>
                    <Text style={styles.positionLabel}>{group.bestPlayer.position}</Text>
                    <Text style={styles.playerName}>{group.bestPlayer.name}</Text>
                </View>
                <Text style={styles.balance}>${group.balance.toFixed(2)}</Text>
            </View>

            {/* Próximo Jogo */}
            <View style={styles.nextGameContainer}>
                <Text style={styles.nextGameDate}>{group.nextGame.date}</Text>
                <View style={styles.nextGameInfo}>
                    <Text style={styles.nextGameDay}>{group.nextGame.day}</Text>
                    <Text style={styles.nextGameTime}>{group.nextGame.time}</Text>
                </View>
                <TouchableOpacity style={styles.statusButton}>
                    <Text style={styles.statusText}>{group.nextGame.status}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111111',
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
        marginTop: 3
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
        includeFontPadding: false, // Para garantir que não há preenchimento extra ao redor do texto
    },
    groupHeader: {
        backgroundColor: '#3E4C59',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    groupName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    president: {
        fontSize: 16,
        color: '#AAB2BB',
        marginTop: 5,
    },
    bestPlayerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#232A33',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    playerImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    playerInfo: {
        flex: 1,
    },
    positionLabel: {
        fontSize: 14,
        color: '#AAB2BB',
        fontWeight: 'bold',
        backgroundColor: '#44D62C',
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 5,
        marginBottom: 5,
        overflow: 'hidden',
    },
    playerName: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    balance: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#44D62C',
    },
    nextGameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#232A33',
        padding: 15,
        borderRadius: 10,
    },
    nextGameDate: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginRight: 20,
    },
    nextGameInfo: {
        flex: 1,
    },
    nextGameDay: {
        fontSize: 16,
        color: '#AAB2BB',
    },
    nextGameTime: {
        fontSize: 16,
        color: '#FFFFFF',
    },
    statusButton: {
        backgroundColor: '#44D62C',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    statusText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});

export default GroupScreen;
