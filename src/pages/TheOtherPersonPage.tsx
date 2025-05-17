import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TabProps } from '../types';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const TheOtherPersonPage: React.FC<TabProps> = ({ currentTab, setCurrentTab }) => {
    const navigation = useNavigation();
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
                        <TouchableOpacity style={styles.dislikeButton}>
                            <Icon name='thumbs-down' size={20} color='#000' />
                            <Text style={styles.dislikeText}>02</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </View>
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
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
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
});

export default TheOtherPersonPage;