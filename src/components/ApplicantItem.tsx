import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface ApplicantItemProps {
    nickname: string;
    message?: string;
    accepted: boolean;
    onAccept: () => void;
    onDelete: () => void;
}

const ApplicantItem: React.FC<ApplicantItemProps> = ({ nickname, message, accepted, onAccept, onDelete }) => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/profile.png')} style={styles.profileImage} />
            <View style={styles.infoContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.nickname}>{nickname}</Text>
                    <Text style={styles.message}>{message}</Text>
                    
                    {accepted ? (
                        <Text style={styles.acceptedText}>수락 완료</Text>
                    ) : (
                        <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={onAccept} style={styles.button}>
                            <Text style={styles.buttonText}>수락</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onDelete} style={styles.buttonDelete}>
                            <Text style={styles.buttonText}>삭제</Text>
                        </TouchableOpacity>
                        </View>
                    )}
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
    acceptedText: {
        color: '#A30000',
        fontWeight: 'bold',
        fontSize: 14,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },
    button: {
        backgroundColor: '#233b6d',
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 14,
    },
    buttonDelete: {
        backgroundColor: '#ccc',
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 14,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ApplicantItem;
