import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Post = {
  id: number; // ← number도 허용
  title: string;
  content: string;
  location: string;
  image: string | { uri: string }; // ← 서버 이미지 대응
  time: string;
};

interface LostPostItemProps {
  post: Post;
  onPress: () => void;
}

const LostPostItem: React.FC<LostPostItemProps> = ({ post, onPress }) => {

   return (
    <TouchableOpacity style={styles.postItem} onPress={onPress}>
      <View style={styles.postHeader}>
        <View style={styles.textContainer}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postContent}>{post.content}</Text>
        </View>
        <Image
          source={typeof post.image === 'string' ? { uri: post.image } : post.image}
          style={styles.postImage}
        />
      </View>

      <View style={styles.postFooter}>
        <View style={styles.locationContainer}>
          <Icon name="location-sharp" size={16} color="#777" />
          <Text style={styles.locationText}>{post.location}</Text>
        </View>
        <Text style={styles.timeAgo}>{post.time}</Text>
      </View>
    </TouchableOpacity>
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
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postContent: {
    fontSize: 14,
    color: '#777',
  },
  postImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#777',
  },
  timeAgo: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default LostPostItem;
