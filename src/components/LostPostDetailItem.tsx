import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ImageSourcePropType } from 'react-native';

export type PostData = {
  id: number;
  nickname: string;
  date: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
  location: string;
};

const LostPostDetailItem: React.FC<{ post: PostData }> = ({ post }) => {
  return (
    <View style={styles.postItem}>
      <View style={styles.postHeader}>
        <View style={styles.profileCircle} />
        <View>
          <Text style={styles.postTitle}>{post.nickname}</Text>
          <Text style={styles.postDate}>{post.date}</Text>
        </View>
        <Icon name="share-social-outline" size={20} style={styles.iconRight} />
        <Icon name="ellipsis-vertical" size={20} />
      </View>

      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postContent}>{post.description}</Text>

      <Image source={ post.image } style={styles.postImage} />

      <View style={styles.locationRow}>
        <Icon name="location-outline" size={16} color="#888" />
        <Text style={styles.locationText}>{post.location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postItem: {
    backgroundColor: '#fff',
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
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
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

export default LostPostDetailItem;
