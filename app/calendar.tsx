import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useRouter } from 'expo-router';
import NavigationBar from "@/components/NavigationBar";
import TopBar from "@/components/TopBar";

type DayProps = {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
};

const events = {
    '2024-08-15': ['Meeting with team at 10 AM', 'Lunch with Sarah at 1 PM'],
    '2024-08-20': ['Project deadline', 'Call with client at 3 PM'],
    // Add more dates and events as needed
};

export default function CalendarScreen() {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
    const router = useRouter();

    const onDayPress = (day: DayProps) => {
        const dateString = day.dateString;
        setSelectedDate(dateString);
        setSelectedEvents(events[dateString] || []);
    };

    const handleAddEventPress = () => {
        router.push('/add-event'); // Update to your actual route for adding events
    };

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <TopBar level={5} progress={0.5} games={10}/>

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
                    monthTextColor: '#333',
                    textSectionTitleColor: '#333',
                }}
            />

            {selectedDate && (
                <View style={styles.selectedDateContainer}>
                    <Text style={styles.selectedDateText}>Selected Date: {selectedDate}</Text>
                    {selectedEvents.length > 0 ? (
                        <View style={styles.eventsContainer}>
                            {selectedEvents.map((event, index) => (
                                <Text key={index} style={styles.eventText}>- {event}</Text>
                            ))}
                        </View>
                    ) : (
                        <Text style={styles.noEventsText}>No events for this date.</Text>
                    )}
                    <Button
                        title="Add Event"
                        onPress={handleAddEventPress}
                        color="#007BFF"
                    />
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
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#333',
        fontWeight: 'bold',
    },
    selectedDateContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    selectedDateText: {
        fontSize: 18,
        color: '#007BFF',
        fontWeight: '600',
    },
    eventsContainer: {
        marginTop: 10,
    },
    eventText: {
        fontSize: 16,
        color: '#333',
    },
    noEventsText: {
        fontSize: 16,
        color: '#999',
    },
});
