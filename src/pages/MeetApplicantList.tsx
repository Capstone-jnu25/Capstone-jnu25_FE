import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { TabProps, NavigationProp } from "../types";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ApplicantItem from '../components/ApplicantItem';

const MeetApplicantList: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation();

    // 샘플 데이터
    const applicants = [
        { id: '1', nickname: '닉네임',},
        { id: '2', nickname: '닉네임',},
        { id: '3', nickname: '닉네임',},
        { id: '4', nickname: '닉네임',},
        { id: '5', nickname: '닉네임',},
        { id: '6', nickname: '닉네임',},
    ];
    

    return (
         <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                    <Icon name='arrow-back' size={25} style={{ marginTop: 16, marginBottom: 10 }} color="#233b6d" />
                </TouchableOpacity>

                <View style={styles.itemContainer}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 25 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>오늘 영화 한 편 보실 분</Text>
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
