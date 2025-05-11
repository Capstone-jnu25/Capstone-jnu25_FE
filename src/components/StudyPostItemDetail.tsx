import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import CustomButton from './CustomButton';

interface StudyPostDetailItemProps {
    title: string;
    dDay: string;
    time: string;
    location: string;
    description: string;
    onSubmit: () => void;
}

const StudyPostDetailItem: React.FC<StudyPostDetailItemProps> = ({ title, dDay, time, location, description, onSubmit }) => {
    return (
        <View style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.dDay}>{dDay}</Text>
            </View>

            {/* 시간 및 장소 */}
            <View style={styles.info}>
                <Text style={styles.infoText}>시간 : {time}</Text>
                <Text style={styles.infoText}>장소 : {location}</Text>
            </View>

            {/* 설명 */}
            <Text style={styles.description}>
                {description}
            </Text>

            {/* 입력란 */}
            <TextInput 
                multiline 
                style={styles.textArea} 
            />

            {/* 제출 버튼 */}
            <CustomButton title="제출" style={styles.button} onPress={onSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    dDay: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        textAlign: 'right',
    },
    info: {
        marginBottom: 15,
    },
    infoText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15,
    },
    textArea: {
        width: '100%',
        height: 150,
        backgroundColor: '#FFFCF5',
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
        textAlignVertical: 'top',
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    button: {
        width: 80,
        backgroundColor: '#233b6d',
        borderRadius: 20,
        alignSelf: 'flex-end',
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 15,
    },
});

export default StudyPostDetailItem;
