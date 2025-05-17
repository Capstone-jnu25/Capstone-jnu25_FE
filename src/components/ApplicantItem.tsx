import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface ApplicantItemProps {
    nickname: string;
    message?: string;
    onAccept: () => void;
    onDelete: () => void;
}

const ApplicantItem: React.FC<ApplicantItemProps> = ({ nickname, message, onAccept, onDelete }) => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/profile.png')} style={styles.profileImage} />
            <View style={styles.infoContainer}>
                <View style={styles.textContainer}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#FEFEFE',
        padding: 20,
        marginBottom: 15,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
        marginHorizontal: 10,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
        borderWidth: 2,
        borderColor: '#95CEFF',
    },
    infoContainer: {
    flex: 1,
    flexDirection: 'column', // 세로 방향으로 수정
    justifyContent: 'space-between',
},
    textContainer: {
        flexShrink: 1,
    },
    nickname: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#233b6d',
        marginBottom: 3,
    },
    message: {
        fontSize: 14,
        color: '#777',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
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

export default ApplicantItem;
