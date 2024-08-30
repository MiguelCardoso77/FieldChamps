import React from 'react';
import { Tabs } from 'expo-router';

const showDevBar = {
    tabBarStyle: { display: 'none' }
};

export default function Layout() {

    return (
        // @ts-ignore
        <Tabs screenOptions={ showDevBar }>

            {/* Start Screen */}
            <Tabs.Screen name="index" options={{ title: 'FieldChamps', headerShown: false }} />

            {/* Auth Screens */}
            <Tabs.Screen name="login" options={{ title: 'Login', headerShown: false }} />
            <Tabs.Screen name="register" options={{ title: 'Register', headerShown: false }} />

            {/* App Screens */}
            <Tabs.Screen name="home" options={{ title: 'Home', headerShown: false }} />
            <Tabs.Screen name="MyTeamsScreen" options={{ title: 'My Teams', headerShown: false }} />
            <Tabs.Screen name="fields" options={{ title: 'Fields', headerShown: false }} />
            <Tabs.Screen name="upload-game" options={{ title: 'Upload Game', headerShown: false }} />
            <Tabs.Screen name="profile" options={{ title: 'Profile', headerShown: false }} />

            {/* Settings Screens */}
            <Tabs.Screen name="notifications" options={{ title: 'Notifications', headerShown: false }} />
            <Tabs.Screen name="settings" options={{ title: 'Settings', headerShown: false }} />

            {/* Other Screens */}
            <Tabs.Screen name="edit" options={{ title: 'Edit', headerShown: false }} />
            <Tabs.Screen name="preferences" options={{ title: 'Preferences', headerShown: false }} />
            <Tabs.Screen name="calendar" options={{ title: 'Calendar', headerShown: false }} />
            <Tabs.Screen name="FieldDetailsScreen" options={{ title: 'Field', headerShown: false }} />

            {/* Game Screens */}
            <Tabs.Screen name="search-games" options={{ title: 'Search Games', headerShown: false }} />
            <Tabs.Screen name="create-game" options={{ title: 'Create Game', headerShown: false }} />
            <Tabs.Screen name="GameDetailsScreen" options={{ title: 'Game Details', headerShown: false }} />

            {/* Team Screens */}
            <Tabs.Screen name="create-team" options={{ title: 'Create Team', headerShown: false }} />
            <Tabs.Screen name="TeamDetailsScreen" options={{ title: 'Team Details', headerShown: false }} />
            <Tabs.Screen name="SearchTeamsScreen" options={{ title: 'Search Teams', headerShown: false }} />

        </Tabs>
    );
}

