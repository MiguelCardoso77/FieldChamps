import {StyleSheet} from "react-native";
import { Colors } from "@/constants/Colors";

export const Styles = StyleSheet.create({
    buttonContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    buttonBackground: {
        backgroundColor: Colors.darkBlue.buttons,
    },
    buttonText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.darkBlue.text,
        textAlign: 'center',
        justifyContent: 'center',
    },
    pageContainer: {
        flex: 1,
        backgroundColor: Colors.darkBlue.background,
        marginTop: 0,
        marginBottom: 80,
        padding: 20,
    },
});