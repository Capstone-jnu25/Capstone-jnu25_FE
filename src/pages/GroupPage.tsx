import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { TabProps, NavigationProp } from "../types";
import MenuBar from "../components/MenuBar";
import GroupItem from '../components/GroupItem';
import Icon from "react-native-vector-icons/Ionicons";
import axiosInstance from '../api/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Group {
  postId: number;
  title: string;
  boardType: 'STUDY' | 'MEETUP';
}

const MyPage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation<NavigationProp>();
    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
            const token = await AsyncStorage.getItem("token");
            const response = await axiosInstance.get("http://13.124.71.212:8080/api/group", {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            const sorted = response.data.data.sort((a: Group, b: Group) => b.postId - a.postId);
            setGroups(sorted);
            } catch (error) {
            console.error("❌ 그룹 목록 불러오기 실패:", error);
            }
        };

        fetchGroups();
    }, []);

    return(
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <Icon name='arrow-back' size={25} style={{ marginTop: 16, marginBottom: 10 }} color="#233b6d" />
                    </TouchableOpacity>
                    <Text style={styles.textTitle}>내 그룹</Text>
                    <Text/>
                </View>

                <ScrollView>
                    {groups.map((group) => (
                        <GroupItem 
                        key={group.postId}
                        title={group.title}
                        category={group.boardType === "STUDY" ? "스터디" : "번개"}
                        onPress={() => console.log(group.title)}
                        />
                    ))}
                    </ScrollView>
            </View>
            <View style={styles.menuBarContainer}>
              <MenuBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
            </View>
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
        marginBottom:20,
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    
})

export default MyPage;

