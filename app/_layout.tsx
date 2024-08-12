import React from 'react';
import { Stack } from 'expo-router';

// Definindo opções padrão para as telas
const screenOptions = {
    headerStyle: {
        backgroundColor: '#007BFF', // Cor de fundo do cabeçalho
    },
    headerTintColor: '#FFF', // Cor do texto do cabeçalho
    headerTitleStyle: {
        fontWeight: 'bold',
    },
};

export default function Layout() {
    return (
        <Stack
            screenOptions={screenOptions} // Aplicando opções padrão para todas as telas
        >
            <Stack.Screen
                name="index"
                options={{ title: 'FieldChamps' }}
            />
            <Stack.Screen
                name="profile"
                options={{ title: 'Profile' }}
            />
            <Stack.Screen
                name="team"
                options={{ title: 'Team' }}
            />
            <Stack.Screen
                name="calendar"
                options={{ title: 'Calendar' }}
            />
            <Stack.Screen
                name="fields"
                options={{ title: 'Fields' }}
            />
            <Stack.Screen
                name="settings"
                options={{ title: 'Settings' }}
            />

            <Stack.Screen name="login" options={{ title: 'Login' }} />
        </Stack>
    );
}

