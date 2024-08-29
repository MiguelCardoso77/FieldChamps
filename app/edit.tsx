import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Image, ScrollView } from 'react-native';
import { auth, db } from '@/firebaseConfig';
import { ref, get, update } from "firebase/database";
import { useRouter } from "expo-router";
import TopBarReturn from "@/components/TopBarReturn";
import { Styles } from "@/constants/Styles";
import NavigationBar from "@/components/NavigationBar";
import { Picker } from '@react-native-picker/picker';
import { countries } from '@/constants/Lists'; // Adjust the path based on your project structure

export default function Edit() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneCode, setPhoneCode] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [description, setDescription] = useState('');
    const [country, setCountry] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = auth.currentUser?.uid;
                if (userId) {
                    const userRef = ref(db, `users/${userId}/profile`);
                    const snapshot = await get(userRef);

                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        setName(userData.name || '');
                        setSurname(userData.surname || '');
                        setEmail(userData.email || '');
                        setPhoneCode(userData.phoneCode || '');
                        setPhone(userData.phone || '');
                        setGender(userData.gender || '');
                        setBirthDate(userData.birthDate || '');
                        setDescription(userData.description || '');
                        setCountry(userData.country || '');
                        setImage(userData.image || ''); // Use userData.image instead of userData.profileImageUri
                    }
                }
            } catch (error) {
                console.error("Error fetching user data: ", error);
            }
        };

        fetchUserData();
    }, []);

    const handleSave = async () => {
        try {
            const userId = auth.currentUser?.uid;

            await update(ref(db, `/users/${userId}/profile`), {
                name,
                surname,
                email,
                phoneCode,
                phone,
                gender,
                birthDate,
                description,
                country,
                image,  // Save the image using the correct key
            });

            console.log('Profile updated:', { name, email });
            router.push('/profile');

        } catch (error) {
            console.error("Error saving user data: ", error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Top Bar */}
            <TopBarReturn selected={'profile'} title={'Editar Perfil'} />

            <View style={Styles.pageContainer}>

                {/* Imagem de perfil */}
                <View style={styles.profileImageContainer}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.profileImage} />
                    ) : (
                        <View style={styles.profilePlaceholder}>
                            <Text style={styles.placeholderText}>No Image</Text>
                        </View>
                    )}
                </View>

                {/* Image URI Input */}
                <TextInput
                    style={styles.input}
                    value={image}
                    onChangeText={setImage}
                    placeholder="Profile Image URI"
                />

                {/* Nome */}
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Nome"
                />

                {/* Apelido */}
                <TextInput
                    style={styles.input}
                    value={surname}
                    onChangeText={setSurname}
                    placeholder="Apelido"
                />

                {/* Email */}
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    keyboardType="email-address"
                />

                {/* Número de telefone */}
                <View style={styles.inputRow}>
                    <TextInput
                        style={[styles.input, styles.inputHalf]}
                        value={phoneCode}
                        onChangeText={setPhoneCode}
                        placeholder="Código País"
                    />
                    <TextInput
                        style={[styles.input, styles.inputHalf]}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Telefone"
                    />
                </View>

                {/* Género */}
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={gender}
                        onValueChange={(itemValue) => setGender(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Masculino" value="Masculino" />
                        <Picker.Item label="Feminino" value="Feminino" />
                        <Picker.Item label="Outro" value="Outro" />
                    </Picker>
                </View>

                {/* Data de Nascimento */}
                <TextInput
                    style={styles.input}
                    value={birthDate}
                    onChangeText={setBirthDate}
                    placeholder="Data de Nascimento"
                />

                {/* Descrição */}
                <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Descrição"
                    multiline
                    numberOfLines={4}
                />

                {/* País */}
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={country}
                        onValueChange={(itemValue) => setCountry(itemValue)}
                        style={styles.picker}
                    >
                        {countries.map((country, index) => (
                            <Picker.Item key={index} label={country} value={country} />
                        ))}
                    </Picker>
                </View>

                {/* Botão de guardar */}
                <Pressable style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </Pressable>

            </View>

            {/* Navigation Bar */}
            <NavigationBar selected="profile" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    profileImageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#007BFF',
        marginBottom: 10,
    },
    profilePlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    placeholderText: {
        color: '#aaa',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    inputHalf: {
        flex: 1,
        marginRight: 10,
    },
    pickerContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 15,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    saveButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});
