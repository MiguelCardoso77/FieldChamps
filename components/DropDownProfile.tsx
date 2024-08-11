import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
    Home: undefined;
    Profile: undefined;
    Settings: undefined;
};

const DropDownProfile: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Profile')}>
                <Text style={styles.text}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Settings')}>
                <Text style={styles.text}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <Text style={styles.text}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    item: {
        padding: 10,
    },
    text: {
        fontSize: 16,
    },
});

export default DropDownProfile;
