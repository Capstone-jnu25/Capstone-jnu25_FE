import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ImageSourcePropType } from 'react-native';

export type PostData = {
  id: number;
  nickname: string;
  time: string;
  title: string;
  content: string;
  image: ImageSourcePropType;
  price: string;
  location: string;
};

const TradePostDetailItem: React.FC<{ post: PostData }> = ({ post }) => {
  return (
    <View style={styles.postItem}>
      <View style={styles.postHeader}>
        <Image 
            source={require('../assets/profile.png')} // 고정된 프로필 이미지
            style={styles.profileImage} 
          />
        <View>
          <Text style={styles.postTitle}>{post.nickname}</Text>
          <Text style={styles.postDate}>{post.time}</Text>
        </View>
        <Icon name="share-social" size={20} style={styles.iconRight} color="#233b6d"/>
        <Icon name="ellipsis-vertical" size={20} color="#233b6d"/>
      </View>

      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postContent}>{post.content}</Text>

      <Image source={ post.image } style={styles.postImage} />
      <View style={styles.locationRow}>
          <Icon name="location-sharp" size={16} color="#777" />
          <Text style={styles.locationText}>{post.location}</Text>
      </View>
      <Text style={styles.priceText}>
        {Number(post.price).toLocaleString()}원
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  postItem: {
    backgroundColor: '#fff',
    marginTop: 20,
    marginBottom: 10,
    padding: 15,
    borderRadius: 12,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postDate: {
    fontSize: 12,
    color: '#666',
  },
  iconRight: {
    marginLeft: 'auto',
    marginRight: 10,
  },
  postContent: {
    color: '#333',
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 220,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 10,
  },
  priceText: {
    fontSize: 12,
    color: '#000',
    marginTop: 5,
    marginLeft: 5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 30,
    marginRight: 5,
    borderWidth: 2,
    borderColor: '#95CEFF'
  },
});

export default TradePostDetailItem;
