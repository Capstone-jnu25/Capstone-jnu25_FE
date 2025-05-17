import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface ChatListItemProps {
    profileImage: any;
    nickname: string;
    lastMessage: string;
    onItemPress: () => void;
    onNicknamePress: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ profileImage, nickname, lastMessage, onItemPress, onNicknamePress }) => {
    return (
        <View>
        <TouchableOpacity style={styles.container} onPress={onItemPress}>
            <Image source={profileImage} style={styles.profileImage} />
            <View style={styles.textContainer}>
                <TouchableOpacity onPress={onNicknamePress}>
                    <Text style={styles.nickname}>{nickname}</Text>
                </TouchableOpacity>
                <Text style={styles.message} numberOfLines={1}>{lastMessage}</Text>
            </View>
            
        </TouchableOpacity>
            <View style={styles.separator} />
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 15,
        margin:4,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
        borderWidth:2,
        borderColor: '#95CEFF',
        backgroundColor:'#fff'        
    },
    textContainer: {
        flex: 1,
    },
    nickname: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    message: {
        color: '#555',
        fontSize: 14,
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 8,
      },
});

export default ChatListItem;
