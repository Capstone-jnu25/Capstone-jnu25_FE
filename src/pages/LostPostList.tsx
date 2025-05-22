import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { TabProps, NavigationProp } from "../types";
import MenuBar from '../components/MenuBar';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import CircleButton from "../components/CircleButton";
import LostPostItem from '../components/LostPostItem';

const posts = [
    { id: '1', title: 'adidas', content: '상세내용상세내용상세내용', location: '광주 북구 용봉로 77 전남대학교 백도 앞', image: require('../assets/images.png'), time: '2분 전' },
    { id: '2', title: '아디다스 바람막이', content: '상세내용상세내용상세내용', location: '광주 북구 용봉로 77 전남대학교 백도 앞', image: require('../assets/images.png'), time: '2분 전' },
    { id: '3', title: '아디다스 바람막이', content: '상세내용상세내용상세내용', location: '광주 북구 용봉로 77 전남대학교 백도 앞', image: require('../assets/images.png'), time: '2분 전' },
    { id: '4', title: '아디다스 바람막이', content: '상세내용상세내용상세내용', location: '광주 북구 용봉로 77 전남대학교 백도 앞', image: require('../assets/images.png'), time: '2분 전' },
    { id: '5', title: '아디다스 바람막이', content: '상세내용상세내용상세내용', location: '광주 북구 용봉로 77 전남대학교 백도 앞', image: require('../assets/images.png'), time: '2분 전' },
    { id: '6', title: '아디다스 바람막이', content: '상세내용상세내용상세내용', location: '광주 북구 용봉로 77 전남대학교 백도 앞', image: require('../assets/images.png'), time: '2분 전' },
  ];

const LostPostList:React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
  const navigation = useNavigation<NavigationProp>();

  const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost');
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>분실/습득 게시판</Text>
          <View style={styles.searchContainer}>
            <Icon1 name="search" size={25} color="#233b6d" onPress={() => setIsSearching(!isSearching)}/>
            <Icon2 name="image-plus" size={25} color="#233b6d" onPress={() =>{}}/>  
          </View>
        </View>
        {isSearching && (
          <TextInput
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        )}

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
            <CircleButton iconName="pencil" onPress={() => {navigation.navigate('LostPostAdd')}} />
          </View>
           <FlatList
              data={searchQuery.length > 0 ? filteredPosts : posts}
              renderItem={({ item }) => <LostPostItem post={item} />}
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
    },
    searchInput: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 30,
      marginTop: 10,
      marginBottom: 10,
    },
  });

export default LostPostList;