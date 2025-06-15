import React, { useState, useEffect } from "react";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { TabProps, NavigationProp, TradePost } from "../types";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuBar from '../components/MenuBar';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import CircleButton from "../components/CircleButton";
import TradePostItem from "../components/TradePostItem";
import * as ImagePicker from "react-native-image-picker";

const TradePage:React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
 const navigation = useNavigation<NavigationProp>();

  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<TradePost[]>([]);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const isFocused = useIsFocused(); // 화면 포커스 감지
 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const isSearchingWithQuery = isSearching && searchQuery.trim().length > 0;
        const endpoint = isSearchingWithQuery
          ? `http://13.124.71.212:8080/api/secondhand/search?query=${encodeURIComponent(searchQuery)}`
          : `http://13.124.71.212:8080/api/secondhand`; 

        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data.data;
        const mapped = data.map((item: any) => ({
          id: item.postId,
          title: item.title,      
          content: item.contents,
          image: { uri: item.photo },
          price: item.price,  
          time: item.relativeTime,
        }));
        setPosts(mapped);
        console.log("✅ mapped posts:", mapped);

      } catch (error) {
        console.error("❌ 게시글 불러오기 실패:", error);
      }
    };
    if (isFocused) {
        fetchPosts();
      }
}, [isFocused, isSearching, searchQuery]);

const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibrary({
        mediaType: "photo",
        quality: 0.8
    });

    if (result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri ?? null;
        const asset = result.assets[0];
        const type = asset.type ?? "image/jpeg"; // jpeg, png 등 자동 인식
        const name = asset.fileName ?? "image.jpg";
        setPhotoUri(uri);
     
        // 🔽 이미지로 유사 게시글 검색 요청
        const token = await AsyncStorage.getItem("token");

        const formData = new FormData();
            formData.append("newImage", {
              uri: uri,
              type: type,
              name: name,
            } as any);

        try {
      const response = await fetch(`http://13.124.71.212:8080/api/search/image?boardType=SECONDHAND`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                // Content-Type 생략!
              },
              body: formData,
            });
            const result = await response.json();
            console.log("🎯 이미지 검색 결과:", result);
          } catch (err) {
            console.error("❌ fetch 이미지 검색 실패:", err);
          }
  }
};


  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>중고거래 게시판</Text>
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
        
          <View style={styles.buttonContainer}>
            <CircleButton iconName="pencil" onPress={() => {navigation.navigate('TradePostAdd')}} />
          </View>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <TradePostItem
                post={item}
                onPress={() => navigation.navigate('TradePostDetail', { postId: item.id })}
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


export default TradePage;