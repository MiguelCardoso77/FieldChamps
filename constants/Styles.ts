import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

const currentTheme = 'darkBlue';

export const Styles = StyleSheet.create({
    buttonContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    buttonBackground: {
        backgroundColor: Colors[currentTheme].buttons,
    },
    buttonText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors[currentTheme].buttons,
        textAlign: 'center',
        justifyContent: 'center',
    },

    title: {
        color: '#ffffff',
        fontSize: 22,
        textAlign: 'center',
        flex: 1,
        fontFamily: 'Ahronbd',
    },

    pageContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors[currentTheme].background,
        marginTop: 0,
        marginBottom: 80,
        padding: 20,
    },
});