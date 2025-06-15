import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { TabProps, NavigationProp, RootStackParamList } from "../types";
import { View, FlatList, StyleSheet, TouchableOpacity,Text } from 'react-native';
import ChatListItem from '../components/ChatListItem';
import MenuBar from "../components/MenuBar";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

type ChatRoom = {
  chattingRoomId: number;
  chatTitle: string;
  lastMessage: string;
  boardType: string;
};

const ChatList: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [chatList, setChatList] = useState<ChatRoom[]>([]);

 

// useEffect 대신 아래 코드 추가
useFocusEffect(
  useCallback(() => {
    const fetchChatRooms = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("http://13.124.71.212:8080/api/chatrooms", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.status === "success") {
          setChatList(response.data.data);
        }
      } catch (error) {
        console.error("❌ 채팅방 목록 불러오기 실패:", error);
      }
    };

    fetchChatRooms();
  }, [])
);


  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => {navigation.goBack()}}>
                <Icon name='arrow-back' size={25}  color="#233b6d" />
            </TouchableOpacity>
            <Text style={styles.textTitle}>채팅</Text>
            <Text/>
            </View>

        <View style={styles.itemContainer}>
          <FlatList
            data={chatList}
            renderItem={({ item }) => (
              <ChatListItem
                boardType={item.boardType}
                title={item.chatTitle}
                lastMessage={item.lastMessage}
                onItemPress={() =>
                  navigation.navigate('ChatPage', {
                    chattingRoomId: item.chattingRoomId,
                    chatTitle: item.chatTitle,
                  })
                }
              />
            )}
            keyExtractor={(item) => item.chattingRoomId.toString()}
          />
        </View>
      </View>

      <View style={styles.menuBarContainer}>
        <MenuBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#C6E4FF',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom:10,
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
  itemContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  menuBarContainer: {
    marginTop: 'auto',
  },
  titleText: {
    fontSize: 20,
    marginLeft: 8,
  },
});

export default ChatList;
