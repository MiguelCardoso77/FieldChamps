import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/profile')}>
                <Text style={styles.buttonText}>Go to Profile</Text>
            </TouchableOpacity>
            <Text style={styles.text}>FieldChamps.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },
    text: {
        fontSize: 18,
    },
});
