import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import NavigationBar from "@/components/NavigationBar";
import TopBarStats from "@/components/TopBarStats";
import { push, ref, set } from "firebase/database";
import { db } from "@/firebaseConfig";
import { Styles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";

export default function CreateGameScreen() {
    const router = useRouter();
    const [gameLocation, setGameLocation] = useState('');
    const [gameStartTime, setGameStartTime] = useState('');
    const [gameDuration, setGameDuration] = useState('');

    const handleSubmit = async () => {
        if (!gameLocation || !gameStartTime || !gameDuration) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        const newGameRef = push(ref(db, `/games/`));

        //TODO: Associar equipa do capitão ao jogo
        //TODO: Escolher a localização do jogo a partir da lista de campos disponíveis
        //TODO: Escolher data e hora a partir do calendário
        //TODO: Definir tipo de jogo (amigável, treino, oficial) (5x5, 7x7, 11x11)

        await set(newGameRef, {
            gameLocation,
            gameStartTime,
            gameDuration: parseInt(gameDuration),
            available: 0,
        });

        Alert.alert('Sucesso', 'Jogo criado com sucesso!');
        router.push('/myteams');
    };

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBarStats/>

            <View style={Styles.pageContainer}>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>Localização do Jogo:</Text>
                    <TextInput
                        style={styles.input}
                        value={gameLocation}
                        onChangeText={setGameLocation}
                    />

                    <Text style={styles.label}>Data e Hora de Início:</Text>
                    <TextInput
                        style={styles.input}
                        value={gameStartTime}
                        onChangeText={setGameStartTime}
                    />

                    <Text style={styles.label}>Duração (minutos):</Text>
                    <TextInput
                        style={styles.input}
                        value={gameDuration}
                        onChangeText={setGameDuration}
                        keyboardType='numeric'
                    />

                    <Button title="Criar Jogo" onPress={handleSubmit}/>
                </View>

            </View>

            {/* Barra de Navegação */}
            <NavigationBar selected="create-game"/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.darkBlue.background,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
        color: '#FFFFFF',
        backgroundColor: '#333333',
    },
});
