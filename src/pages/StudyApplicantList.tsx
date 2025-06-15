import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { TabProps, RootStackParamList, NavigationProp  } from "../types";
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import StudyApplicantItem from '../components/ApplicantItem';
import CustomAlert from '../components/CustomAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../api/axiosInstance';

const StudyApplicantList: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteProp<RootStackParamList, 'StudyApplicantList'>>();
    const { postId } = route.params;
    const [applicants, setApplicants] = useState<any[]>([]);
    const [postTitle, setPostTitle] = useState('');

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");


    useEffect(() => {
        const fetchApplicants = async () => {
            try {
            const token = await AsyncStorage.getItem("token");
            const res = await axiosInstance.get(`http://13.124.71.212:8080/api/gathering/${postId}/applicants`, {
                headers: {
                Authorization: `Bearer ${token}`
                }
            });
            setApplicants(res.data.data.content);
            console.log("불러온 데이터:", res.data.data.content);
            } catch (error) {
            console.error("❌ 지원자 목록 불러오기 실패:", error);
            }
        };

        const fetchPostTitle = async () => {
            try {
            const token = await AsyncStorage.getItem("token");
            const res = await axiosInstance.get(`http://13.124.71.212:8080/api/gathering/${postId}`, {
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
                        <StudyApplicantItem
                            userId= {item.userId}
                            nickname={item.nickname}
                            message={item.applicationText}
                            accepted={item.accepted}
                            onAccept={async () => {
                                try {
                                    const token = await AsyncStorage.getItem("token");
                                    await axiosInstance.post(
                                        `http://13.124.71.212:8080/api/gathering/applicants/${item.applicantId}/accept`,
                                        {},
                                        {
                                            headers: {
                                            Authorization: `Bearer ${token}`,
                                            },
                                        }
                                        );

                                    // 수락 후 리스트 새로고침
                                    const updated = await axiosInstance.get(
                                    `http://13.124.71.212:8080/api/gathering/${postId}/applicants`,
                                    {
                                        headers: {
                                        Authorization: `Bearer ${token}`,
                                        },
                                    }
                                    );
                                    setApplicants(updated.data.data.content);
                                    
                                    setAlertTitle("수락");
                                    setAlertMessage(`${item.nickname}님을 채팅방에 초대했습니다!`);
                                    setAlertVisible(true);
                                } catch (error) {
                                    console.error("❌ 수락 실패:", error);
                                }
                            }}

                        onDelete={async () => {
                            try {
                                const token = await AsyncStorage.getItem("token");

                                await axiosInstance.delete(`http://13.124.71.212:8080/api/gathering/applicants/${item.applicantId}`, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                                });

                                // 삭제 후 목록 다시 불러오기
                                const res = await axiosInstance.get(`http://13.124.71.212:8080/api/gathering/${postId}/applicants`, {
                                headers: { Authorization: `Bearer ${token}` },
                                });
                                setApplicants(res.data.data.content);

                                setAlertTitle("삭제");
                                setAlertMessage(`${item.nickname}님의 지원을 삭제했습니다.`);
                                setAlertVisible(true);
                            } catch (error) {
                                console.error("❌ 지원자 삭제 실패:", error);
                            }
                            }}
                        onProfilePress={() => {
                            navigation.navigate('TheOtherPersonPage', { userId: item.userId });
                        }}
                        />
                    )}
                    keyExtractor={(item) => item.applicantId.toString()}
                    showsVerticalScrollIndicator={false}
                    />
            </View>
            <CustomAlert
                visible={alertVisible}
                title={alertTitle}
                message={alertMessage}
                onClose={() => setAlertVisible(false)}
                 onConfirm={() => setAlertVisible(false)} 
            />
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

export default StudyApplicantList;
