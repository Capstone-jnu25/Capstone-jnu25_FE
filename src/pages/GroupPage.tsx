import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { TabProps, NavigationProp } from "../types";
import MenuBar from "../components/MenuBar";
import GroupItem from '../components/GroupItem';
import Icon from "react-native-vector-icons/Ionicons";

const groups = [
    { title: '영화 한 편 보기', category: '번개', date: '2025.04.06. 22:00' },
    { title: '내일 점심 먹기', category: '번개', date: '2025.04.06. 22:00' },
    { title: '같이 반수할 사람', category: '스터디' },
    { title: '토익 공부하실 분', category: '스터디' },
];

const MyPage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation<NavigationProp>();

    return(
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <Icon name='arrow-back' size={25} style={{ marginTop: 16, marginBottom: 10 }} color="#233b6d" />
                    </TouchableOpacity>
                    <Text style={styles.textTitle}>내 그룹</Text>
                    <Text/>
                </View>

                <ScrollView>
                    {groups.map((group, index) => (
                        <GroupItem 
                            key={index} 
                            title={group.title} 
                            category={group.category} 
                            date={group.date}
                            onPress={() => console.log(group.title)}
                        />
                    ))}
            </ScrollView>
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
        marginBottom:20,
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    
})

export default MyPage;

