import React, { useState, useEffect, useRef } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Client } from '@stomp/stompjs';
import { TabProps, NavigationProp, RootStackParamList } from '../types';

interface ChatMessage {
  type?: 'message';
  messageId: number;
  senderId: number;
  senderNickname: string;
  detailMessage: string;
  sendTime: string;
  isMyMessage: boolean;
}

interface DateLabel {
  type: 'date';
  id: string;
  date: string;
}

type ChatItem = ChatMessage | DateLabel;

const ChatPage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'ChatPage'>>();
  const { chattingRoomId, chatTitle } = route.params;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const socketRef = useRef<Client | null>(null);
  const userIdRef = useRef<number | null>(null);
  const flatListRef = useRef<FlatList>(null);


  useEffect(() => {
    AsyncStorage.getItem('userId').then((id) => {
      if (id) userIdRef.current = parseInt(id);
    });
  }, []);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(
          `http://13.124.71.212:8080/api/chatrooms/${chattingRoomId}/messages?page=0&size=30`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const messageList = response.data.data.data
          .sort((a: any, b: any) => new Date(a.sendTime).getTime() - new Date(b.sendTime).getTime()) // 🔁
          .map((msg: any) => ({
            messageId: msg.messageId,
            senderId: msg.senderId,
            senderNickname: msg.senderNickname,
            detailMessage: msg.detailMessage,
            sendTime: msg.sendTime,
            isMyMessage: msg.senderId === userIdRef.current,
          }));

        setMessages(messageList);
      } catch (error) {
        console.error('❌ 메시지 불러오기 실패:', error);
      }
    };

    fetchMessages();
  }, [chattingRoomId]);



  const handleSend = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token || !socketRef.current?.connected) return;

    const message = {
      token,
      chattingRoomId,
      detailMessage: inputText,
    };

    socketRef.current.publish({
      destination: '/app/chat/send',
      body: JSON.stringify(message),
    });
    setInputText('');
  };

  const formatTime = (isoString: string): string => {
    const date = new Date(isoString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? '오후' : '오전';
    const hour12 = hours % 12 || 12;
    return `${ampm} ${hour12}:${minutes.toString().padStart(2, '0')}`;
  };

  const formatDateLabel = (isoString: string): string => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
    return `${year}년 ${month}월 ${day}일 ${weekday}요일`;
  };

  const processedMessages: ChatItem[] = [];
  let lastDate = '';
  messages.forEach((msg) => {
    const dateOnly = msg.sendTime.split('T')[0];
    if (dateOnly !== lastDate) {
      processedMessages.push({
        type: 'date',
        id: `date-${dateOnly}`,
        date: formatDateLabel(msg.sendTime),
      });
      lastDate = dateOnly;
    }
    processedMessages.push({ ...msg, type: 'message' });
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon1 name='arrow-back' size={25} color="#233b6d" />
        </TouchableOpacity>
        <Text style={styles.nickname}>{chatTitle}</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        ref={flatListRef}
        data={processedMessages}
        keyExtractor={(item) => item.type === 'date' ? item.id : item.messageId.toString()}
        renderItem={({ item }) => {
          if (item.type === 'date') {
            return (
              <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{item.date}</Text>
              </View>
            );
          }
          return (
            <View style={[
              styles.messageContainer,
              item.isMyMessage ? styles.myContainer : styles.otherContainer
            ]}>
              {!item.isMyMessage && (
                <Text style={styles.nicknameText}>{item.senderNickname}</Text>
              )}
              <View style={[
                styles.messageBubble,
                item.isMyMessage ? styles.myMessage : styles.otherMessage
              ]}>
                <Text>{item.detailMessage}</Text>
              </View>
              <Text style={[
                styles.timeText,
                item.isMyMessage ? styles.timeLeft : styles.timeRight
              ]}>
                {formatTime(item.sendTime)}
              </Text>
            </View>
          );
        }}
        contentContainerStyle={styles.messageList}
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <Icon2 name="image-plus" size={25} color="#233b6d" />
        </TouchableOpacity>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="메시지 입력"
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSend}>
          <Icon1 name="send" size={25} color="#233b6d" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  messageList: { padding: 15 },
  headerContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc',
  },
  backButton: { width: 50, alignItems: 'flex-start' },
  nickname: { 
    flex: 1, 
    textAlign: 'center', 
    fontSize: 18, 
    fontWeight: 'bold' },
  placeholder: { width: 50 },

  messageContainer: { marginBottom: 12, maxWidth: '80%' },
  myContainer: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  otherContainer: { alignSelf: 'flex-start', alignItems: 'flex-start' },

  nicknameText: { 
    fontSize: 12, 
    color: '#555', 
    marginBottom: 3, 
    marginLeft: 5 
  },
  messageBubble: { padding: 10, borderRadius: 15 },
  myMessage: { backgroundColor: '#C6E4FF', borderTopRightRadius: 0 },
  otherMessage: { backgroundColor: '#FFF5C4', borderTopLeftRadius: 0 },

  timeText: { fontSize: 11, color: '#888', marginTop: 3 },
  timeLeft: { alignSelf: 'flex-start' },
  timeRight: { alignSelf: 'flex-end' },

  dateContainer: {
    alignSelf: 'center', 
    backgroundColor: '#e0e0e0', 
    borderRadius: 20,
    paddingVertical: 4, 
    paddingHorizontal: 12, 
    marginVertical: 10,
  },
  dateText: { fontSize: 13, color: '#333' },

  inputContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 10, 
    backgroundColor: '#fff', 
    borderTopWidth: 1, 
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
     padding: 10, 
     backgroundColor: '#C6E4FF',
    borderRadius: 20, 
    marginHorizontal: 10,
  },
});

export default ChatPage;
