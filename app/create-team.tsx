import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import NavigationBar from "@/components/NavigationBar";
import { auth, db } from '@/firebaseConfig';
import { ref, set, get } from 'firebase/database';
import TopBarReturn from "@/components/TopBarReturn";
import { Styles } from "@/constants/Styles";
import { Picker } from '@react-native-picker/picker';
import { generateTeamReference } from '@/constants/References';
import { districts } from '@/constants/Lists';

export default function CreateTeamScreen() {
    const router = useRouter();
    const [teamAcronym, setTeamAcronym] = useState('');
    const [teamDescription, setTeamDescription] = useState('');
    const [teamImage, setTeamImage] = useState('');
    const [teamName, setTeamName] = useState('');
    const [teamLocation, setTeamLocation] = useState(districts[0]); // Default to the first district
    const [teamPrivacy, setTeamPrivacy] = useState('public');
    const [teamCreationDate] = useState(new Date()); // Current date

    const handleSave = async () => {
        const teamCaptain = auth.currentUser?.uid;

        if (teamName.trim() === '' || teamAcronym.trim() === '') {
            Alert.alert('Erro', 'Nome da Equipa e Sigla são obrigatórios.');
            return;
        }

        if (teamAcronym.length !== 3) {
            Alert.alert('Erro', 'A sigla deve ter exatamente 3 caracteres.');
            return;
        }

        const generateUniqueReference = async () => {
            let reference;
            let exists = true;

            while (exists) {
                reference = generateTeamReference();
                const referenceRef = ref(db, `/teams/${reference}`);
                const referenceSnapshot = await get(referenceRef);
                exists = referenceSnapshot.exists();
            }

            return reference;
        };

        const teamReference = await generateUniqueReference();
        const newTeamRef = ref(db, `/teams/${teamReference}`);

        await set(newTeamRef, {
            teamAcronym,
            teamCaptain,
            teamDescription,
            teamImage,
            teamName,
            teamLocation,
            teamCreationDate: teamCreationDate.toISOString(), // Store date in ISO format
            teamMemberCount: 1, // Set default member count to 1 (the captain)
            teamPrivacy,
        });

        Alert.alert('Sucesso', `Equipa "${teamName}" criada com sucesso!`);

        router.push('/myteams');
    };

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBarReturn selected={'myteams'} title={'Criar Equipa'} />

            <View style={Styles.pageContainer}>

                <Text style={styles.header}>Criar Nova Equipa</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nome da Equipa"
                    placeholderTextColor="#b0b0b0" // Placeholder color
                    value={teamName}
                    onChangeText={setTeamName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Sigla da Equipa (3 caracteres)"
                    placeholderTextColor="#b0b0b0" // Placeholder color
                    value={teamAcronym}
                    onChangeText={setTeamAcronym}
                    maxLength={3}
                />

                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Descrição da Equipa"
                    placeholderTextColor="#b0b0b0" // Placeholder color
                    value={teamDescription}
                    onChangeText={setTeamDescription}
                    multiline={true}
                    numberOfLines={4}
                />

                <TextInput
                    style={styles.input}
                    placeholder="URL da Imagem da Equipa"
                    placeholderTextColor="#b0b0b0" // Placeholder color
                    value={teamImage}
                    onChangeText={setTeamImage}
                />

                <View style={styles.pickerContainer}>
                    <Text style={styles.label}>Localização da Equipa</Text>
                    <Picker
                        selectedValue={teamLocation}
                        style={styles.picker}
                        onValueChange={(itemValue) => setTeamLocation(itemValue)}
                    >
                        {districts.map(district => (
                            <Picker.Item key={district} label={district} value={district} />
                        ))}
                    </Picker>
                </View>

                <View style={styles.pickerContainer}>
                    <Text style={styles.label}>Privacidade da Equipa</Text>
                    <Picker
                        selectedValue={teamPrivacy}
                        style={styles.picker}
                        onValueChange={(itemValue) => setTeamPrivacy(itemValue)}
                    >
                        <Picker.Item label="Pública" value="public" />
                        <Picker.Item label="Privada" value="private" />
                    </Picker>
                </View>

                <Pressable style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Salvar Equipa</Text>
                </Pressable>

            </View>

            {/* Navigation Bar */}
            <NavigationBar selected="create-team" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#343a40', // Dark background
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#495057', // Slightly lighter border color
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#495057', // Dark background for inputs
        color: '#ffffff', // Text color
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
    pickerContainer: {
        marginBottom: 15,
    },
    picker: {
        height: 50,
        borderColor: '#495057', // Slightly lighter border color
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#495057', // Dark background for picker
        color: '#ffffff', // Text color
    },
    label: {
        fontSize: 16,
        color: '#ffffff', // Text color for labels
        marginBottom: 5,
    },
});