import React from 'react';
import { View, Text, Pressable, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();

    return (
        <ImageBackground
            source={require('../assets/images/wallpaper.jpg')}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>Bem-vindo ao FieldChamps!</Text>
                <Text style={styles.subtitle}>Aqui o teu futebol nunca mais será o mesmo.</Text>

                <Pressable
                    style={styles.buttonPrimary}
                    onPress={() =>  router.push(`/register`) }
                >
                    <Text style={styles.buttonText}>Novo por aqui?</Text>
                </Pressable>
                <Pressable
                    style={styles.buttonSecondary}
                    onPress={() => router.push(`/login`) }
                >
                    <Text style={styles.buttonText}>Já sou membro</Text>
                </Pressable>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
        backgroundColor: '#9fdc00',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonSecondary: {
        backgroundColor: '#6b7d00',
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
