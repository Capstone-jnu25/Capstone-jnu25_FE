import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NaverMapView, NaverMapMarkerOverlay } from  '@mj-studio/react-native-naver-map';
import { TabProps, NavigationProp } from "../types";
import MenuBar from '../components/MenuBar';
import CircleButton from "../components/CircleButton";
import Icon from 'react-native-vector-icons/Ionicons'

const INITIAL_CAMERA = {
  latitude: 37.5666102,  // 서울 중심부 위도
  longitude: 126.9783881,  // 서울 중심부 경도
  zoom: 12,  // 줌 레벨
};

const LostPage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation<NavigationProp>();
    
    const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);

    useFocusEffect(
      React.useCallback(() => {
        setSelectedMarkerId(null); // 화면이 포커스를 받을 때마다 selectedMarkerId를 null로 설정
      }, [])
    );

    const [posts, setPosts] = useState([
      { id: 1, title: '아디다스 바람막이', content: '상세내용상세내용상세내용', location: '광주 북구 용봉로 77 전남대학교 백도 앞', image: require('../assets/images.png'), time: '2분 전', lat: 37.5759, lng: 126.9768, selected: false },
      { id: 2, title: '아디다스 바람막이', content: '상세내용상세내용상세내용', location: '광주 북구 용봉로 77 전남대학교 백도 앞', image: require('../assets/images.png'), time: '2분 전', lat: 37.5700, lng: 126.9760, selected: false },
      // 백엔드에서 받아온 게시글들
    ]);
    const selectedPost = posts.find(post => post.id === selectedMarkerId);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
            <NaverMapView
              style={{ width: '100%', height: '100%' }}
              initialCamera={INITIAL_CAMERA}
            >
              {posts.map(post => (
                <NaverMapMarkerOverlay
                  key={post.id}
                  latitude={post.lat}
                  longitude={post.lng}
                  onTap={() => setSelectedMarkerId(post.id)}
                  image={post.id === selectedMarkerId ? require('../assets/RedMarker.png') : require('../assets/Marker.png')}
                  width={19}
                  height={27}
                >
                  
                </NaverMapMarkerOverlay>
              ))}
            </NaverMapView>
            <View style={styles.buttonContainer}>
              <CircleButton iconName="notifications-outline" onPress={() => {navigation.navigate('NotificationPage')}} />
              <CircleButton iconName="list" onPress={() => {navigation.navigate('LostPostList')}} />
            </View>

            </View>
            <View style={styles.menuBarContainer}>
              <MenuBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
            </View>

            {selectedMarkerId !== null && (
              <View style={styles.detailContainer}>
                <TouchableOpacity onPress={() => setSelectedMarkerId(null)}>
                  <Icon name='close' size={25} style={{ marginBottom: 10 }}/>
                </TouchableOpacity>
                
                <View style={styles.headerRow}>
                  <Text style={styles.title}>
                    {selectedPost?.title}
                  </Text>
                  <TouchableOpacity onPress={() =>{}}>
                    <Text style={styles.chatButton}>채팅 보내기</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.separator} />

                <View style={styles.contentRow}>
                  <Image source={selectedPost?.image} style={styles.postImage} />
                  <View style={styles.descriptionBox}>
                    <Text>{selectedPost?.content}</Text>
                    <View style={styles.locationContainer}>
                      <Icon name="location-sharp" size={16} color="#777" />
                      <Text style={{marginLeft: 5, fontSize: 14, color: '#777'}}>{selectedPost?.location}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
        </View> 
        
    )
}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: 'flex-end', // 하단 메뉴바를 화면 아래에 고정
    },
    contentContainer: {
      flex: 1, // 텍스트는 위에 배치
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      marginBottom: 20, // 하단 메뉴바와의 간격
    },
    menuBarContainer: {
      marginTop:'auto',
      zIndex:1,
    },
    buttonContainer: {
      position: 'absolute',
      top: 20,
      right: 20,
      flexDirection: 'row',
      gap: 10,
    },
    detailContainer: {
      position: 'absolute',
      bottom: 100,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 16,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    chatButton: {
      fontSize: 14,
      color: '#007AFF',
    },
    separator: {
      height: 1,
      backgroundColor: '#ccc',
      marginVertical: 8,
    },
    contentRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    postImage: {
      width: 100,
      height: 100,
      borderRadius: 8,
      marginRight: 10,
    },
    descriptionBox: {
      flex: 1,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
  });

export default LostPage;