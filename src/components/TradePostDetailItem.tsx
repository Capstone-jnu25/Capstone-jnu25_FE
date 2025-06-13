import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ImageSourcePropType } from 'react-native';

export type PostData = {
  userId: number;
  id: number;
  nickname: string;
  time: string;
  title: string;
  content: string;
  image: ImageSourcePropType;
  price: string;
  location: string;
  onProfilePress: () => void;
};

const TradePostDetailItem: React.FC<{ post: PostData }> = ({ post }) => {
  return (
    <View style={styles.postItem}>
      <View style={styles.postHeader}>
            <Image 
              source={require('../assets/profile.png')}
              style={styles.profileImage} 
            />
            <View>
              <TouchableOpacity onPress={post.onProfilePress}>
                  <Text style={styles.postTitle}>{post.nickname}</Text>
              </TouchableOpacity>
          <Text style={styles.postDate}>{post.time}</Text>
        </View>
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
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 30,
    marginRight: 5,
    borderWidth: 2,
    borderColor: '#95CEFF'
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
});

export default TradePostDetailItem;
