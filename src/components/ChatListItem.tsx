import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface ChatListItemProps {
    boardType: string;
    title: string;
    lastMessage: string;
    onItemPress: () => void;
}

const getBoardImage = (boardType: string) => {
  switch (boardType) {
    case 'STUDY':
      return require('../assets/Study.png');
    case 'MEETUP':
      return require('../assets/Meetup.png');
    case 'LOST':
      return require('../assets/Lost.png');
    case 'SECONDHAND':
      return require('../assets/Secondhand.png');
    default:
      return require('../assets/profile.png'); // 예외 처리
  }
};

const ChatListItem: React.FC<ChatListItemProps> = ({ boardType, title, lastMessage, onItemPress }) => {
    const boardImage = getBoardImage(boardType);

    return (
        <View>
        <TouchableOpacity style={styles.container} onPress={onItemPress}>
           <Image source={boardImage} style={styles.profileImage} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
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
    title: {
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
