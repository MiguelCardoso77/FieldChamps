import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const userName = 'Miguel';

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image
                    source={require('../assets/images/profile.png')}
                    style={styles.profileImage}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.greetingText}>Boa tarde</Text>
                    <Text style={styles.nameText}>{userName}!</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/profile')}>
                <Text style={styles.buttonText}>Go to Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/team')}>
                <Text style={styles.buttonText}>Go to Team</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: 20,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 20,
    },
    textContainer: {
        justifyContent: 'center', // Garantir que o texto esteja centralizado verticalmente
    },
    greetingText: {
        fontSize: 18,
        color: '#333',
    },
    nameText: {
        fontSize: 20,
        color: '#333',
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },
});
