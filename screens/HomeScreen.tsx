import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownProfile from '../components/DropDownProfile';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <DropDownProfile />
            <Text style={styles.text}>FieldChamps.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
    },
});
