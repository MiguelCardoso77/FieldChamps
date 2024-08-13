import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();

    const handleNavigation = (screen: string) => {
        // @ts-ignore
        router.push(`/${screen}` as string);
    };

    return (
        <ImageBackground
            source={require('../assets/images/wallpaper.jpg')}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>Bem-vindo ao FieldChamps!</Text>
                <Text style={styles.subtitle}>Aqui o teu futebol nunca mais será o mesmo.</Text>

                <TouchableOpacity
                    style={styles.buttonPrimary}
                    onPress={() => handleNavigation('register')}
                >
                    <Text style={styles.buttonText}>Novo por aqui?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonSecondary}
                    onPress={() => handleNavigation('login')}
                >
                    <Text style={styles.buttonText}>Já sou membro</Text>
                </TouchableOpacity>
                <Text style={styles.footer}>PT Feito em Portugal</Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
        width: '100%',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#ffffff',
        marginBottom: 40,
        textAlign: 'center',
    },
    buttonPrimary: {
        backgroundColor: '#9fdc00', // Cor do botão "Novo por aqui?"
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonSecondary: {
        backgroundColor: '#6b7d00', // Cor do botão "Já sou membro"
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500',
    },
    footer: {
        marginTop: 20,
        color: '#ffffff',
        fontSize: 12,
    },
});
