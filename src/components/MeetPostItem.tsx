import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface MeetPostItemProps {
    title: string;
    dDay: string;
    members: string;
    details: string;
    date: string;
    location: string;
    gender: string;
    isApplied: boolean;
    isFull: boolean;
    onApply: () => void;
}

const MeetPostItem: React.FC<MeetPostItemProps> = ({ title, dDay, members, details, date, location, gender, isApplied, isFull, onApply }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.dday}>{dDay}</Text>
                <Text style={styles.members}>{members}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <Text style={styles.details}>{date}</Text>
                <Text style={styles.details}>{location}</Text>
                <Text style={styles.details}>{gender}</Text>
                <Text style={styles.details} numberOfLines={3}>{details}</Text>     
                
            </View>
            <View style={styles.buttonContainer}>
               {isFull ? (
                    <View style={[styles.buttonBase, styles.disabledButton]}>
                            <Text style={styles.buttonText}>마감</Text>
                        </View>
               ) : isApplied ? (
                    <View style={[styles.buttonBase, styles.disabledButton]}>
                        <Text style={styles.buttonText}>완료</Text>
                    </View>
                    ) : (
                    <TouchableOpacity style={[styles.buttonBase, styles.activeButton]} onPress={onApply}>
                        <Text style={styles.buttonText}>신청</Text>
                    </TouchableOpacity>
                    )}
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 15,
        margin: 10,
        flexShrink: 1,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    location: {
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end', // 오른쪽 정렬
        marginTop: 10,
    },
    buttonBase: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
    },
    activeButton: {
        backgroundColor: '#233b6d',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MeetPostItem;
