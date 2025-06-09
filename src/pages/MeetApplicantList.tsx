import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { TabProps, NavigationProp, RootStackParamList } from "../types";
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ApplicantItem from '../components/ApplicantItem';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MeetApplicantList: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<RootStackParamList, 'StudyApplicantList'>>();
    const { postId } = route.params;
    const [applicants, setApplicants] = useState<any[]>([]);
    const [postTitle, setPostTitle] = useState('');

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
            const token = await AsyncStorage.getItem("token");
            const res = await axios.get(`http://13.124.71.212:8080/api/gathering/${postId}/applicants`, {
                headers: {
                Authorization: `Bearer ${token}`
                }
            });
            setApplicants(res.data.data.content);
            } catch (error) {
            console.error("❌ 지원자 목록 불러오기 실패:", error);
            }
        };

        const fetchPostTitle = async () => {
            try {
            const token = await AsyncStorage.getItem("token");
            const res = await axios.get(`http://13.124.71.212:8080/api/gathering/${postId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setPostTitle(res.data.data.title);
            } catch (error) {
            console.error("❌ 게시글 제목 불러오기 실패:", error);
            }
        };

        fetchApplicants();
        fetchPostTitle();
    }, [postId]);

    return (
         <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                    <Icon name='arrow-back' size={25} style={{ marginTop: 16, marginBottom: 10 }} color="#233b6d" />
                </TouchableOpacity>

                <View style={styles.itemContainer}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 25 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{postTitle}</Text>
                        </View>
                 <FlatList
                    data={applicants}
                    renderItem={({ item }) => (
                    <ApplicantItem
                        nickname={item.nickname}
                        onAccept={() => {}}
                        onDelete={() => {}}
                    />
                    )}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
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
    itemContainer: {
        flex:1,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding:20,
    },
    title: {
        flex: 1,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default MeetApplicantList;
