import React, { useEffect, useState} from "react";
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { RootStackParamList, TabProps, NavigationProp } from "../types";
import Icon from "react-native-vector-icons/Ionicons";
import StudyPostDetailItem from "../components/StudyPostItemDetail";
import CustomAlert from "../components/CustomAlert";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const StudyPostDetail: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteProp<RootStackParamList, 'StudyPostDetail'>>();
    const { postId } = route.params

    const [post, setPost] = useState<any>(null);
    const [application_text, setApplication_text] = useState('');

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

    const handleSubmit = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            await axios.post(
            `http://13.124.71.212:8080/api/gathering/${postId}/apply`,
            { application_text: application_text },
            {
                headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                },
            }
            );

            showAlert("완료", "신청이 완료되었습니다.");
            setApplication_text('');
            navigation.goBack();
        } catch (error) {
            console.error("❌ 지원 실패:", error);
            showAlert("에러", "문제가 발생하였습니다.");
        }
    };


    
    useEffect(() => {
        const fetchPost = async () => {
            try {
            const token = await AsyncStorage.getItem("token");
            const res = await axios.get(`http://13.124.71.212:8080/api/gathering/${postId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setPost(res.data.data); 
            } catch (e) {
            console.error("❌ 스터디 게시글 상세 조회 실패", e);
            }
        };

        fetchPost();
        }, [postId]);


    return(
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                    <View style={styles.mainContainer}>
                        <View style={styles.contentContainer}>
                            <TouchableOpacity onPress={() => {navigation.goBack()}}>
                                <Icon name='arrow-back' size={25} style={{ marginTop: 16, marginBottom: 10 }} color="#233b6d"/>
                            </TouchableOpacity>
                            
                            <View style={styles.itemContainer}>
                                {post ? (
                                    <StudyPostDetailItem 
                                        nickname={post.nickname}
                                        id= {post.userId}
                                        title={post.title}
                                        dday={post.dday}
                                        time={post.time}
                                        place={post.place}
                                        gender={getGenderLabel(post.gender)}
                                        contents={post.contents}
                                        application_text={application_text}
                                        setApplication_text={setApplication_text}
                                        onSubmit={handleSubmit}
                                        onProfilePress={() => {
                                            navigation.navigate('TheOtherPersonPage', { userId: post.userId });
                                        }}
                                    />
                                ) : (
                                    <Text>게시글을 불러올 수 없습니다.</Text>
                                )}
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
                </ScrollView>
            </KeyboardAvoidingView>
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
    itemContainer: {
        flex:1,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding:20,
    },
});

export default StudyPostDetail;

