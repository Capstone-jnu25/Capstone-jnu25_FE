import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { TabProps } from '../types';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const TheOtherPersonPage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.mainContainer}>
            <View style={styles.head}>
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                    <Icon name='arrow-back' size={25} style={{ marginTop: 16, marginBottom: 10 }} color="#233b6d" />
                </TouchableOpacity>
                <View style={styles.backgroundCard}>
                    <View style={styles.profileWrapper}>
                        <View style={styles.profileContainer}>
                            <Image source={require('../assets/profile.png')} style={styles.profileImage} />
                        </View>
                    </View>
                <View style={styles.contentContainer}>
                    <View style={styles.cardContainer}>
                        <Text style={styles.nickname}>닉네임</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.likeButton}>
                            <Icon name='thumbs-up' size={20} color='#000' />
                            <Text style={styles.likeText}>24</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dislikeButton} onPress={() => setModalVisible(true)}>
                            <Icon name='thumbs-down' size={20} color='#000' />
                            <Text style={styles.dislikeText}>02</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </View>
            <Modal
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Icon name='close' size={25} color='#233b6d' />
                        </TouchableOpacity>
                        <View style={styles.modalHeader}>
                            <Image source={require('../assets/profile.png')} style={styles.modalProfileImage} />
                            <Text style={styles.modalText}>이 학생을 비추천하시겠습니까?</Text>
                        </View>
                        <TouchableOpacity style={styles.confirmButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.confirmButtonText}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor : '#C6E4FF',
    },
    head:{
        flex:1,
        padding:20,
    },
    contentContainer: {
        alignItems:'center'
    },
    backgroundCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        paddingTop: 140,
        marginTop: 180,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    profileWrapper: {
        position: 'absolute',
        top: -100,
        alignItems: 'center',
        zIndex: 10,
    },
    profileContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: '#95CEFF',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#95CEFF',
        paddingVertical: 10,
        paddingHorizontal: 40,
        marginBottom: 30,
    },
    nickname: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 20,
    },
    likeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#95CEFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    dislikeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#95CEFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    likeText: {
        fontSize: 18,
        marginLeft: 10,
        color: '#000',
    },
    dislikeText: {
        fontSize: 18,
        marginLeft: 10,
        color: '#000',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#ffffff',
        borderRadius:30,
        padding: 20,
        alignItems: 'center',
        marginBottom: 30,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalProfileImage: {
        width: 50,
        height: 50,
        borderRadius: 30,
        marginRight: 10,
        borderWidth: 2,
        borderColor: '#95CEFF',
    },
    modalText: {
        fontSize: 18,
        color: '#555',
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    confirmButton: {
        backgroundColor: '#233b6d',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
    },
    confirmButtonText: {
        color: '#ffffff',
        fontSize: 18,
    },
});

export default TheOtherPersonPage;