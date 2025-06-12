import React, { useState, useEffect } from "react";
import { useNavigation, CommonActions } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TabProps, NavigationProp } from "../types";
import MenuBar from "../components/MenuBar";
import Icon from "react-native-vector-icons/Ionicons";
import Category from "../components/Category";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "../components/CustomAlert";

interface PostItem {
  postId: number;
  title: string;
  boardType: string;
}

const MyPage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation<NavigationProp>();
    const [recentPosts, setRecentPosts] = useState<PostItem[]>([]);
    const [alertVisible, setAlertVisible] = useState(false);

    useEffect(() => {
    const fetchRecentPosts = async () => {
        try {
        const token = await AsyncStorage.getItem("token");
        if (!token) throw new Error("토큰 없음");

        const response = await axios.get("http://13.124.71.212:8080/api/posts/my-grouped", {
            headers: { Authorization: `Bearer ${token}` },
        });

        const groupedPosts = response.data as Record<string, PostItem[]>;

        const allPosts = Object.values(groupedPosts).flat();
        const sorted = allPosts.sort((a, b) => b.postId - a.postId);

        setRecentPosts(sorted.slice(0, 3));
        } catch (e) {
        console.error("❌ 최근 게시글 불러오기 실패", e);
        }
    };

    fetchRecentPosts();
    }, []);

    const getCategoryLabel = (type: string) => {
        switch (type) {
            case "STUDY": return "스터디";
            case "MEETUP": return "번개";
            case "SECONDHAND": return "중고";
            case "LOST": return "분실물";
            default: return type;
        }
    };

    const handleNavigate = (post: PostItem) => {
        switch (post.boardType) {
            case "STUDY":
                navigation.navigate("StudyApplicantList", { postId: post.postId });
                break;
            case "MEETUP":
                navigation.navigate("MeetApplicantList", { postId: post.postId });
                break;
            case "SECONDHAND":
                navigation.navigate("TradePostDetail", { postId: post.postId });
                break;
            case "LOST":
                navigation.navigate("LostPostDetail", { postId: post.postId });
                break;
            default:
                break;
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            const userId = await AsyncStorage.getItem("userId");

            if (!token || !userId) throw new Error("로그인 정보 없음");

            await axios.delete(`http://13.124.71.212:8080/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
            });

            // 로그아웃 후 메인으로 이동
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("userId");
            navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'MainPage' }],
            })
            );
        } catch (error) {
            console.error("❌ 탈퇴 실패:", error);
        }
        };


    return(
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <Icon name='arrow-back' size={25} style={{ marginTop: 16, marginBottom: 10 }} color="#233b6d" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {navigation.navigate('EditProfile')}}>
                        <Text style={styles.editButton}>내 정보 수정</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => {navigation.navigate('KeywordPage')}}>
                    <View style={styles.rowButton}>
                        <Text style={styles.text}>키워드 설정</Text>
                        <Icon name='chevron-forward-outline' size={15} color="#233b6d" />
                    </View>
                </TouchableOpacity>
                <View style={styles.row}>
                    <Text style={styles.textTitle}>내가 쓴 글</Text>
                    <TouchableOpacity onPress={() => {navigation.navigate('MyPostPage')}}>
                        <Text style={styles.text}>더보기</Text>
                    </TouchableOpacity>
                </View>

               <View style={styles.list}>
                {recentPosts.length === 0 ? (
                    <Text style={styles.text}>작성한 글이 없습니다.</Text>
                ) : (
                    recentPosts.map((post) => (
                    <TouchableOpacity key={post.postId} onPress={() => handleNavigate(post)}>
                        <View style={styles.row}>
                        <Text style={styles.text}>{post.title}</Text>
                        <Category label={getCategoryLabel(post.boardType)} />
                        </View>
                        <View style={styles.separator} />
                    </TouchableOpacity>
                    ))
                )}
                </View>

                <View style={styles.option}>
                    <TouchableOpacity onPress={() => {}}>
                        <Text style={styles.textOption}>알림 설정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={async () => {
                            await AsyncStorage.removeItem("token");
                            navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'MainPage' }],
                            })
                            );
                        }}
                        >
                        <Text style={styles.textOption}>로그아웃</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setAlertVisible(true)}>
                        <Text style={styles.textRed}>탈퇴하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.menuBarContainer}>
              <MenuBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
            </View>
            <CustomAlert
              visible={alertVisible}
              title="탈퇴"
              message="정말 탈퇴하시겠습니까?"
              onClose={handleDeleteAccount} //취소 하는 버튼 만들어야함
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
    menuBarContainer: {
        marginTop:'auto',
        zIndex:1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    editButton: {
        fontSize: 14,
        color: '#007AFF',
    },
    text: {
        fontSize: 16,
    },
    textOption: {
        fontSize: 16,
        padding: 10,
    },
    textRed: {
        fontSize: 16,
        color: '#FF5659',
        padding: 10,
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    rowButton:{
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    row:{
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    list:{
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
        width: '100%',
        backgroundColor: 'white',
    },
    option: {
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
        width: '100%',
        backgroundColor: 'white',
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 8,
      },
})

export default MyPage;

