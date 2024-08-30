import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {auth, db} from '@/firebaseConfig';
import {ref, update} from "firebase/database";
import {useRouter} from "expo-router";
import NavigationBar from "@/components/NavigationBar";
import TopBarReturn from "@/components/TopBarReturn";
import {Styles} from "@/constants/Styles";

export default function Preferences() {
    const router = useRouter();
    const [dominantFoot, setDominantFoot] = useState('');
    const [position, setPosition] = useState('');
    const [gameType, setGameType] = useState('');
    const [preferredTimes, setPreferredTimes] = useState('');

    const handleSave = async () => {
        try {
            const userId = auth.currentUser?.uid;

            await update(ref(db, `/users/${userId}/preferences`), {
                dominantFoot,
                position,
                gameType,
                preferredTimes,
            });

            console.log('Profile updated:', {dominantFoot});
            router.push('/ProfileScreen');

        } catch (error) {
            console.error("Error saving user data: ", error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBarReturn selected={'ProfileScreen'} title={'Editar Preferências'}/>

            <View style={Styles.pageContainer}>

                {/* Dominant Foot */}
                <View style={styles.inputGroup}>
                    <MaterialCommunityIcons name="shoe-print" size={24} color="#007BFF" style={styles.icon}/>
                    <Text style={styles.label}>Dominant Foot</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={dominantFoot}
                            onValueChange={(itemValue) => setDominantFoot(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Não definido" value=""/>
                            <Picker.Item label="Right" value="Right"/>
                            <Picker.Item label="Left" value="Left"/>
                        </Picker>
                    </View>
                </View>

                {/* Position */}
                <View style={styles.inputGroup}>
                    <MaterialCommunityIcons name="soccer-field" size={24} color="#007BFF" style={styles.icon}/>
                    <Text style={styles.label}>Position</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={position}
                            onValueChange={(itemValue) => setPosition(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Não definido" value=""/>
                            <Picker.Item label="Goalkeeper" value="Goalkeeper"/>
                            <Picker.Item label="Defender" value="Defender"/>
                            <Picker.Item label="Midfielder" value="Midfielder"/>
                            <Picker.Item label="Forward" value="Forward"/>
                        </Picker>
                    </View>
                </View>

                {/* Game Type */}
                <View style={styles.inputGroup}>
                    <MaterialCommunityIcons name="soccer" size={24} color="#007BFF" style={styles.icon}/>
                    <Text style={styles.label}>Game Type</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={gameType}
                            onValueChange={(itemValue) => setGameType(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Não definido" value=""/>
                            <Picker.Item label="5-a-side" value="5-a-side"/>
                            <Picker.Item label="7-a-side" value="7-a-side"/>
                            <Picker.Item label="11-a-side" value="11-a-side"/>
                        </Picker>
                    </View>
                </View>

                {/* Preferred Times */}
                <View style={styles.inputGroup}>
                    <MaterialCommunityIcons name="clock-outline" size={24} color="#007BFF" style={styles.icon}/>
                    <Text style={styles.label}>Preferred Times</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={preferredTimes}
                            onValueChange={(itemValue) => setPreferredTimes(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Não definido" value=""/>
                            <Picker.Item label="Morning" value="Morning"/>
                            <Picker.Item label="Afternoon" value="Afternoon"/>
                            <Picker.Item label="Evening" value="Evening"/>
                        </Picker>
                    </View>
                </View>

                {/* Save Button */}
                <Pressable style={({pressed}) => [styles.saveButton, pressed && {backgroundColor: '#0056b3'}]}
                           onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </Pressable>

            </View>

            {/* Navigation Bar */}
            <NavigationBar selected="ProfileScreen"/>
        </View>
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
    inputGroup: {
        marginBottom: 15,
    },
    icon: {
        marginBottom: 5,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    pickerContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    picker: {
        height: 50,
        color: '#333',
    },
    saveButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 3},
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
