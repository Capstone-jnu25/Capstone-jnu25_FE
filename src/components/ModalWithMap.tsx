import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { WebView } from 'react-native-webview';

interface MapSelectModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (coords: { latitude: number; longitude: number }) => void;
  initialCoords: { latitude: number; longitude: number }; 
}

const ModalWithMap: React.FC<MapSelectModalProps> = ({ visible, onClose, onConfirm, initialCoords }) => {
  const [markerPosition, setMarkerPosition] = useState(initialCoords);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Kakao Map</title>
        <style>
          html, body, #map { width: 100%; height: 100%; margin: 0; padding: 0; }
        </style>
        <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=a105821f449b32a10e3a1f387619d465&autoload=true"></script>
      </head>
      <body>
        <div id="map"></div>
        <script>
          const centerLat = ${initialCoords.latitude};
          const centerLng = ${initialCoords.longitude};

          const container = document.getElementById('map');
          const options = {
            center: new kakao.maps.LatLng(centerLat, centerLng),
            level: 3
          };
          const map = new kakao.maps.Map(container, options);

          const marker = new kakao.maps.Marker({
            position: map.getCenter(),
            map: map
          });

          kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
            const latlng = mouseEvent.latLng;
            marker.setPosition(latlng);
            window.ReactNativeWebView?.postMessage(JSON.stringify({
              latitude: latlng.getLat(),
              longitude: latlng.getLng()
            }));
          });

          window.ReactNativeWebView?.postMessage("✅ Kakao Map Loaded");
        </script>
      </body>
    </html>
  `

  return (
    <Modal
  transparent={false}
  visible={visible}
  animationType="slide"
  onRequestClose={onClose}
>
  <View style={styles.fullScreenModal}>
    {/* 닫기 버튼 */}
    <TouchableOpacity style={styles.closeButtonAbsolute} onPress={onClose}>
      <Icon name="close" size={24} color="#233b6d" />
    </TouchableOpacity>

    {/* 지도 WebView */}
    <WebView
      style={styles.mapFull}
      source={{ html: htmlContent }}
      originWhitelist={['*']}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      cacheEnabled={false}
      onMessage={(event) => {
        const msg = event.nativeEvent.data;
        console.log("📩 WebView 메시지:", msg);
        try {
          const parsed = JSON.parse(msg);
          setMarkerPosition(parsed);
        } catch {}
      }}
      onError={(e) => console.log("❌ WebView 에러", e.nativeEvent)}
      onHttpError={(e) => console.log("❌ HTTP 에러", e.nativeEvent)}
    />

    {/* 확인 버튼 */}
    <View style={styles.footer}>
      <Text style={styles.title}>습득/분실한 위치를 눌러주세요</Text>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => onConfirm(markerPosition)}
      >
        <Text style={styles.confirmButtonText}>확인</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

  );
};

const styles = StyleSheet.create({
  fullScreenModal: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  mapFull: {
    flex: 1,
    width: '100%',
  },
  closeButtonAbsolute: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: '#ffffff',
    padding: 5,
    borderRadius: 20,
  },
  footer: {
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#777',
  },
  confirmButton: {
    backgroundColor: '#233b6d',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginBottom: 10,
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default ModalWithMap;