import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ActivityIndicator} from 'react-native';
import {useRouter, useLocalSearchParams} from 'expo-router';
import {db} from '@/firebaseConfig';
import {ref, onValue} from "firebase/database";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import TopBarReturn from "@/components/TopBarReturn";
import NavigationBar from "@/components/NavigationBar";
import {Styles} from "@/constants/Styles";

type Field = {
    id: string;
    name: string;
    location: string;
    timetable: string;
    image: any;
    price: string;
    description: string;
};

export default function FieldDetailScreen() {
    const router = useRouter();
    const {id} = useLocalSearchParams(); // Capturando o ID do campo a partir dos parâmetros da URL
    const [field, setField] = useState<Field | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fieldRef = ref(db, `/fields/${id}`);
        const unsubscribe = onValue(fieldRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setField({
                    id: id as string,
                    name: data.name,
                    location: data.location,
                    timetable: data.timetable,
                    image: data.image,
                    price: data.price,
                    description: data.description || 'Sem descrição disponível.',
                });
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF"/>
                <Text style={styles.loadingText}>Carregando detalhes...</Text>
            </View>
        );
    }

    if (!field) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Campo não encontrado.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBarReturn selected={'fields'} title={'Detalhes do Campo'} />

            <View style={Styles.pageContainer}>
                <Image source={{uri: field.image}} style={styles.fieldImage}/>
                <View style={styles.infoContainer}>
                    <Text style={styles.fieldName}>{field.name}</Text>
                    <Text style={styles.fieldLocation}>{field.location}</Text>
                    <Text style={styles.fieldPrice}>Preço: {field.price}</Text>
                    <Text style={styles.fieldTimetable}>Horário: {field.timetable}</Text>
                    <Text style={styles.fieldDescription}>{field.description}</Text>
                </View>
            </View>

            {/* Navigation Bar */}
            <NavigationBar selected="fields"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a', // Fundo escuro
    },
    fieldImage: {
        width: '100%',
        height: 300,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    infoContainer: {
        padding: 20,
        backgroundColor: '#2a2a2a', // Fundo levemente contrastante para a seção de informações
        borderRadius: 12,
        margin: 10,
    },
    fieldName: {
        fontSize: 26, // Aumentando o tamanho da fonte
        fontWeight: 'bold',
        color: '#ffffff', // Texto claro
        marginBottom: 10,
    },
    fieldLocation: {
        fontSize: 18,
        color: '#cccccc', // Texto em cinza claro
        marginBottom: 5,
    },
    fieldPrice: {
        fontSize: 20, // Aumentando o tamanho da fonte
        fontWeight: 'bold',
        color: '#8ece11', // Cor vibrante para destaque
        marginBottom: 10,
    },
    fieldTimetable: {
        fontSize: 16,
        color: '#cccccc',
        marginBottom: 20,
    },
    fieldDescription: {
        fontSize: 16,
        color: '#e0e0e0',
        lineHeight: 24,
    },
    backIcon: {
        position: 'absolute',
        top: 40,
        left: 20,
        backgroundColor: '#333333', // Fundo escuro para ícone de volta
        borderRadius: 16,
        padding: 8, // Aumentando o padding para maior área clicável
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a', // Fundo escuro
    },
    loadingText: {
        fontSize: 16,
        marginTop: 10,
        color: '#cccccc',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a', // Fundo escuro
    },
    errorText: {
        fontSize: 18,
        color: '#FF6347', // Cor vibrante para o texto de erro
    },
});

