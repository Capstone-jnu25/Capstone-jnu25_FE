import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TabProps, NavigationProp } from "../types";
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import ChatListItem from '../components/ChatListItem';
import MenuBar from "../components/MenuBar";
import Icon from "react-native-vector-icons/Ionicons";

const chatList = [
    { id: 1, nickname: '닉네임 1', lastMessage: '4시까지 도로시에서 만나서 드릴게요', profileImage: require('../assets/profile.png') },
    { id: 2, nickname: '닉네임 2', lastMessage: '제거인 것 같아요', profileImage: require('../assets/profile.png') },
];

const ChatList:React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation<NavigationProp>();
    
    return (
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                    <Icon name='arrow-back' size={25} style={{ marginTop: 16, marginBottom: 10 }} color="#233b6d" />
                </TouchableOpacity>
                
                <View style={styles.itemContainer}>
                    <FlatList
                        data={chatList}
                        renderItem={({ item }) => (
                            <ChatListItem
                                profileImage={item.profileImage}
                                nickname={item.nickname}
                                lastMessage={item.lastMessage}
                                onPress={() => {navigation.navigate('ChatPage')}}
                            />
                        )}
                        keyExtractor={(item) => item.id.toString()}
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
      backgroundColor : '#C6E4FF',
    },
    contentContainer: {
        flex:1,
        padding:20,
    },
    itemContainer: {
        flex:1,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding:20,
    },
    menuBarContainer: {
        marginTop:'auto',
    },
    titleText: {
        fontSize: 20,
        marginLeft: 8,
    },
});

export default ChatList;
