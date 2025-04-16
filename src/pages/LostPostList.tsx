import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { TabProps } from "../types";
import MenuBar from '../components/MenuBar';

const posts = [
    { id: '1', title: '아디다스 바람막이', content: '상세내용상세내용상세내용' },
    { id: '2', title: '아디다스 바람막이', content: '상세내용상세내용상세내용' },
    { id: '3', title: '아디다스 바람막이', content: '상세내용상세내용상세내용' },
    { id: '4', title: '아디다스 바람막이', content: '상세내용상세내용상세내용' },
    { id: '5', title: '아디다스 바람막이', content: '상세내용상세내용상세내용' },
  ];

const LostPostList:React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
     // FlatList로 게시글 리스트 렌더링
  const renderItem = ({ item }: { item: { id: string; title: string; content: string } }) => (
    <TouchableOpacity style={styles.postItem} onPress={() =>{}}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <MenuBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#f5f5f5',
    },
    postItem: {
      backgroundColor: '#fff',
      marginBottom: 10,
      padding: 15,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },
    postTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    postContent: {
      fontSize: 14,
      color: '#777',
    },
  });

export default LostPostList;