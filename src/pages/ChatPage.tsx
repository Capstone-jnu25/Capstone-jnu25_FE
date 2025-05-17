import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TabProps, NavigationProp } from "../types";
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'

const ChatPage:React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation<NavigationProp>();
    
    const [messages, setMessages] = useState([
        { id: 1, text: '안녕하세요!', isMyMessage: false },
        { id: 2, text: '네, 반갑습니다!', isMyMessage: true },
        { id: 3, text: '어디서 만날까요?', isMyMessage: false },
    ]);
    const [inputText, setInputText] = useState('');

    const handleSend = () => {
        if (inputText.trim() !== '') {
            setMessages([...messages, { id: messages.length + 1, text: inputText, isMyMessage: true }]);
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
