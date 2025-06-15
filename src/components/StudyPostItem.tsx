import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface StudyPostItemProps {
    title: string;
    dDay: string;
    members: string;
    details: string;
    date: string;
    location: string;
    onPress: () => void;
}

const StudyPostItem: React.FC<StudyPostItemProps> = ({ title, dDay, members, details, date, location, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.header}>
                <Text style={styles.dday}>{dDay}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <Text style={styles.details}>{date}</Text>
                <Text style={styles.details}>{location}</Text>
                <Text style={styles.details} numberOfLines={2}>{details}</Text>
                
                <Text style={styles.members}>{members}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 15,
        margin: 10,
        width: 170,
        height: 180,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    header: {
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    dday: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    details: {
        fontSize: 12,
        color: '#777',
        marginBottom: 5,
    },
    members: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'right',
    },
});

export default StudyPostItem;
