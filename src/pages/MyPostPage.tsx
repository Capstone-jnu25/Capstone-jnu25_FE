import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { TabProps, NavigationProp } from "../types";
import MenuBar from "../components/MenuBar";
import Icon from "react-native-vector-icons/Ionicons";
import Category from "../components/Category";
import axios from "axios";
import CustomAlert from "../components/CustomAlert";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface PostItem {
    postId: number;
    title: string;
    boardType: string;
}

const MyPostPage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation<NavigationProp>();
    const [posts, setPosts] = useState<PostItem[]>([]);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
    const fetchMyPosts = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (!token) throw new Error("토큰이 없습니다.");

            const response = await axios.get("http://13.124.71.212:8080/api/posts/my-grouped", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const groupedPosts = response.data as Record<string, PostItem[]>;

            // 응답이 null인 경우 방어 로직
            if (!groupedPosts || typeof groupedPosts !== 'object') {
                setPosts([]); // 정상: 글 없음
                return;
            }

            const allPosts: PostItem[] = Object.values(groupedPosts).flat();
            setPosts(allPosts);
        } catch (error: any) {
            console.error("❌ 진짜 오류:", error);
            setAlertMessage("서버 오류로 글을 불러올 수 없습니다.");
            setAlertVisible(true);
        }
    };

    fetchMyPosts();
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

    return (
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); }}>
                        <Icon name='arrow-back' size={25} style={{ marginTop: 16, marginBottom: 10 }} color="#233b6d" />
                    </TouchableOpacity>
                    <Text style={styles.textTitle}>내가 쓴 글</Text>
                    <Text/>
                </View>
                <View style={styles.list}>
                   <ScrollView>
                        {posts.length === 0 ? (
                            <Text style={styles.emptyMessage}>작성한 글이 없습니다.</Text>
                        ) : (
                            posts.map((post) => (
                            <TouchableOpacity key={post.postId} onPress={() => handleNavigate(post)}>
                                <View style={styles.row}>
                                <Text style={styles.text}>{post.title}</Text>
                                <Category label={getCategoryLabel(post.boardType)} />
                                </View>
                                <View style={styles.separator} />
                            </TouchableOpacity>
                            ))
                        )}
                        </ScrollView>

                </View>
            </View>

            <View style={styles.menuBarContainer}>
                <MenuBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
            </View>

            <CustomAlert
                visible={alertVisible}
                title="에러"
                message={alertMessage}
                onClose={() => setAlertVisible(false)}
                 onConfirm={() => setAlertVisible(false)} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#C6E4FF',
    },
    contentContainer: {
        flex: 1,
        padding: 20,
    },
    menuBarContainer: {
        marginTop: 'auto',
        zIndex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    row: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    list: {
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
        width: '100%',
        backgroundColor: 'white',
        flex:1,
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 8,
    },
    emptyMessage: {
        textAlign: 'center',
        color: '#666',
        }
});

export default MyPostPage;
