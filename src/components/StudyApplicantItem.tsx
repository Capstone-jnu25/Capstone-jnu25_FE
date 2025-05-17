import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface ApplicantItemProps {
    nickname: string;
    message: string;
    onAccept: () => void;
    onDelete: () => void;
}

const StudyApplicantItem: React.FC<ApplicantItemProps> = ({ nickname, message, onAccept, onDelete }) => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/profile.png')} style={styles.profileImage} />
            <View style={styles.infoContainer}>
                <Text style={styles.nickname}>{nickname}</Text>
                <Text style={styles.message}>{message}</Text>

                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                    <Text style={styles.buttonText}>삭제</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.acceptButton} onPress={onAccept}>
                    <Text style={styles.buttonText}>수락</Text>
                </TouchableOpacity>
            </View>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 15,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginHorizontal: 10,
    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 30,
        marginRight: 5,
        borderWidth: 2,
        borderColor: '#95CEFF'
    },
    infoContainer: {
        flex: 1,
    },
    nickname: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    message: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 5,
        alignSelf: 'flex-end',
    },
    deleteButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginRight: 10,
    },
    acceptButton: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    buttonText: {
        fontSize: 14,
        color: '#555',
    },
});

export default StudyApplicantItem;
