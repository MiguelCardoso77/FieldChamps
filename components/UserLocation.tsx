import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

export function useUserLocation() {
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                // Request permission to access location
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission Denied', 'Permission to access location was denied');
                    return;
                }

                // Get the user's current location
                let location = await Location.getCurrentPositionAsync({});
                setUserLocation(location.coords);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return { userLocation };
}
