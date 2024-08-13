// SelectPhoneCode.js ou SelectPhoneCode.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const phoneCodes = [
    { code: '+1', country: 'United States' },
    { code: '+44', country: 'United Kingdom' },
    { code: '+33', country: 'France' },
    { code: '+49', country: 'Germany' },
    // Adicione mais códigos conforme necessário
];

export default function SelectPhoneCode({ route, navigation }) {
    const { setPhoneCode } = route.params || {}; // Verificar se os parâmetros estão disponíveis

    return (
        <View style={styles.container}>
            <FlatList
                data={phoneCodes}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            if (setPhoneCode) {
                                setPhoneCode(item.code); // Atualiza o indicativo no componente pai
                                navigation.goBack(); // Volta para a tela anterior
                            }
                        }}
                    >
                        <Text style={styles.text}>{item.code} - {item.country}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    text: {
        fontSize: 16,
    },
});
