import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Home' }} />
            <Stack.Screen name="profile" options={{ title: 'Profile' }} />
            <Stack.Screen name="team" options={{ title: 'Team' }} />
            <Stack.Screen name="player/[playerId]" options={{ title: 'Player Profile' }} />
            <Stack.Screen name="login" options={{ title: 'Login' }} />
        </Stack>
    );
}
