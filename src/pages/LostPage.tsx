import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { TabProps, NavigationProp } from "../types";
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MenuBar from '../components/MenuBar';
import CircleButton from "../components/CircleButton";
import Icon from 'react-native-vector-icons/Ionicons'

const LostPage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
  const [camera, setCamera] = useState<{ latitude: number; longitude: number } | null>(null);
  const [postDetail, setPostDetail] = useState<any>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);

  // 마커 목록 불러오기
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await axios.get("http://13.124.71.212:8080/api/lostboards/found/map", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const mapped = res.data.map((item: any) => ({
          id: item.postId,
          title: item.title,
          lat: item.latitude,
          lng: item.longitude,
        }));
        setPosts(mapped);
      } catch (error) {
        console.error("❌ 마커 불러오기 실패", error);
      }
    };

    fetchMarkers();
  }, []);

  // 캠퍼스 좌표
  useEffect(() => {
    const fetchCameraPosition = async () => {
      const lat = await AsyncStorage.getItem("latitude");
      const lng = await AsyncStorage.getItem("longitude");
      if (lat && lng) {
        setCamera({ latitude: parseFloat(lat), longitude: parseFloat(lng) });
      }
    };
    fetchCameraPosition();
  }, []);

  // 마커 클릭 시 상세 정보 불러오기
  useEffect(() => {
    const fetchPostDetail = async () => {
      if (selectedMarkerId === null) return;
      try {
        setLoadingDetail(true);
        const token = await AsyncStorage.getItem("token");
        const res = await axios.get(`http://13.124.71.212:8080/api/lostboards/${selectedMarkerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPostDetail(res.data);
      } catch (error) {
        console.error("❌ 상세 게시글 로드 실패", error);
      } finally {
        setLoadingDetail(false);
      }
    };

    fetchPostDetail();
  }, [selectedMarkerId]);

  // 포커스될 때마다 초기화
  useFocusEffect(
    React.useCallback(() => {
      setSelectedMarkerId(null);
    }, [])
  );

  const htmlContent = camera ? `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Kakao Map</title>
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=a105821f449b32a10e3a1f387619d465&autoload=false"></script>
        <style>html, body, #map { height: 100%; margin: 0; padding: 0; }</style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          document.addEventListener("DOMContentLoaded", function () {
            kakao.maps.load(function () {
              const container = document.getElementById('map');
              const options = {
                center: new kakao.maps.LatLng(${camera.latitude}, ${camera.longitude}),
                level: 4
              };
              const map = new kakao.maps.Map(container, options);

              const markers = ${JSON.stringify(posts)};
              markers.forEach(post => {
                const marker = new kakao.maps.Marker({
                  position: new kakao.maps.LatLng(post.lat, post.lng),
                  map: map
                });
                kakao.maps.event.addListener(marker, 'click', function () {
                  window.ReactNativeWebView.postMessage(post.id.toString());
                });
              });

              window.ReactNativeWebView.postMessage("✅ Kakao Map loaded");
            });
          });
        </script>
      </body>
    </html>
  ` : '';

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        {camera && (
          <WebView
            source={{ html: htmlContent }}
            originWhitelist={['*']}
            javaScriptEnabled
            domStorageEnabled
            cacheEnabled={false}
            onMessage={(event) => {
              const msg = event.nativeEvent.data;
              const id = parseInt(msg);
              if (!isNaN(id)) setSelectedMarkerId(id);
            }}
            onError={(e) => console.log("❌ WebView 에러", e.nativeEvent)}
            onHttpError={(e) => console.log("❌ HTTP 에러", e.nativeEvent)}
          />
        )}

        <View style={styles.buttonContainer}>
          <CircleButton iconName="list" onPress={() => navigation.navigate('LostPostList')} />
        </View>
      </View>

      <View style={styles.menuBarContainer}>
        <MenuBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </View>

      {selectedMarkerId !== null && (
        <View style={styles.detailContainer}>
          <TouchableOpacity onPress={() => setSelectedMarkerId(null)}>
            <Icon name='close' size={25} style={{ marginBottom: 10 }} color="#233b6d" />
          </TouchableOpacity>

          {loadingDetail ? (
            <ActivityIndicator size="large" color="#233b6d" />
          ) : postDetail && (
            <>
              <View style={styles.headerRow}>
                <Text style={styles.title}>{postDetail.title}</Text>
                <TouchableOpacity
                  onPress={async () => {
                  try {
                    const token = await AsyncStorage.getItem("token");
                    if (!token) return;

                    const response = await axios.post(
                      "http://13.124.71.212:8080/api/private-chats",
                      { postId: selectedMarkerId }, // 💡 전달할 postId
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );

                    if (response.data.status === "success") {
                      const { chattingRoomId, chatTitle } = response.data;

                      navigation.navigate('ChatPage', {
                        chattingRoomId,
                        chatTitle,
                      });
                    }
                  } catch (e) {
                    console.error("❌ 채팅방 생성 실패:", e);
                  }
                }}
              >
                <Text style={styles.chatButton}>채팅 보내기</Text>
              </TouchableOpacity>
              </View>

              <View style={styles.separator} />

              <View style={styles.contentRow}>
                <Image source={{ uri: postDetail.photo }} style={styles.postImage} />
                <View style={styles.descriptionBox}>
                  <Text>{postDetail.contents}</Text>
                  <View style={styles.locationContainer}>
                    <Icon name="location-sharp" size={16} color="#777" />
                    <Text style={{ marginLeft: 5, fontSize: 14, color: '#777' }}>{postDetail.place}</Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    flex: 1,
  },
  menuBarContainer: {
    marginTop: 'auto',
    zIndex: 1,
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
