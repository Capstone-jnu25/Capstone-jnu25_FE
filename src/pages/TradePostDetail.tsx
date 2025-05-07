import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TabProps, NavigationProp } from "../types";
import Icon from "react-native-vector-icons/Ionicons";
import TradePostDetailItem from "../components/TradePostDetailItem";

 const post = {
        id: 1,
        nickname: '닉네임',
        date: '04/06 21:40',
        title: '나이키 바람막이',
        description: '상세설명상세설명상세설명상세설명상세설명상세설명상세설명상세설명',
        image: require('../assets/images.png'),
        price: "15000원",
        location: '광주 북구 용봉로 77 전남대학교 백도 앞'
    };
    
const TradePostDetail: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation<NavigationProp>();

    return(
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <Icon name='arrow-back' size={25} style={{ marginTop: 16, marginBottom: 10 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>{}}>
                        <Text style={styles.chatButton}>채팅 보내기</Text>
                    </TouchableOpacity>
                </View>
                <TradePostDetailItem post={post} />
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
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
     },
    chatButton: {
        fontSize: 14,
        color: '#007AFF',
    },
})

export default TradePostDetail;

