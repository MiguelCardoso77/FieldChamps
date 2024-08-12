import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import NavigationBar from "@/app/NavigationBar";

type Field = {
    id: string;
    name: string;
    location: string;
    availability: string;
};

const fields: Field[] = [
    { id: '1', name: 'Campo de Futebol', location: 'Rua A, Bairro X', availability: 'Disponível' },
    { id: '2', name: 'Quadra de Tênis', location: 'Rua B, Bairro Y', availability: 'Indisponível' },
    { id: '3', name: 'Sala de Conferência', location: 'Avenida C, Bairro Z', availability: 'Disponível' },
    { id: '4', name: 'Campo de Basquete', location: 'Rua D, Bairro W', availability: 'Indisponível' },
    // Adicione mais campos conforme necessário
];

export default function FieldsScreen() {
    const router = useRouter();

    const renderItem = ({ item }: { item: Field }) => (
        <TouchableOpacity style={styles.fieldContainer}>
            <Text style={styles.fieldName}>{item.name}</Text>
            <Text style={styles.fieldLocation}>{item.location}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Campos Disponíveis</Text>
            <FlatList
                data={fields}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />

            {/* Barra de Navegação */}
            <NavigationBar selected="fields" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 20,
    },
    contentContainer: {
        flexGrow: 1,
        paddingBottom: 60,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    list: {
        paddingBottom: 20,
    },
    fieldContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    fieldName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    fieldLocation: {
        fontSize: 14,
        color: '#666',
        marginVertical: 5,
    },
    fieldAvailability: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    available: {
        color: '#007BFF',
    },
    unavailable: {
        color: '#FF3B30',
    },
});
