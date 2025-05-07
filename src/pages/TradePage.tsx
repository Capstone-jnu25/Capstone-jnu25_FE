import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TabProps, NavigationProp } from "../types";
import MenuBar from '../components/MenuBar';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import CircleButton from "../components/CircleButton";
import TradePostItem from "../components/TradePostItem";

const posts = [
    { id: '1', title: '아디다스 바람막이', content: '상세내용상세내용상세내용', price: '15000원', image: require('../assets/images.png'), time: '2분 전' },
    { id: '2', title: '아디다스 바람막이', content: '상세내용상세내용상세내용', price: '15000원', image: require('../assets/images.png'), time: '2분 전' },
    { id: '3', title: '아디다스 바람막이', content: '상세내용상세내용상세내용', price: '15000원', image: require('../assets/images.png'), time: '2분 전' },
    { id: '4', title: '아디다스 바람막이', content: '상세내용상세내용상세내용', price: '15000원', image: require('../assets/images.png'), time: '2분 전' },
    { id: '5', title: '아디다스 바람막이', content: '상세내용상세내용상세내용', price: '15000원', image: require('../assets/images.png'), time: '2분 전' },
    { id: '6', title: '아디다스 바람막이', content: '상세내용상세내용상세내용', price: '15000원', image: require('../assets/images.png'), time: '2분 전' },
  ];

const TradePage:React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
 const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>중고거래 게시판</Text>
          <View style={styles.searchContainer}>
            <Icon1 name="search" size={25} onPress={() =>{}}/>
            <Icon2 name="image-plus" size={25} onPress={() =>{}}/>  
          </View>
        </View>
        
          <View style={styles.buttonContainer}>
            <CircleButton iconName="pencil" onPress={() => {navigation.navigate('TradePostAdd')}} />
          </View>
          <FlatList
            data={posts}
            renderItem={({ item }) => <TradePostItem post={item} />}
            keyExtractor={(item) => item.id}
          />
      </View>
      
      <View style={styles.menuBarContainer}>
        <MenuBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
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
    searchContainer: {
      flexDirection: 'row',
      gap: 10,
      marginLeft: 'auto', // 오른쪽으로 밀기
    },
    menuBarContainer: {
      marginTop:'auto',
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      zIndex: 1,
    }
  });


export default TradePage;