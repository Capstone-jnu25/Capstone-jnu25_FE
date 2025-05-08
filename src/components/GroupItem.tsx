import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Category from './Category';

interface GroupItemProps {
    title: string;
    date?: string;
    category: string;
    onPress: () => void;
}

const GroupItem: React.FC<GroupItemProps> = ({ title, date, category, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                {date && <Text style={styles.date}>{date}</Text>}
            </View>
            <Category label={category} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height:100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 15,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    date: {
        fontSize: 12,
        color: '#777',
    },
});

export default GroupItem;
