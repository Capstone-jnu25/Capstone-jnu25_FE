import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { TabProps, NavigationProp } from "../types";
import Icon from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/CustomButton";
import CustomTextInput from "../components/CustomTextInput";

const MyPage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation<NavigationProp>();

    return(
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
                source={require('../assets/profile.png')} // 고정된 프로필 이미지
                style={styles.profileImage} 
                />
                <CustomTextInput
                    placeholder="닉네임"/>
                <CustomTextInput
                    placeholder="nickname@jnu.ac.kr"/>
                <CustomButton title="비밀번호 변경" onPress={()=>{}}/>    
                <CustomTextInput
                    placeholder="224636"/>
                <CustomTextInput
                    placeholder="학과(선택)"/> 

                
            </View>
            <CustomButton title='완료' style={styles.button} onPress={() => {}}/>
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
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    deleteButton: {
        fontSize: 14,
        color: '#FF5659',
    },
    row:{
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    horizontal: {
        height:'80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width:250,
        height:250,
        borderWidth:4,
        borderColor:'#95CEFF',
        borderRadius: 200,
        backgroundColor:'#fff',
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
    }
})

export default MyPage;

