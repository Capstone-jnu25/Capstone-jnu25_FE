import React, { useEffect, useState } from "react";
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { RootStackParamList, TabProps, NavigationProp } from "../types";
import Icon from "react-native-vector-icons/Ionicons";
import TradePostDetailItem from "../components/TradePostDetailItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TradePostDetail: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'TradePostDetail'>>();
  const { postId } = route.params;

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await axios.get(`http://13.124.71.212:8080/api/secondhand/${postId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPost(res.data);
        setLoading(false);
      } catch (e) {
        console.error("❌ 중고거래 상세 조회 실패", e);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' size={25} color="#233b6d" />
          </TouchableOpacity>
          <TouchableOpacity
                  onPress={async () => {
            try {
              const token = await AsyncStorage.getItem("token");
              if (!token) return;

              const response = await axios.post(
                "http://13.124.71.212:8080/api/private-chats",
                { postId }, // 💡 전달할 postId
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (response.data.status === "success") {
                const { chattingRoomId, chatTitle } = response.data;

                navigation.navigate('ChatPage', {
                  chattingRoomId,
                  chatTitle,
                });
              }
            } catch (e) {
              console.error("❌ 채팅방 생성 실패:", e);
            }
          }}
        >
          <Text style={styles.chatButton}>채팅 보내기</Text>
        </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#233b6d" />
        ) : post ? (
          <TradePostDetailItem
            post={{
              userId: post.userId,
              id: post.postId,
              nickname: post.nickname,
              title: post.title,
              content: post.contents,
              image: { uri: post.photo },
              location: post.place,
              time: post.relativeTime,
              price: post.price,
              onProfilePress: () => navigation.navigate('TheOtherPersonPage', { userId: post.userId }), 
            }}
          />
        ) : (
          <Text>게시글을 불러올 수 없습니다.</Text>
        )}
      </View>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatButton: {
    fontSize: 14,
    color: '#007AFF',
  },
});

export default TradePostDetail;
