import React, { useState, useEffect, useRef } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { TabProps, NavigationProp, RootStackParamList } from "../types";
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ChatMessage {
  id: number;
  text: string;
  isMyMessage: boolean;
}

const ChatPage:React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'ChatPage'>>();
  const { chattingRoomId, chatTitle } = route.params;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const stompClientRef = useRef<Client | null>(null);
  const userIdRef = useRef<string>('');

   useEffect(() => {
    AsyncStorage.getItem('userId').then((id) => {
      if (id) userIdRef.current = id;
    });
  }, []);

   useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(
          `http://13.124.71.212:8080/api/chatrooms/${chattingRoomId}/messages?page=0&size=30`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const messageList = response.data.data.data.map((msg: any) => ({
          id: msg.messageId,
          text: msg.detailMessage,
          isMyMessage: msg.senderId === parseInt(userIdRef.current)
        }));

        setMessages(messageList);
      } catch (error) {
        console.error('❌ 메시지 불러오기 실패:', error);
      }
    };

    fetchMessages();
  }, [chattingRoomId]);


  useEffect(() => {
    const socket = new SockJS("http://13.124.71.212:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      client.subscribe(`/topic/chatroom/${chattingRoomId}`, (message) => {
        const msg = JSON.parse(message.body);
        setMessages(prev => [...prev, {
          id: msg.messageId,
          text: msg.detailMessage,
          isMyMessage: msg.senderId === parseInt(userIdRef.current),
        }]);
      });
    };

    client.activate();
    stompClientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [chattingRoomId]);

  const handleSend = async () => {
    const token = await AsyncStorage.getItem("token");
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.publish({
        destination: "/app/chat/send",
        body: JSON.stringify({
          token,
          chattingRoomId,
          detailMessage: inputText
        })
      });
      setInputText('');
    }
  };

    return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={() => {navigation.goBack()}}> 
                        <Icon1 name='arrow-back' size={25} color="#233b6d" />
                    </TouchableOpacity>
                    <Text style={styles.nickname}>닉네임 1</Text>
                    <View style={styles.placeholder} />
                </View>
                <FlatList
                    data={messages}
                    renderItem={({ item }) => (
                        <View style={[styles.messageBubble, item.isMyMessage ? styles.myMessage : styles.otherMessage]}>
                            <Text>{item.text}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.messageList}
                />
                <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={() => {}}>
                        <Icon2 name="image-plus" size={25} color="#233b6d"/> 
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
    container: {
        flex:1,
        backgroundColor:'#fff'
    },
    header: {
        padding: 15,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    messageList: {
        padding: 15,
    },
    messageBubble: {
        maxWidth: '70%',
        padding: 10,
        borderRadius: 15,
        marginBottom: 10,
    },
    myMessage: {
        backgroundColor: '#C6E4FF',
        alignSelf: 'flex-end',
    },
    otherMessage: {
        backgroundColor: '#FFF5C4',
        alignSelf: 'flex-start',
    },
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
        marginRight: 10,
        marginLeft: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    backButton: {
        width: 50,
        alignItems: 'flex-start',
    },
    nickname: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    placeholder: {
        width: 50,
    },
});

export default ChatPage;
