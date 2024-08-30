import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import { auth, db } from '@/firebaseConfig';
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { ref, set } from "firebase/database";

export default function RegisterScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
    const [acceptTermsConditions, setAcceptTermsConditions] = useState(false);

    const createUser = async ( response: UserCredential ) => {
        const userId = response.user.uid;
        await set(ref(db, `/users/${userId}/profile`), {
            name,
            surname,
            email,
            phoneCode: "",
            phone: "",
            gender: "",
            birthDate: "",
            description: "",
            image: "",
            country: "",
        });

        await set(ref(db, `/users/${userId}/stats`), {
            level: 0,
            progress: 0,
            gamesPlayed: 0,
            goalsScored: 0,
            assists: 0,
            followers: 0,
            following: 0
        });

        await set(ref(db, `/users/${userId}/preferences`), {
            dominantFoot: "",
            position: "",
            gameType: "",
            preferredTimes: "",
            subscribeNewsletter,
        });

        await set(ref(db, `/users/${userId}/team`), {
            teamIdSlot1: "",
            teamIdSlot2: "",
            teamIdSlot3: "",
        });

        await set(ref(db, `/users/${userId}`), {
            trustFactor: 1.0,
        });
    }

    const handleRegister = async () => {
        if (!acceptTermsConditions) {
            Alert.alert("Erro", "Você deve aceitar os Termos e Condições para se registrar.");
            return;
        }

        try {
            // Cria o usuário com Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Navega para a tela inicial imediatamente
            router.push('/home');

            await createUser(userCredential);

        } catch (error) {
            // @ts-ignore
            console.error("Error creating user: ", error.message);
        }
    };

    const handleLogin = () => {
        router.push(`/login`);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Registro</Text>

            { /* Campos de registro */ }
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#d3d3d3"
            />
            <TextInput
                style={styles.input}
                placeholder="Apelido"
                value={surname}
                onChangeText={setSurname}
                placeholderTextColor="#d3d3d3"
            />
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholderTextColor="#d3d3d3"
            />
            <TextInput
                style={styles.input}
                placeholder="A tua palavra-passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#d3d3d3"
            />

            { /* Checkboxes */ }
            <View style={styles.checkboxContainer}>
                <Checkbox
                    value={subscribeNewsletter}
                    onValueChange={setSubscribeNewsletter}
                    color={subscribeNewsletter ? '#4caf50' : undefined}
                />
                <Text style={styles.checkboxText}>
                    Quero ser informado pela FieldChamps para me manter atualizado com as últimas notícias.
                </Text>
            </View>
            <View style={styles.checkboxContainer}>
                <Checkbox
                    value={acceptTermsConditions}
                    onValueChange={setAcceptTermsConditions}
                    color={acceptTermsConditions ? '#4caf50' : undefined}
                />
                <Text style={styles.checkboxText}>
                    Concordo com os Termos e Condições e Políticas de Privacidade.
                </Text>
            </View>

            { /* Botão de registro */ }
            <Pressable style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Inscrever-me</Text>
            </Pressable>

            <Text style={styles.orText}>ou</Text>

            { /* Botões de login com Google e Facebook */ }
            <Pressable style={styles.googleButton} onPress={() => {/* Handle Google login */}}>
                <Text style={styles.googleButtonText}>Iniciar sessão com Google</Text>
            </Pressable>
            <Pressable style={styles.facebookButton} onPress={() => { /* Handle Facebook login */ }}>
                <Text style={styles.facebookButtonText}>Iniciar sessão com Facebook</Text>
            </Pressable>

            <Text style={styles.termsText}>
                Ao continuares, aceitas os nossos Termos e Condições e a Política de Privacidade.
            </Text>

            { /* Link para a tela de login */ }
            <Pressable onPress={() => handleLogin()}>
                <Text style={styles.footerText}>
                    Já tens uma conta? Inicia sessão
                </Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#0a1f44',
    },
    header: {
        fontSize: 24,
        color: '#ffffff',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ffffff',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        color: '#ffffff',
        backgroundColor: '#142b5e',
        borderRadius: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    checkboxText: {
        color: '#ffffff',
        marginLeft: 8,
        flex: 1,
        fontSize: 14,
    },
    button: {
        backgroundColor: '#4caf50',
        padding: 12,
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    orText: {
        color: '#ffffff',
        textAlign: 'center',
        marginVertical: 10,
    },
    googleButton: {
        backgroundColor: '#db4437',
        padding: 12,
        alignItems: 'center',
        borderRadius: 4,
    },
    googleButtonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    facebookButton: {
        backgroundColor: '#1877F2',
        padding: 12,
        alignItems: 'center',
        borderRadius: 4,
    },
    facebookButtonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    termsText: {
        color: '#d3d3d3',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 20,
    },
    footerText: {
        color: '#4caf50',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 20,
    },
});