import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import NavigationBar from "@/components/NavigationBar";
import TopBar from "@/components/TopBar";
import { auth, db } from '@/firebaseConfig';
import { push, ref, set } from "firebase/database";

export default function CreateTeamScreen() {
    const router = useRouter();
    const [teamAcronym, setTeamAcronym] = useState('');
    const [teamDescription, setTeamDescription] = useState('');
    const [teamImage, setTeamImage] = useState('');
    const [teamName, setTeamName] = useState('');

    const handleSave = async () => {
        const teamCaptain = auth.currentUser?.uid;

        if (teamName.trim() === '' || teamAcronym.trim() === '') {
            Alert.alert('Erro', 'Todos os campos são obrigatórios.');
            return;
        }

        if (teamAcronym.length !== 3) {
            Alert.alert('Erro', 'A sigla deve ter exatamente 3 caracteres.');
            return;
        }

        const newTeamRef = push(ref(db, '/teams/'));

        await set(newTeamRef, {
            teamAcronym,
            teamCaptain,
            teamDescription,
            teamImage,
            teamName,
        });

        Alert.alert('Sucesso', `Equipa "${teamName}" criada com sucesso!`);

        router.push('/myteams');
    };

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBar level={5} progress={0.5} games={10}/>

            <Text style={styles.header}>Criar Nova Equipa</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome da Equipa"
                value={teamName}
                onChangeText={setTeamName}
            />

            <TextInput
                style={styles.input}
                placeholder="Sigla da Equipa (3 caracteres)"
                value={teamAcronym}
                onChangeText={setTeamAcronym}
                maxLength={3}
            />

            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Descrição da Equipa"
                value={teamDescription}
                onChangeText={setTeamDescription}
                multiline={true}
                numberOfLines={4}
            />

            <Pressable style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Salvar Equipa</Text>
            </Pressable>

            {/* Barra de Navegação */}
            <NavigationBar selected="create-team" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ced4da',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#ffffff',
        marginBottom: 15,
    },
    textArea: {
        height: 100,
    },
    saveButton: {
        backgroundColor: '#007bff',
        padding: 15,
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20,
    },
    saveButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});