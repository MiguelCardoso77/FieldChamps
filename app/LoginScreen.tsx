import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth } from '@/firebaseConfig';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from "@firebase/auth";
import { Styles } from "@/constants/Styles";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from "@/constants/Colors";

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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

    const handleGoogleLogin = async () => {
        try {
            router.push('/home');
        } catch (error : any) {
            console.error('Erro ao fazer login:', error.message);
            alert('Erro ao fazer login: ' + error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={Styles.pageContainer}>

                <Text style={styles.header}>Bem-Vindo de Volta</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholderTextColor="#d3d3d3"
                />

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        placeholderTextColor="#d3d3d3"
                    />

                    {/* Botão de mostrar/esconder password */}
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                        <MaterialCommunityIcons
                            name={showPassword ? 'eye' : 'eye-off'}
                            size={24}
                            color="#d3d3d3"
                        />
                    </Pressable>
                </View>

                <Pressable style={styles.link} onPress={() => router.push('/ForgotPasswordScreen')}>
                    <Text style={styles.linkText}>Esqueceu-se da palavra-passe?</Text>
                </Pressable>

                <Pressable style={styles.signInButton} onPress={ handleLogin }>
                    <Text style={styles.signInButtonText}>Login</Text>
                </Pressable>

                <Pressable style={styles.googleButton} onPress={ handleGoogleLogin }>
                    <MaterialCommunityIcons name="google" size={24} color="#ffffff" style={styles.googleIcon} />
                    <Text style={styles.googleButtonText}>Login com o Google</Text>
                </Pressable>

            </View>
        </View>
    );
}

// TODO: Ícone do Google a cores
// TODO: Implementar login com Google
// TODO: Fundo mais interessante

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.darkBlue.background,
        paddingHorizontal: 10,
    },
    header: {
        fontSize: 32,
        color: '#ffffff',
        marginBottom: 24,
        textAlign: 'center',
        fontWeight: 'bold',
    },

    // Estilos para o campo de email
    input: {
        height: 50,
        borderColor: '#ffffff',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 16,
        color: '#ffffff',
        backgroundColor: '#142b5e',
        borderRadius: 8,
        fontSize: 16,
    },

    // Estilos para o campo de password
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#142b5e',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    passwordInput: {
        flex: 1,
        height: 50,
        color: '#ffffff',
        fontSize: 16,
    },
    eyeIcon: {
        width: 24,
        height: 24,
        tintColor: '#d3d3d3',
    },

    // Estilos para o botão de login
    signInButton: {
        backgroundColor: '#ffffff',
        padding: 16,
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 24,
    },
    signInButtonText: {
        color: '#0a0f24',
        fontSize: 16,
        fontWeight: 'bold',
    },

    // Estilos para o botão de login com Google
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        padding: 16,
        borderRadius: 8,
        marginTop: 24,
        justifyContent: 'center',
    },
    googleIcon: {
        position: 'absolute',
        left: 16,
    },
    googleButtonText: {
        color: '#ffffff',
        fontSize: 16,
        textAlign: 'center',
    },

    // Estilos para o link de "Esqueceu-se da palavra-passe?"
    link: {
        alignItems: 'flex-start',
        width: '100%',
    },
    linkText: {
        color: '#6cbcf1',
        fontSize: 14,
    },
});