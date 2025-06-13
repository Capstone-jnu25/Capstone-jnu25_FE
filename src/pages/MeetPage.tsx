import React, { useState, useEffect } from "react";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { TabProps, NavigationProp, Post } from "../types";
import MenuBar from '../components/MenuBar';
import Icon from 'react-native-vector-icons/Ionicons';
import CircleButton from "../components/CircleButton";
import CustomAlert from "../components/CustomAlert";
import MeetPostItem from "../components/MeetPostItem";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const MeetPage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation<NavigationProp>();

    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [posts, setPosts] = useState<Post[]>([]);
    const isFocused = useIsFocused();

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const showAlert = (title: string, message: string) => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertVisible(true);
    };

    const getGenderLabel = (gender: string): string => {
        switch (gender) {
            case "F":
            return "여성";
            case "M":
            return "남성";
            case "ANY":
            default:
            return "무관";
        }
    };

    useEffect(() => {
    const fetchStudyPosts = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const isSearchingWithQuery = isSearching && searchQuery.trim().length > 0;

        const endpoint = isSearchingWithQuery
        ? `http://13.124.71.212:8080/api/posts/search?keyword=${encodeURIComponent(searchQuery)}&boardType=MEETUP&page=0&size=10`
        : `http://13.124.71.212:8080/api/gathering?boardType=MEETUP&page=0&size=10`

        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data.data;
        const mapped = data.map((item: any) => ({
          authorUserId: item.authorUserId,
          nickname: item.nickname,
          postId: item.postId,
          title: item.title,
          contents: item.contents,
          place: item.place,
          gender: item.gender,
          time: item.time,
          maxParticipants: item.maxParticipants,
          currentParticipants: item.currentParticipants,
          dday: item.dday,
        })).sort((a: Post, b:Post) => b.postId - a.postId);

        setPosts(mapped);
        console.log("✅ 번개 모임 posts:", mapped);
      } catch (error) {
        console.error("❌ 번개 모임 게시글 불러오기 실패:", error);
      }
    };

    if (isFocused) {
      fetchStudyPosts();
    }
}, [isFocused, isSearching, searchQuery]);

    const [appliedPostIds, setAppliedPostIds] = useState<number[]>([]);

    const handleApply = async (postId: number) => {
         const token = await AsyncStorage.getItem("token");
            try {
                await axios.post(`http://13.124.71.212:8080/api/gathering/${postId}/apply`, {}, {
                headers: { Authorization: `Bearer ${token}` },
                });
                setAppliedPostIds(prev => [...prev, postId]);
                showAlert("완료", "신청이 완료되었습니다.");
                // 성공 시 버튼 상태 변경
            } catch (error) {
                console.error("❌ 신청 실패:", error);
                if (axios.isAxiosError(error) && error.response?.status === 400) {
                    showAlert("실패", "이미 신청한 게시글입니다.");
                }
            }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>번개 게시판</Text>
                        <Icon name="search" size={25} color="#233b6d" onPress={() => setIsSearching(!isSearching)}/>
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
                    <CircleButton iconName="pencil" onPress={() => {navigation.navigate('MeetPostAdd')}} />
                </View>
                <FlatList
                    data={posts}
                    renderItem={({ item }) => (
                        <MeetPostItem 
                            authorUserId={item.authorUserId}
                            nickname={item.nickname}
                            title={item.title}
                            dDay={item.dday}
                            members={`${item.currentParticipants}/${item.maxParticipants}`}
                            details={item.contents}
                            date={`시간: ${item.time}`}
                            location={`장소: ${item.place}`}
                            gender={`성별: ${getGenderLabel(item.gender)}`}
                            isApplied={appliedPostIds.includes(item.postId)}
                            isFull={item.currentParticipants >= item.maxParticipants}
                            onApply={() => handleApply(item.postId)}
                            onProfilePress={() => {
                              navigation.navigate('TheOtherPersonPage', { userId: item.authorUserId });
                          }}
                          />
                            )}
                            keyExtractor={item => item.postId.toString()}
                            showsVerticalScrollIndicator={false}
                        />
            </View>
            <MenuBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
            <CustomAlert
                visible={alertVisible}
                title={alertTitle}
                message={alertMessage}
                onClose={() => setAlertVisible(false)}
                onConfirm={() => setAlertVisible(false)} 
            />
        </View>
    )
}

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
    searchInput: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 30,
      marginBottom: 10,
      marginTop: 10,
    },
})

export default MeetPage;