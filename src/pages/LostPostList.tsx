import React, { useState, useEffect } from "react";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import { TabProps, NavigationProp, LostPost } from "../types";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuBar from '../components/MenuBar';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import CircleButton from "../components/CircleButton";
import LostPostItem from '../components/LostPostItem';
import * as ImagePicker from "react-native-image-picker";

const LostPostList:React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost');
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<LostPost[]>([]);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const isFocused = useIsFocused(); // 화면 포커스 감지

 useEffect(() => {
  const fetchPosts = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const isLost = activeTab === 'lost';
      const endpoint = isSearching && searchQuery
        ? `http://13.124.71.212:8080/api/lostboards/search?query=${encodeURIComponent(searchQuery)}&isLost=${isLost}`
        : `http://13.124.71.212:8080/api/lostboards?isLost=${isLost}`;

      const response = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data.data;
      const mapped = data.map((item: any) => ({
        id: item.postId,
        type: isLost ? 'lost' : 'found',
        title: item.title ?? '',              // 닉네임만 올 수 있으니 fallback
        nickname: item.nickname ?? '',
        content: item.contents,
        image: { uri: item.photo },
        location: item.place,
        time: item.relativeTime,
      })).sort((a: LostPost, b:LostPost) => b.id - a.id);
      setPosts(mapped);
      console.log("✅ mapped posts:", mapped);

    } catch (error) {
      console.error("❌ 게시글 불러오기 실패:", error);
    }
  };

  if (isFocused) {
    fetchPosts();
  }
}, [activeTab, isFocused, searchQuery, isSearching]);

   const handleImagePick = async () => {
  const result = await ImagePicker.launchImageLibrary({
    mediaType: "photo",
    quality: 0.8,
  });

  if (result.assets && result.assets.length > 0) {
    const uri = result.assets[0].uri ?? null;
    const asset = result.assets[0];
    const type = asset.type ?? "image/jpeg";
    const name = asset.fileName ?? "image.jpg";
    setPhotoUri(uri);

    const token = await AsyncStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("newImage", {
      uri,
      type,
      name,
    } as any);

    const isLost = activeTab === "lost";

    // 1. 추천 ID 받기
    const recommendedPostIds = await fetchRecommendedPostIds(formData, token, isLost);

    // 2. 상세 게시글 데이터 받기
    const posts = await fetchPostDetailsByIds(recommendedPostIds, token, isLost);

    // 3. 상태 업데이트
    setPosts(posts);
  }
};

      const fetchRecommendedPostIds = async (formData: FormData, token: string, isLost: boolean): Promise<number[]> => {
      try {
        const response = await fetch(
          `http://13.124.71.212:8080/api/search/image?boardType=LOST&isLost=${!isLost}`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          }
        );
        const result = await response.json();
        if (result.status === "success" && result.recommendedPostIds) {
          return result.recommendedPostIds;
        } else {
          console.warn("추천 ID 없음");
          return [];
        }
      } catch (error) {
        console.error("추천 ID 요청 실패", error);
        return [];
      }
    };

const fetchPostDetailsByIds = async (postIds: number[], token: string, isLost: boolean): Promise<LostPost[]> => {
  if (postIds.length === 0) return [];

  try {
    const response = await axios.post(
      "http://13.124.71.212:8080/api/lostboards/recommend",
      { postIds: postIds }, 
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data.data.map((item: any) => ({
      id: item.postId,
      type: isLost ? "lost" : "found",
      title: item.title ?? "",
      nickname: item.nickname ?? "",
      content: item.contents,
      image: { uri: item.photo },
      location: item.place,
      time: item.relativeTime,
    }));
  } catch (error) {
    console.error("상세 게시글 조회 실패", error);
    return [];
  }
};



  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>분실/습득 게시판</Text>
          <View style={styles.searchContainer}>
            <Icon1 name="search" size={25} color="#233b6d" onPress={() => setIsSearching(!isSearching)}/>
            <Icon2 name="image-search" size={25} color="#233b6d" onPress={handleImagePick}/>  
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
            data={posts}
            renderItem={({ item }) => (
              <LostPostItem
                post={item}
                onPress={() => navigation.navigate('LostPostDetail', { postId: item.id })}
              />
            )}
            keyExtractor={(item) => item.id.toString()} // 숫자도 string으로
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