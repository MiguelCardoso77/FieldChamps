import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth } from '@/firebaseConfig';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from "@firebase/auth";

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Usuário logado:', userCredential.user);
            router.push('/home');

        } catch (error : any) {
            console.error('Erro ao fazer login:', error.message);
            alert('Erro ao fazer login: ' + error.message);
        }
    };

    const devLogin = () => {
        router.push('/home');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>

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
                placeholder="Palavra-passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#d3d3d3"
            />

            <Pressable style={styles.button} onPress={ handleLogin }>
                <Text style={styles.buttonText}>Entrar</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={ devLogin }>
                <Text style={styles.buttonText}>Dev Login</Text>
            </Pressable>

            <Pressable style={styles.link} onPress={() => router.push('/register')}>
                <Text style={styles.linkText}>Ainda não tem uma conta? Registre-se</Text>
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
    link: {
        marginTop: 20,
        alignItems: 'center',
    },
    linkText: {
        color: '#4caf50',
        fontSize: 14,
    },
});
