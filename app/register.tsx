import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

export default function RegisterScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
    const [acceptTermsConditions, setAcceptTermsConditions] = useState(false);

    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/home');
        } catch (error) {
            // @ts-ignore
            console.error(error.message);
        }
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

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Inscrever-me</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>ou</Text>

            <TouchableOpacity style={styles.facebookButton} onPress={() => { /* Handle Facebook login */ }}>
                <Text style={styles.facebookButtonText}>Iniciar sessão com Facebook</Text>
            </TouchableOpacity>

            <Text style={styles.termsText}>
                Ao continuares, aceitas os nossos Termos e Condições e a Política de Privacidade.
            </Text>
            <Text style={styles.footerText}>
                Já tens uma conta? Inicia sessão
            </Text>
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
