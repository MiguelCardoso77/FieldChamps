import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useRouter} from 'expo-router';
import NavigationBar from "@/app/NavigationBar";

type DayProps = {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
};

export default function CalendarScreen() {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const router = useRouter();

    const onDayPress = (day: DayProps) => {
        setSelectedDate(day.dateString);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select a Date</Text>
            <Calendar
                onDayPress={onDayPress}
                markedDates={{
                    [selectedDate || '']: {
                        selected: true,
                        marked: true,
                        selectedColor: '#007BFF',
                    },
                }}
                theme={{
                    selectedDayBackgroundColor: '#007BFF',
                    todayTextColor: '#00adf5',
                    arrowColor: '#007BFF',
                }}
            />
            {selectedDate && (
                <View style={styles.selectedDateContainer}>
                    <Text style={styles.selectedDateText}>Selected Date: {selectedDate}</Text>
                </View>
            )}

            {/* Barra de Navegação */}
            <NavigationBar selected="calendar" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: 20,
    },
    contentContainer: {
        flexGrow: 1,
        paddingBottom: 60,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#333',
    },
    selectedDateContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    selectedDateText: {
        color: '#FFF',
        fontSize: 16,
    },
});
