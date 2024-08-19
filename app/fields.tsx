import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import NavigationBar from "@/components/NavigationBar";
import TopBar from "@/components/TopBar";
import { db } from '@/firebaseConfig';
import { ref, onValue } from "firebase/database";

type Field = {
    id: string;
    name: string;
    location: string;
    availability: string;
};

export default function FieldsScreen() {
    const router = useRouter();
    const [fields, setFields] = useState<Field[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fieldsRef = ref(db, '/fields');
        const unsubscribe = onValue(fieldsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const parsedFields = Object.keys(data).map((key) => ({
                    id: key,
                    name: data[key].name,
                    location: data[key].location,
                    availability: data[key].availability,
                }));
                setFields(parsedFields);
            } else {
                setFields([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }: { item: Field }) => (
        <Pressable style={styles.fieldContainer}>
            <Text style={styles.fieldName}>{item.name}</Text>
            <Text style={styles.fieldLocation}>{item.location}</Text>
            <Text
                style={[
                    styles.fieldAvailability,
                    item.availability === 'Disponível' ? styles.available : styles.unavailable,
                ]}
            >
                {item.availability}
            </Text>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBar level={5} progress={0.5} games={10}/>

            <Text style={styles.title}>Campos Disponíveis</Text>

            {loading ? (
                <Text style={styles.loadingText}>Carregando...</Text>
            ) : (
                <FlatList
                    data={fields}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                />
            )}

            {/* Barra de Navegação */}
            <NavigationBar selected="fields" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
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
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
    },
});