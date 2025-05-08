import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TabProps, NavigationProp } from "../types";
import MenuBar from '../components/MenuBar';
import Icon from 'react-native-vector-icons/Ionicons';
import CircleButton from "../components/CircleButton";
import StudyPostItem from "../components/StudyPostItem";


const studyPosts = [
    {
        title: '같이 반수할 사람',
        dDay: 'D-DAY',
        members: '5/10',
        details: '원하는 대학이나 짧은 각오 같은거 작성해주세요',
        date: '시간 : 수요일 6시',
        location: '장소 : 디도, 카페'
    },
    {
        title: '같이 토익할 사람',
        dDay: 'D-1',
        members: '2/3',
        details: '원하는 대학이나 짧은 각오 같은거 작성해주세요',
        date: '시간 : 금요일마다',
        location: '장소 : 디도'
    },    
];

const StudyPage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>스터디 게시판</Text>
                        <Icon name="search" size={25} onPress={() =>{}}/>
                </View>
                <View style={styles.buttonContainer}>
                    <CircleButton iconName="pencil" onPress={() => {}} />
                </View>
                <FlatList
                    data={studyPosts}
                    renderItem={({ item }) => (
                        <StudyPostItem 
                            title={item.title}
                            dDay={item.dDay}
                            members={item.members}
                            details={item.details}
                            date={item.date}
                            location={item.location}
                            onPress={() => console.log(item.title)}
                        />
                    )}
                    numColumns={2}  
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer} 
                />
            </View>
            <MenuBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
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
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginTop : 16,
      },
    headerText: {
        flex: 1,
        fontSize: 20,
        fontWeight : 'bold',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 1,
    },
    listContainer: {
        alignItems: 'center',  // ✅ 가운데 정렬
    },
})

export default StudyPage;