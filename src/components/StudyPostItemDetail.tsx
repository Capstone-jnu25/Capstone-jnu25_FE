import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton';

interface StudyPostDetailItemProps {
    id: number;
    nickname: string,
    title: string;
    dday: string;
    time: string;
    place: string;
    contents: string;
    gender: string;
    onSubmit: () => void;
    application_text: string;
    setApplication_text: (text: string) => void;
    onProfilePress: () => void;
}


const StudyPostDetailItem: React.FC<StudyPostDetailItemProps> = ({ id, nickname, title, dday, time, place, contents, gender, onSubmit, application_text, setApplication_text, onProfilePress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.postHeader}>
            <Image 
                source={require('../assets/profile.png')} // 고정된 프로필 이미지
                style={styles.profileImage} 
            />
            <TouchableOpacity onPress={onProfilePress}>
                <Text style={styles.postTitle}>{nickname}</Text>
            </TouchableOpacity>
            </View>
            {/* 헤더 */}
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.dDay}>{dday}</Text>
            </View>

            {/* 시간 및 장소 */}
            <View style={styles.info}>
                <Text style={styles.infoText}>시간 : {time}</Text>
                <Text style={styles.infoText}>장소 : {place}</Text>
                <Text style={styles.infoText}>성별 : {gender}</Text>
            </View>

            {/* 설명 */}
            <Text style={styles.description}>
                {contents}
            </Text>

            {/* 입력란 */}
            <TextInput 
                multiline 
                style={styles.textArea} 
                value={application_text}
                onChangeText={setApplication_text}
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
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 30,
        marginRight: 5,
        borderWidth: 2,
        borderColor: '#95CEFF'
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
