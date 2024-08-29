import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import NavigationBar from "@/components/NavigationBar";
import TopBarStats from "@/components/TopBarStats";
import { db } from '@/firebaseConfig';
import { ref, onValue } from "firebase/database";
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Field = {
    id: string;
    name: string;
    location: string;
    timetable: string;
    image: any;
    price: string;
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
                    timetable: data[key].timetable,
                    image: data[key].image,
                    price: data[key].price,
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
        <Pressable
            style={styles.fieldContainer}
            onPress={() => router.push(`/FieldDetailsScreen?id=${item.id}`)} // Passando o ID do campo na navegação
        >
            <Image source={{ uri: item.image }} style={styles.fieldImage} />
            <View style={styles.overlay}>
                <Text style={styles.fieldName}>{item.name}</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.fieldLocation}>{item.location}</Text>
                    <Text style={styles.fieldPrice}>{item.price}</Text>
                </View>
                <MaterialCommunityIcons name="heart-outline" size={28} color="#fff" style={styles.favoriteIcon} />
            </View>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <TopBarStats />

            <View style={styles.contentContainer}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#007BFF" />
                        <Text style={styles.loadingText}>Carregando campos...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={fields}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.list}
                    />
                )}
            </View>

            <NavigationBar selected="fields" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8',
    },
    contentContainer: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 15,
    },
    list: {
        paddingBottom: 20,
    },
    fieldContainer: {
        position: 'relative',
        marginBottom: 20,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    fieldImage: {
        width: '100%',
        height: 200,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-between',
        padding: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    fieldName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    fieldLocation: {
        fontSize: 16,
        color: '#FFF',
    },
    fieldPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
    favoriteIcon: {
        position: 'absolute',
        top: 12,
        right: 12,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        marginTop: 10,
        color: '#666',
    },
});
