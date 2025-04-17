import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TabProps } from "../types";
import MenuBar from '../components/MenuBar';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import CircleButton from "../components/CircleButton";

const posts = [
    { id: '1', title: '아디다스 바람막이', content: '상세내용상세내용상세내용', location: '광주 북구 용봉로 77 전남대학교 백도 앞', image: require('../assets/images.png'), time: '2분 전' },
    { id: '2', title: '아디다스 바람막이', content: '상세내용상세내용상세내용', location: '광주 북구 용봉로 77 전남대학교 백도 앞', image: require('../assets/images.png'), time: '2분 전' },
    { id: '3', title: '아디다스 바람막이', content: '상세내용상세내용상세내용', location: '광주 북구 용봉로 77 전남대학교 백도 앞', image: require('../assets/images.png'), time: '2분 전' },
    { id: '4', title: '아디다스 바람막이', content: '상세내용상세내용상세내용', location: '광주 북구 용봉로 77 전남대학교 백도 앞', image: require('../assets/images.png'), time: '2분 전' },
    { id: '5', title: '아디다스 바람막이', content: '상세내용상세내용상세내용', location: '광주 북구 용봉로 77 전남대학교 백도 앞', image: require('../assets/images.png'), time: '2분 전' },
    { id: '6', title: '아디다스 바람막이', content: '상세내용상세내용상세내용', location: '광주 북구 용봉로 77 전남대학교 백도 앞', image: require('../assets/images.png'), time: '2분 전' },
  ];

const LostPostList:React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
  const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost');
     // FlatList로 게시글 리스트 렌더링
  const renderItem = ({ item }: { item: { id: string; title: string; content: string, location: string, image: any, time: string } }) => (
    <TouchableOpacity style={styles.postItem} onPress={() => {}}>
      <View style={styles.postHeader}>
        <View style={styles.textContainer}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text style={styles.postContent}>{item.content}</Text>
        </View>
        <Image source={item.image} style={styles.postImage} />
      </View>
      
      <View style={styles.postFooter}>
        <View style={styles.locationContainer}>
          <Icon1 name="location-sharp" size={16} color="#777" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        <Text style={styles.timeAgo}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>분실/습득 게시판</Text>
          <View style={styles.searchContainer}>
            <Icon1 name="search" size={25} onPress={() =>{}}/>
            <Icon2 name="image-plus" size={25} onPress={() =>{}}/>  
          </View>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setActiveTab('lost')}>
            <Text style={[styles.tabText, activeTab === 'lost' ? styles.activeText : styles.inActiveText]}>분실</Text>
          </TouchableOpacity>
          
          <Text style={styles.separator}>|</Text>
          
          <TouchableOpacity onPress={() => setActiveTab('found')}>
            <Text style={[styles.tabText, activeTab === 'found' ? styles.activeText : styles.inActiveText]}>습득</Text>
          </TouchableOpacity>
        </View>
        
          <View style={styles.buttonContainer}>
            <CircleButton iconName="pencil" onPress={() => {}} />
          </View>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
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
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      marginTop : 16,
    },
    headerText: {
      flex: 1,
      fontSize: 20,
      fontWeight : 'bold',
    },
    searchContainer: {
      flexDirection: 'row',
      gap: 10,
      marginLeft: 'auto', // 오른쪽으로 밀기
    },
    menuBarContainer: {
      marginTop:'auto',
    },
    postItem: {
      backgroundColor: '#fff',
      marginBottom: 10,
      padding: 15,
      borderRadius: 12,
      elevation: 3,
    },
    postHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    textContainer: {
      flex: 1,
      paddingRight: 10,
    },
    postTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    postContent: {
      fontSize: 14,
      color: '#777',
    },
    postImage: {
      width: 100,
      height: 100,
      borderRadius: 8,
    },
    postFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    locationText: {
      marginLeft: 5,
      fontSize: 14,
      color: '#777',
    },
    timeAgo: {
      fontSize: 12,
      color: '#aaa',
    },
    tabContainer: {
      flexDirection: 'row',
      marginBottom: 10,
      gap: 5,
    },
    separator: {
      alignSelf: 'center',
      color: '#aaa',
      fontSize: 15,
    },
    tabText: {
      fontSize: 15,
      color: '#aaa',
    },
    activeText: {
      color: '#2D4183',
    },
    inActiveText: {
      color: '#aaa',
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      zIndex: 1,
    }
  });

export default LostPostList;