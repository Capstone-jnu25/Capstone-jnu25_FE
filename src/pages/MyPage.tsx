import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TabProps, NavigationProp } from "../types";
import MenuBar from "../components/MenuBar";
import Icon from "react-native-vector-icons/Ionicons";
import Category from "../components/Category";

const MyPage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation<NavigationProp>();

    return(
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <Icon name='arrow-back' size={25} style={{ marginTop: 16, marginBottom: 10 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>{navigation.navigate('EditProfile')}}>
                        <Text style={styles.editButton}>내 정보 수정</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => {navigation.navigate('KeywordPage')}}>
                    <View style={styles.rowButton}>
                        <Text style={styles.text}>키워드 설정</Text>
                        <Icon name='chevron-forward-outline' size={15} style={styles.icon} />
                    </View>
                </TouchableOpacity>
                <View style={styles.row}>
                    <Text style={styles.textTitle}>내가 쓴 글</Text>
                    <TouchableOpacity onPress={() => {}}>
                        <Text style={styles.text}>더보기</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.list}> {/*최대 3개?*/}
                    <TouchableOpacity onPress={() => {}}>
                        <View style={styles.row}>
                            <Text style={styles.text}>에어팟 프로</Text>
                            <Category label={'분실물'}/>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    <TouchableOpacity onPress={() => {}}>
                        <View style={styles.row}>
                            <Text style={styles.text}>에어팟 프로</Text>
                            <Category label={'번개'}/>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.option}>
                    <TouchableOpacity onPress={() => {}}>
                        <Text style={styles.textOption}>알림 설정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}}>
                        <Text style={styles.textOption}>로그아웃</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}}>
                        <Text style={styles.textRed}>탈퇴하기</Text>
                    </TouchableOpacity>
                </View>
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
    icon: {
        marginLeft: 'auto', // 자동으로 오른쪽으로 밀어내기
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

