import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { TabProps, NavigationProp } from "../types";
import MenuBar from "../components/MenuBar";
import Category from "../components/Category";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from '../api/axiosInstance';

interface NotificationItem {
  keywordText: string;
  boardType: string;
  postId: number;
}

const NotificationPage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
  const navigation = useNavigation<NavigationProp>();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axiosInstance.get("http://13.124.71.212:8080/api/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.status === "success") {
          setNotifications(response.data.data);
        }
      } catch (error) {
        console.error("❌ 알림 목록 불러오기 실패:", error);
      }
    };

    fetchNotifications();
  }, []);

  const getCategoryLabel = (boardType: string) => {
    switch (boardType) {
      case "STUDY": return "스터디";
      case "MEETUP": return "번개";
      case "SECONDHAND": return "중고";
      case "LOST": return "분실물";
      default: return boardType;
    }
  };

  const renderItem = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity
      style={styles.noticeItem}
      onPress={() => {
        // boardType에 따라 이동할 화면 분기
        if (item.boardType === "STUDY" || item.boardType === "MEETUP") {
          navigation.navigate("StudyPostDetail", { postId: item.postId });
        } else if (item.boardType === "SECONDHAND") {
          navigation.navigate("TradePostDetail", { postId: item.postId });
        } else if (item.boardType === "LOST") {
          navigation.navigate("LostPostDetail", { postId: item.postId });
        }
      }}
    >
      <View style={styles.noticeContent}>
        <Category label={getCategoryLabel(item.boardType)} />
        <Text style={styles.titleText}>{item.keywordText}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name='arrow-back' size={25} style={{ marginTop: 16, marginBottom: 10 }} color="#233b6d" />
        </TouchableOpacity>

        <View style={styles.itemContainer}>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 25 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>알림</Text>
          </View>
          <FlatList
            data={notifications}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
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
    backgroundColor: '#C6E4FF',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  menuBarContainer: {
    marginTop: 'auto',
  },
  noticeItem: {
    backgroundColor: '#C6E4FF',
    marginBottom: 15,
    padding: 15,
    borderRadius: 20,
    elevation: 3,
  },
  noticeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    marginLeft: 8,
  },
});

export default NotificationPage;