import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { NaverMapView, NaverMapMarkerOverlay, Camera } from '@mj-studio/react-native-naver-map';
import Icon from 'react-native-vector-icons/Ionicons';

interface MapSelectModalProps {
    visible: boolean;
    onClose: () => void;
}

const INITIAL_CAMERA: Camera = {
    latitude: 37.5666102,
    longitude: 126.9783881,
    zoom: 16,
};

const ModalWithMap: React.FC<MapSelectModalProps> = ({ visible, onClose }) => {
    const [markerPosition, setMarkerPosition] = useState({
        latitude: 37.5666102,
        longitude: 126.9783881,
    });

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Icon name="close" size={24} color="#233b6d" />
                    </TouchableOpacity>

                    <Text style={styles.title}>습득/분실한 위치를 눌러주세요</Text>

                     <NaverMapView
                        style={styles.map}
                        isShowCompass={true}
                        isShowScaleBar={false}
                        isShowZoomControls={false}
                        isShowIndoorLevelPicker={false}
                        isIndoorEnabled={true}
                        isNightModeEnabled={false}
                        isExtentBoundedInKorea={true}
                        isShowLocationButton={false}
                        isScrollGesturesEnabled={true}
                        isZoomGesturesEnabled={true}
                        isTiltGesturesEnabled={true}
                        isRotateGesturesEnabled={true}
                        isStopGesturesEnabled={true}
                        onTapMap={(e) => {
                            setMarkerPosition({
                                latitude: e.latitude,
                                longitude: e.longitude,
                            });

                        }}
                    >
                        <NaverMapMarkerOverlay
                            latitude={markerPosition.latitude}
                            longitude={markerPosition.longitude}
                            image={require('../assets/Marker.png')}
                            width={30}
                            height={40}
                        />
                    </NaverMapView>

                    <TouchableOpacity style={styles.confirmButton} onPress={()=>{}}>
                        <Text style={styles.confirmButtonText}>확인</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalContent: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 30,
        paddingVertical: 20,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginRight: 20,
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#777',
    },
    map: {
        width: '100%',
        height: 300,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 20,
    },
    confirmButton: {
        backgroundColor: '#233b6d',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 40,
        marginBottom: 20,
    },
    confirmButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ModalWithMap;
