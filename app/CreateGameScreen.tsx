import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import NavigationBar from "@/components/NavigationBar";
import TopBarStats from "@/components/TopBarStats";
import { push, ref, set } from "firebase/database";
import { db } from "@/firebaseConfig";
import { Styles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";

export default function CreateGameScreen() {
    const router = useRouter();
    const [gameLocation, setGameLocation] = useState('');
    const [gameStartTime, setGameStartTime] = useState(new Date());
    const [gameDuration, setGameDuration] = useState('');
    const [gameType, setGameType] = useState('Amigável');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleSubmit = async () => {
        if (!gameLocation || !gameStartTime || !gameDuration || !gameType) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        const newGameRef = push(ref(db, `/games/`));

        await set(newGameRef, {
            gameLocation,
            gameStartTime: gameStartTime.toISOString(),
            gameDuration: parseInt(gameDuration),
            gameType,
            team1: '5LQ00U',
            team1Level: null,
            team1Image: null,
            team2: null,
            team2Level: null,
            team2Image: null,
            available: 0,
        });

        Alert.alert('Sucesso', 'Jogo criado com sucesso!');
        router.push('/upload-game');
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || gameStartTime;
        setShowDatePicker(false);
        setGameStartTime(currentDate);
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

                    <Text style={styles.label}>Tipo de Jogo:</Text>
                    <Picker
                        selectedValue={gameType}
                        style={styles.input}
                        onValueChange={(itemValue) => setGameType(itemValue)}
                    >
                        <Picker.Item label="Amigável" value="Amigável" />
                        <Picker.Item label="Treino" value="Treino" />
                        <Picker.Item label="Oficial" value="Oficial" />
                    </Picker>

                    <Text style={styles.label}>Data e Hora de Início:</Text>
                    <Button onPress={() => setShowDatePicker(true)} title="Escolher Data e Hora" />
                    {showDatePicker && (
                        <DateTimePicker
                            value={gameStartTime}
                            mode="datetime"
                            display="default"
                            onChange={onChangeDate}
                        />
                    )}
                    <Text style={styles.selectedDateText}>
                        {gameStartTime.toLocaleDateString()} {gameStartTime.toLocaleTimeString()}
                    </Text>

                    <Text style={styles.label}>Duração (minutos):</Text>
                    <TextInput
                        style={styles.input}
                        value={gameDuration}
                        onChangeText={setGameDuration}
                        keyboardType='numeric'
                    />

                    <Button title="Criar Jogo" onPress={handleSubmit} />
                </View>
            </View>

            {/* Barra de Navegação */}
            <NavigationBar selected="create-game" />
        </View>
    );
}

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
    selectedDateText: {
        color: '#FFFFFF',
        marginBottom: 20,
    },
});