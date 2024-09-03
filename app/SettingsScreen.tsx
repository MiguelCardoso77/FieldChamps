import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { auth } from '@/firebaseConfig';
import NavigationBar from "@/components/NavigationBar";
import TopBarReturn from "@/components/TopBarReturn";
import { signOut } from "@firebase/auth";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Styles } from "@/constants/Styles";

export default function SettingsScreen() {
    const router = useRouter();

    const handlePress = (screen: string) => {
        // @ts-ignore
        router.push(`/${screen}`);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            Alert.alert('Erro ao Sair', 'Houve um erro ao tentar sair. Por favor, tente novamente.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBarReturn selected={'home'} title={'Definições'} />

            <ScrollView style={Styles.pageContainer}>
                {/* Category Header */}
                <View style={styles.categoryContainer}>
                    <Text style={styles.header}>A Gostar do GameOn?</Text>
                    <View style={styles.categoryDivider} />
                </View>

                {/* Leave a Review */}
                <Pressable style={styles.settingItem} onPress={() => handlePress('review')}>
                    <MaterialCommunityIcons name="star-outline" size={24} color="#ffffff" />
                    <Text style={styles.settingText}>Deixe uma Avaliação</Text>
                </Pressable>

                {/* Help Us Improve */}
                <Pressable style={styles.settingItem} onPress={() => handlePress('feedback')}>
                    <MaterialCommunityIcons name="tag-arrow-up" size={24} color="#ffffff" />
                    <Text style={styles.settingText}>Ajude-nos a Melhorar</Text>
                </Pressable>

                {/* Category Header */}
                <View style={styles.categoryContainer}>
                    <Text style={styles.header}>A Sua Conta</Text>
                    <View style={styles.categoryDivider} />
                </View>

                {/* Profile */}
                <Pressable style={styles.settingItem} onPress={() => handlePress('edit')}>
                    <MaterialCommunityIcons name="account-outline" size={24} color="#ffffff" />
                    <Text style={styles.settingText}>Perfil</Text>
                </Pressable>

                {/* Account */}
                <Pressable style={styles.settingItem} onPress={() => handlePress('account')}>
                    <MaterialCommunityIcons name="lock-outline" size={24} color="#ffffff" />
                    <Text style={styles.settingText}>Conta</Text>
                </Pressable>

                {/* Get GameOn! Premium */}
                <Pressable style={styles.settingItem} onPress={() => handlePress('premium')}>
                    <MaterialCommunityIcons name="crown-outline" size={24} color="#ffffff" />
                    <Text style={styles.settingText}>Adquira o GameOn! Premium</Text>
                </Pressable>

                {/* Category Header */}
                <View style={styles.categoryContainer}>
                    <Text style={styles.header}>Preferências</Text>
                    <View style={styles.categoryDivider} />
                </View>

                {/* Themes */}
                <Pressable style={styles.settingItem} onPress={() => handlePress('themes')}>
                    <MaterialCommunityIcons name="theme-light-dark" size={24} color="#ffffff" />
                    <Text style={styles.settingText}>Temas</Text>
                </Pressable>

                {/* Languages */}
                <Pressable style={styles.settingItem} onPress={() => handlePress('languages')}>
                    <MaterialCommunityIcons name="translate" size={24} color="#ffffff" />
                    <Text style={styles.settingText}>Idiomas</Text>
                </Pressable>

                {/* Notifications */}
                <Pressable style={styles.settingItem} onPress={() => handlePress('notifications')}>
                    <MaterialCommunityIcons name="bell-outline" size={24} color="#ffffff" />
                    <Text style={styles.settingText}>Notificações</Text>
                </Pressable>

                {/* Category Header */}
                <View style={styles.categoryContainer}>
                    <Text style={styles.header}>Suporte</Text>
                    <View style={styles.categoryDivider} />
                </View>

                {/* What's New */}
                <Pressable style={styles.settingItem} onPress={() => handlePress('whatsnew')}>
                    <MaterialCommunityIcons name="new-box" size={24} color="#ffffff" />
                    <Text style={styles.settingText}>Novidades</Text>
                </Pressable>

                {/* Contact Us */}
                <Pressable style={styles.settingItem} onPress={() => handlePress('contact')}>
                    <MaterialCommunityIcons name="phone-outline" size={24} color="#ffffff" />
                    <Text style={styles.settingText}>Contacte-nos</Text>
                </Pressable>

                {/* Category Header */}
                <View style={styles.categoryContainer}>
                    <Text style={styles.header}>Informações Legais</Text>
                    <View style={styles.categoryDivider} />
                </View>

                {/* Privacy Policy */}
                <Pressable style={styles.settingItem} onPress={() => handlePress('privacy')}>
                    <MaterialCommunityIcons name="file-document-outline" size={24} color="#ffffff" />
                    <Text style={styles.settingText}>Política de Privacidade</Text>
                </Pressable>

                {/* Terms of Use */}
                <Pressable style={styles.settingItem} onPress={() => handlePress('terms')}>
                    <MaterialCommunityIcons name="file-document-outline" size={24} color="#ffffff" />
                    <Text style={styles.settingText}>Termos de Uso</Text>
                </Pressable>

                {/* Logout */}
                <Pressable style={styles.logoutButton} onPress={ handleLogout }>
                    <Text style={styles.logoutButtonText}>Sair</Text>
                </Pressable>
            </ScrollView>

            {/* Navigation Bar */}
            <NavigationBar selected="home"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'left',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    settingText: {
        fontSize: 18,
        color: '#ffffff',
        marginLeft: 10,
    },
    logoutButton: {
        marginTop: 40,
        paddingVertical: 15,
        backgroundColor: 'transparent',
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    logoutButtonText: {
        color: '#ff3b30',
        fontSize: 18,
        fontWeight: 'bold',
    },
    categoryContainer: {
        marginVertical: 10,
        paddingHorizontal: 15,
    },
    categoryDivider: {
        height: 1,
        backgroundColor: '#333',
        marginVertical: 10,
    },
});
