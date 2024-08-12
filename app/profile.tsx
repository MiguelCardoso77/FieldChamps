import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const userProfile = {
    name: 'Miguel Cardoso',
    email: 'miguel@example.com',
    image: require('../assets/images/profile.png'),
};

export default function ProfileScreen() {
    const handleEditProfile = () => {
        // Lógica para editar perfil
        console.log('Edit Profile pressed');
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
                <Image source={userProfile.image} style={styles.profileImage} />
                <Text style={styles.profileName}>{userProfile.name}</Text>
                <Text style={styles.profileEmail}>{userProfile.email}</Text>
            </View>

            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                <MaterialCommunityIcons name="pencil" size={20} color="#fff" />
                <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 30,
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        alignSelf: 'center',
        width: '100%',
        maxWidth: 400,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    profileEmail: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 10,
    },
});
