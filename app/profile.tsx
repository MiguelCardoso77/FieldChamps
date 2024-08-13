import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import NavigationBar from "@/app/NavigationBar"; // Atualizado para navegação

const userProfile = {
    name: 'Miguel Cardoso',
    email: 'miguel@example.com',
    image: require('../assets/images/profile.png'),
};

export default function ProfileScreen() {
    const navigation = useNavigation();

    const handleEditProfile = () => {
        navigation.navigate('edit'); // Navega para a tela de edição
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#007BFF', '#00aaff']}
                style={styles.headerGradient}
            >
                <View style={styles.profileHeader}>
                    <Image source={userProfile.image} style={styles.profileImage} />
                    <Text style={styles.profileName}>{userProfile.name}</Text>
                    <Text style={styles.profileEmail}>{userProfile.email}</Text>
                </View>
            </LinearGradient>

            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                <MaterialCommunityIcons name="pencil" size={20} color="#fff" />
                <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>

            {/* Barra de Navegação */}
            <NavigationBar selected="profile" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    headerGradient: {
        padding: 20,
        borderRadius: 15,
        marginBottom: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    profileHeader: {
        alignItems: 'center',
    },
    profileImage: {
        width: 130,
        height: 130,
        borderRadius: 65,
        marginBottom: 15,
        borderWidth: 3,
        borderColor: '#fff',
    },
    profileName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    profileEmail: {
        fontSize: 18,
        color: '#e0e0e0',
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
        shadowOpacity: 0.3,
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

