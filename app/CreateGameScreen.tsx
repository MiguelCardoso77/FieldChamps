import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import NavigationBar from "@/components/NavigationBar";
import { push, ref, set } from "firebase/database";
import { db } from "@/firebaseConfig";
import { Styles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import TopBarReturn from "@/components/TopBarReturn";

export default function CreateGameScreen() {
    const router = useRouter();
    const [gameDate, setGameDate] = useState(new Date());
    const [gameStartTime, setGameStartTime] = useState(new Date());
    const [team1, setTeam1] = useState('5LQ00U');
    const [gameLocation, setGameLocation] = useState('');
    const [gameDuration, setGameDuration] = useState('');
    const [gameType, setGameType] = useState('5v5');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const handleSubmit = async () => {
        if (!gameLocation || !gameStartTime || !gameDuration || !gameType) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        const newGameRef = push(ref(db, `/games/`));

        await set(newGameRef, {
            gameLocation,
            gameDate: gameDate.toLocaleDateString('pt-BR'), // Store the formatted date
            gameStartTime: gameStartTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), // Store the formatted time
            gameDuration: parseInt(gameDuration),
            gameType,
            team1: '5LQ00U',
        });

        Alert.alert('Sucesso', 'Jogo criado com sucesso!');
        router.push('/upload-game');
    };

    const onChangeDate = (event: any, selectedDate: Date) => {
        const currentDate = selectedDate || gameDate;
        setShowDatePicker(false);
        setGameDate(currentDate);
    };

    const onChangeTime = (event: any, selectedTime: Date) => {
        const currentTime = selectedTime || gameStartTime;
        setShowTimePicker(false);
        setGameStartTime(currentTime);
    };

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBarReturn selected={'upload-game'} title={'Criar Jogo'}/>

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
                        <Picker.Item label="3v3" value="3v3" />
                        <Picker.Item label="5v5" value="5v5" />
                        <Picker.Item label="7v7" value="7v7" />
                        <Picker.Item label="9v9" value="9v9" />
                        <Picker.Item label="11v11" value="11v11" />
                    </Picker>

                    <Text style={styles.label}>Data do Jogo:</Text>
                    <Button onPress={() => setShowDatePicker(true)} title="Escolher Data" />
                    {showDatePicker && (
                        <DateTimePicker
                            value={gameDate}
                            mode="date"
                            display="default"
                            // @ts-ignore
                            onChange={onChangeDate}
                        />
                    )}
                    <Text style={styles.selectedDateText}>
                        {gameDate.toLocaleDateString('pt-BR')}
                    </Text>

                    <Text style={styles.label}>Hora de Início:</Text>
                    <Button onPress={() => setShowTimePicker(true)} title="Escolher Hora" />
                    {showTimePicker && (
                        <DateTimePicker
                            value={gameStartTime}
                            mode="time"
                            display="default"
                            // @ts-ignore
                            onChange={onChangeTime}
                        />
                    )}
                    <Text style={styles.selectedDateText}>
                        {gameStartTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
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