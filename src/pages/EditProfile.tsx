import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { TabProps, NavigationProp } from "../types";
import Icon from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/CustomButton";
import CustomTextInput from "../components/CustomTextInput";

const MyPage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation<NavigationProp>();
    const [showPasswordFields, setShowPasswordFields] = useState(false);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <Icon name='arrow-back' size={25} style={{ marginTop: 16, marginBottom: 10 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>{}}>
                        <Text style={styles.deleteButton}>탈퇴하기</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.horizontal}>
                    <Image 
                        source={require('../assets/profile.png')}
                        style={styles.profileImage} 
                    />

                    <CustomTextInput placeholder="닉네임" />
                    <CustomTextInput placeholder="nickname@jnu.ac.kr" />

                    {!showPasswordFields ? (
                        <CustomButton 
                            title="비밀번호 변경" 
                            onPress={() => setShowPasswordFields(true)}
                            
                        />
                    ) : (
                        <>
                            <CustomTextInput placeholder="현재 비밀번호" secureTextEntry={true} />
                            <View style={styles.checkPassWord}>
                                <CustomTextInput
                                    style={{ width: 140 }}
                                    placeholder="새 비밀번호"
                                    secureTextEntry={true}
                                />
                                <TouchableOpacity style={styles.checkButton}>
                                    <Text style={styles.check}>확인</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}

                    <CustomTextInput placeholder="220639"  keyboardType="numeric"/>
                    <CustomTextInput placeholder="학과(선택)" />
                </View>

                <CustomButton title="완료" style={styles.button} onPress={() => {}} />
            </View>
        </View>
    );
}

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
    deleteButton: {
        fontSize: 14,
        color: '#FF5659',
    },
    horizontal: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 250,
        height: 250,
        borderWidth: 4,
        borderColor: '#95CEFF',
        borderRadius: 200,
        backgroundColor: '#fff',
        margin: 30,
    },
    button: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: '30%',
        backgroundColor: '#233b6d',
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderWidth: 0,
    },
    checkPassWord: {
        flexDirection: 'row', // 텍스트 입력란과 버튼을 수평으로 배치
        alignItems: 'center', // 세로 중앙 정렬
    },
    checkButton: {
        backgroundColor: '#fff',
        height: 40,
        borderColor: '#FF5659',
        borderWidth: 3,
        width: 50,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginLeft:5,
    },
    check: {
        color: '#FF5659', // 텍스트 색상을 흰색으로 설정
        fontSize: 14, // 텍스트 크기 설정
    }
});

export default MyPage;
