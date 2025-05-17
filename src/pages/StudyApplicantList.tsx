import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { TabProps, NavigationProp } from "../types";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import StudyApplicantItem from '../components/StudyApplicantItem';

const StudyApplicantList: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation();

    // 샘플 데이터
    const applicants = [
        { id: '1', nickname: '닉네임', message: '열심히 하겠습니다.서울대.열심히 하겠습니다.서울대' },
        { id: '2', nickname: '닉네임', message: '열심히 하겠습니다.\n서울대'},
        { id: '3', nickname: '닉네임', message: '열심히 하겠습니다.\n서울대'},
        { id: '4', nickname: '닉네임', message: '열심히 하겠습니다.\n서울대'},
        { id: '5', nickname: '닉네임', message: '열심히 하겠습니다.\n서울대'},
        { id: '6', nickname: '닉네임', message: '열심히 하겠습니다.\n서울대'},
    ];
    

    return (
         <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                    <Icon name='arrow-back' size={25} style={{ marginTop: 16, marginBottom: 10 }} color="#233b6d" />
                </TouchableOpacity>

                <View style={styles.itemContainer}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 25 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>같이 반수할 사람</Text>
                        </View>
                 <FlatList
                    data={applicants}
                    renderItem={({ item }) => (
                    <StudyApplicantItem
                        nickname={item.nickname}
                        message={item.message}
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

export default StudyApplicantList;
