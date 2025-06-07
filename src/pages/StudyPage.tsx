import React, { useState, useEffect } from "react";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { TabProps, NavigationProp, StudyPost } from "../types";
import MenuBar from '../components/MenuBar';
import Icon from 'react-native-vector-icons/Ionicons';
import CircleButton from "../components/CircleButton";
import StudyPostItem from "../components/StudyPostItem";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const StudyPage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation<NavigationProp>();
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [posts, setPosts] = useState<StudyPost[]>([]);
    const isFocused = useIsFocused();

    useEffect(() => {
    const fetchStudyPosts = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(`http://13.124.71.212:8080/api/gathering?boardType=STUDY&page=0&size=10`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data.data;
        const mapped = data.map((item: any) => ({
          postId: item.postId,
          title: item.title,
          contents: item.contents,
          place: item.place,
          time: item.time,
          maxParticipants: item.maxParticipants,
          currentParticipants: item.currentParticipants,
          dday: item.dday,
        }));

        setPosts(mapped);
        console.log("✅ 스터디 posts:", mapped);
      } catch (error) {
        console.error("❌ 스터디 게시글 불러오기 실패:", error);
      }
    };

    if (isFocused) {
      fetchStudyPosts();
    }
  }, [isFocused]);

  const filteredPosts = posts.filter((post) => {
    const title = typeof post.title === 'string' ? post.title : '';
    const contents = typeof post.contents === 'string' ? post.contents : '';
    return (
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contents.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

    return (
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>스터디 게시판</Text>
                    <Icon name="search" size={25} color="#233b6d" onPress={() => setIsSearching(!isSearching)} />
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
                    <CircleButton iconName="pencil" onPress={() => { navigation.navigate('StudyPostAdd') }} />
                </View>

               <FlatList
                    data={filteredPosts}
                    keyExtractor={(item) => item.postId.toString()}
                    renderItem={({ item }) => (
                        <StudyPostItem
                        title={item.title}
                        dDay={item.dday}
                        members={`${item.currentParticipants}/${item.maxParticipants}`}
                        details={item.contents}
                        date={`시간: ${item.time}`}
                        location={`장소: ${item.place}`}
                        onPress={() => {
                            navigation.navigate('StudyPostDetail', { postId: item.postId });
                        }}
                        />
                    )}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                    />
            </View>
            <MenuBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
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
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 1,
    },
    listContainer: {
        alignItems: 'center',
    },
    searchInput: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 30,
      marginBottom: 10,
      marginTop: 10,
    },
})

export default StudyPage;