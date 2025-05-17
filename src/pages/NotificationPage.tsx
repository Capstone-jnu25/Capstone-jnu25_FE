import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { TabProps,NavigationProp } from "../types";
import MenuBar from "../components/MenuBar";
import Category from "../components/Category";
import Icon from "react-native-vector-icons/Ionicons";

const notice = [
    {id: '1', type:'분실물', title:'나이키 바람막이'},
    {id: '2', type:'분실물', title:'나이키 바람막이'} 
];

const NotificationPage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
     const navigation = useNavigation<NavigationProp>();

     const renderItem = ({ item }: { item: { id: string; type:string; title: string } }) => (
        <TouchableOpacity style={styles.noticeItem}>
            <View style={styles.noticeContent}>
                <Category label={item.type}/>
                <Text style={styles.titleText}>{item.title}</Text>
            </View>
        </TouchableOpacity>
      );
    
    return(
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                    <Icon name='arrow-back' size={25} style={{ marginTop: 16, marginBottom: 10 }} color="#233b6d" />
                </TouchableOpacity>
                
                <View style={styles.itemContainer}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 25 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>알림</Text>
                    </View>
                    <FlatList
                        data={notice}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
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
    itemContainer: {
        flex:1,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding:20,
    },
    menuBarContainer: {
        marginTop:'auto',
    },
    noticeItem: {
        backgroundColor: '#C6E4FF',
        marginBottom: 15,
        padding: 15,
        borderRadius: 20,
        elevation: 3,
    },
    noticeContent: {
        margin:5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 20,
        marginLeft: 8,
    },
});

export default NotificationPage;

