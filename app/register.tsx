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
        await set(ref(db, `/users/${userId}`), { name, surname, email, subscribeNewsletter});
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

    const handleNavigation = (path: string) => {
        // @ts-ignore
        router.push(`/${path}`);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Registro</Text>
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

            <View style={styles.checkboxContainer}>
                <Checkbox
                    value={subscribeNewsletter}
                    onValueChange={setSubscribeNewsletter}
                    color={subscribeNewsletter ? '#4caf50' : undefined} // Cor do checkbox quando marcado
                />
                <Text style={styles.checkboxText}>
                    Quero que me a o boletim informativo FieldChamps para me manter atualizado com as últimas notícias.
                </Text>
            </View>
            <View style={styles.checkboxContainer}>
                <Checkbox
                    value={acceptTermsConditions}
                    onValueChange={setAcceptTermsConditions}
                    color={acceptTermsConditions ? '#4caf50' : undefined} // Cor do checkbox quando marcado
                />
                <Text style={styles.checkboxText}>
                    Concordo com os Termos e Condições e Políticas de Privacidade.
                </Text>
            </View>

            <Pressable style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Inscrever-me</Text>
            </Pressable>

            <Text style={styles.orText}>ou</Text>

            <Pressable style={styles.googleButton} onPress={() => {/* Handle Google login */}}>
                <Text style={styles.googleButtonText}>Iniciar sessão com Google</Text>
            </Pressable>

            <Pressable style={styles.facebookButton} onPress={() => { /* Handle Facebook login */ }}>
                <Text style={styles.facebookButtonText}>Iniciar sessão com Facebook</Text>
            </Pressable>

            <Text style={styles.termsText}>
                Ao continuares, aceitas os nossos Termos e Condições e a Política de Privacidade.
            </Text>

            <Pressable onPress={() => handleNavigation('login')}>
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
        backgroundColor: '#0a1f44', // Fundo semelhante ao da imagem
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
        backgroundColor: '#142b5e', // Fundo de input escuro
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
        backgroundColor: '#4caf50', // Cor do botão "Inscrever-me"
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
        backgroundColor: '#db4437', // Cor do botão do Google
        padding: 12,
        alignItems: 'center',
        borderRadius: 4,
    },
    googleButtonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    facebookButton: {
        backgroundColor: '#1877F2', // Cor do botão do Facebook
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
        color: '#4caf50', // Cor do link para iniciar sessão
        fontSize: 14,
        textAlign: 'center',
        marginTop: 20,
    },
});