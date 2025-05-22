import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { TabProps, NavigationProp } from "../types";
import MenuBar from '../components/MenuBar';
import Icon from 'react-native-vector-icons/Ionicons';
import CircleButton from "../components/CircleButton";
import MeetPostItem from "../components/MeetPostItem";

const posts = [
    {
        title: '오늘 영화 같이 보실 분!',
        dDay: 'D-DAY',
        members: '5/10',
        details: '마인크래프트 무비 볼거에요. 끝나고 PC방에서 마크도 합시다!!! 마인크래프트 무비 볼거에요. 끝나고 PC방에서 마크도 합시다!!! 마인크래프트 무비 볼거에요. 끝나고 PC방에서 마크도 합시다!!!',
        date: '시간 : 오늘 16:30',
        location: '장소 : 전대 메가박스'
    },
    {
        title: '내일 점심 같이 먹을 분 구해요',
        dDay: 'D-1',
        members: '2/3',
        details: '메뉴는 만나서 같이 정해요 전 다 좋습니다',
        date: '시간 : 내일 11시',
        location: '장소 : 후문'
    },    
];

const MeetPage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation<NavigationProp>();

    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.details.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>번개 게시판</Text>
                        <Icon name="search" size={25} color="#233b6d" onPress={() => setIsSearching(!isSearching)}/>
                </View>
                {isSearching && (
                            <TextInput
                            placeholder="검색어를 입력하세요"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            style={styles.searchInput}
                            />
                        )}
                <View style={styles.buttonContainer}>
                    <CircleButton iconName="pencil" onPress={() => {navigation.navigate('MeetPostAdd')}} />
                </View>
                <FlatList
                    data={posts}
                    renderItem={({ item }) => (
                        <MeetPostItem 
                            title={item.title}
                            dDay={item.dDay}
                            members={item.members}
                            details={item.details}
                            date={item.date}
                            location={item.location}
                            onPress={() => {}}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
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
    searchInput: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 30,
      marginBottom: 10,
      marginTop: 10,
    },
})

export default MeetPage;