import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types';

type Post = {
  id: string;
  title: string;
  content: string;
  price: string;
  image: any;
  time: string;
};

interface TradePostItemProps {
  post: Post;
}

const TradePostItem: React.FC<TradePostItemProps> = ({ post }) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity style={styles.postItem} onPress={() => navigation.navigate('TradePostDetail')}>
      <View style={styles.postHeader}>
        <View style={styles.textContainer}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postContent}>{post.content}</Text>
        </View>
        <Image source={post.image} style={styles.postImage} />
      </View>

      <View style={styles.postFooter}>
        
        <Text style={styles.priceText}>{post.price}</Text>
        
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
  priceText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#777',
  },
  timeAgo: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default TradePostItem;
