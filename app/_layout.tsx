import React from 'react';
import { Stack } from 'expo-router';

const screenOptions = {
    headerStyle: {
        backgroundColor: '#9fdc00',
    },
    headerTintColor: '#FFF',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
};

export default function Layout() {

    return (
        // @ts-ignore
        <Stack screenOptions={screenOptions} >

            <Stack.Screen
                name="index"
                options={{ title: 'FieldChamps',  headerShown: false, }}
            />
            <Stack.Screen
                name="home"
                options={{ title: 'Home',  headerShown: false, }}
            />
            <Stack.Screen
                name="profile"
                options={{ title: 'Profile',  headerShown: false, }}
            />
            <Stack.Screen
                name="team"
                options={{ title: 'Team',  headerShown: false, }}
            />
            <Stack.Screen
                name="calendar"
                options={{ title: 'Calendar',  headerShown: false, }}
            />
            <Stack.Screen
                name="fields"
                options={{ title: 'Fields',  headerShown: false, }}
            />
            <Stack.Screen
                name="settings"
                options={{ title: 'Settings',  headerShown: false, }}
            />
            <Stack.Screen
                name="login"
                options={{ title: 'Login',  headerShown: false, }}
            />
            <Stack.Screen
                name="register"
                options={{ title: 'Register',  headerShown: false, }}
            />

        </Stack>
    );
}

