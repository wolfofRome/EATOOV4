import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import Ionicons from 'react-native-vector-icons/Ionicons';

import PostCard from '../components/PostCard';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import { AuthContext } from '../navigation/AuthProvider';
import { Container } from '../styles/FeedStyles';

const FavoriteScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const fetchPosts = async () => {
    try {
      const list = [];
      const favorites = [];

      await firestore()
        .collection('favorites')
        .where('user', '==', user.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const { post } = doc.data();
            favorites.push(post);
          })
        })

      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {
          // console.log('Total Posts: ', querySnapshot.size);
          querySnapshot.forEach(async (doc) => {
            if (favorites.includes(doc.id)) {
              const {
                userId,
                catalog,
                location,
                day,
                postImg,
                postTime,
                recipient,
                text,
                time,
                title,
                likes,
                comments,
              } = doc.data();
              list.push({
                id: doc.id,
                userId,
                catalog,
                location,
                day,
                postTime,
                postImg,
                liked: false,
                likes,
                comments,
                recipient,
                text,
                title,
                time
              });
            }
          });
        });

      setPosts(list);

      if (loading) {
        setLoading(false);
      }

      console.log('Posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
    setDeleted(false);
  }, [deleted]);

  const handleDelete = (postId) => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      { cancelable: false },
    );
  };

  const deletePost = (postId) => {
    console.log('Current Post Id: ', postId);

    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const { postImg } = documentSnapshot.data();

          if (postImg != null) {
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted successfully.`);
                deleteFirestoreData(postId);
              })
              .catch((e) => {
                console.log('Error while deleting the image. ', e);
              });
            // If the post image is not available
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  };

  const deleteFirestoreData = (postId) => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert(
          'Post deleted!',
          'Your post has been deleted successfully!',
        );
        setDeleted(true);
      })
      .catch((e) => console.log('Error deleting posst.', e));
  };

  const ListHeader = () => {
    return null;
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ alignItems: 'center' }}>
          <SkeletonPlaceholder>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 60, height: 60, borderRadius: 50 }} />
              <View style={{ marginLeft: 20 }}>
                <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                <View
                  style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                />
              </View>
            </View>
            <View style={{ marginTop: 10, marginBottom: 30 }}>
              <View style={{ width: 300, height: 20, borderRadius: 4 }} />
              <View
                style={{ marginTop: 6, width: 250, height: 20, borderRadius: 4 }}
              />
              <View
                style={{ marginTop: 6, width: 350, height: 200, borderRadius: 4 }}
              />
            </View>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 60, height: 60, borderRadius: 50 }} />
              <View style={{ marginLeft: 20 }}>
                <View style={{ width: 120, height: 20, borderRadius: 4 }} />
                <View
                  style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
                />
              </View>
            </View>
            <View style={{ marginTop: 10, marginBottom: 30 }}>
              <View style={{ width: 300, height: 20, borderRadius: 4 }} />
              <View
                style={{ marginTop: 6, width: 250, height: 20, borderRadius: 4 }}
              />
              <View
                style={{ marginTop: 6, width: 350, height: 200, borderRadius: 4 }}
              />
            </View>
          </SkeletonPlaceholder>
        </ScrollView>
      ) : (
        <Container>
          <FlatList
            data={posts}
            style={{ width: '100%' }}
            renderItem={({ item }) => (
              <PostCard
                item={item}
                onDelete={handleDelete}
                onPress={() =>
                  navigation.navigate('HomeProfile', { userId: item.userId })
                }
              />
            )}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={ListHeader}
            ListFooterComponent={ListHeader}
            showsVerticalScrollIndicator={false}
          />
        </Container>
      )}
    </SafeAreaView>
  );
};

export default FavoriteScreen;
