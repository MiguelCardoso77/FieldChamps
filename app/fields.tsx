import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import NavigationBar from "@/components/NavigationBar";
import TopBar from "@/components/TopBar";
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
        <Pressable style={styles.fieldContainer}>
            <Image source={{ uri: item.image }} style={styles.fieldImage} />
            <View style={styles.overlay}>
                <Text style={styles.fieldName}>{item.name}</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.fieldLocation}>{item.location}</Text>
                    <Text style={styles.fieldPrice}>{item.price}</Text>
                </View>
                <MaterialCommunityIcons name="heart" size={24} color="#fff" style={styles.favoriteIcon} />
            </View>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBar level={5} progress={0.5} games={10}/>

            {/* Content Section with Padding */}
            <View style={styles.contentContainer}>
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
            </View>

            {/* Navigation Bar */}
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
        flex: 1,
        paddingTop: 60,
    },
    list: {
        paddingBottom: 20,
    },
    fieldContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    fieldImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay on image
        borderRadius: 8,
    },
    fieldName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    fieldLocation: {
        fontSize: 14,
        color: '#fff',
    },
    fieldPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },
    favoriteIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 24,
        height: 24,
        tintColor: '#fff',  // Ensure the icon is visible on the dark overlay
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
    },
});