import React, { useContext, useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostInfoView,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
} from '../styles/FeedStyles';

import ProgressiveImage from './ProgressiveImage';

import { AuthContext } from '../navigation/AuthProvider';

import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import { ScrollView, Text, View } from 'react-native';
import QuickReplies from 'react-native-gifted-chat/lib/QuickReplies';

const PostCard = ({ item, onDelete, onPress }) => {
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const [favorite, setFavorite] = useState(false);
  const [likes, setLikes] = useState(0);

  if (item.likes == 1) {
    likeText = '1 Like';
  } else if (item.likes > 1) {
    likeText = item.likes + ' Likes';
  } else {
    likeText = 'Like';
  }

  if (item.comments == 1) {
    commentText = '1 Comment';
  } else if (item.comments > 1) {
    commentText = item.comments + ' Comments';
  } else {
    commentText = 'Comment';
  }

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(item.userId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });

    await firestore()
      .collection('favorites')
      .where('post', '==', item.id)
      .get()
      .then((querySnapshot) => {
        setLikes(querySnapshot.docs.length);
        setFavorite(false);
        querySnapshot.forEach((doc) => {
          const { user: _user } = doc.data();
          if (_user === user.uid) {
            setFavorite(true);
          }
        });
      })
  };

  useEffect(() => {
    getUser();
  }, []);

  const toggleFavorite = async () => {
    console.log('toggle favorite', favorite);
    if (favorite) {
      await firestore()
        .collection('favorites')
        .where('post', '==', item.id)
        .where('user', '==', user.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs[0].ref.delete();
        })
        .catch((error) => {
          console.log('Something went wrong with delete from favorite on firestore.', error);
        });
    } else {
      await firestore()
        .collection('favorites')
        .add({
          post: item.id,
          user: user.uid
        })
        .catch((error) => {
          console.log('Something went wrong with delete from favorite on firestore.', error);
        });
    }

    await firestore()
      .collection('favorites')
      .where('post', '==', item.id)
      .get()
      .then((querySnapshot) => {
        setLikes(querySnapshot.docs.length);
        setFavorite(false);
        querySnapshot.forEach(async (doc) => {
          const { user } = doc.data();
          console.log()
          if (user === user.uid) {
            setFavorite(true);
          }
        });
      })
    setFavorite(!favorite);
  }

  const sendComment = () => {

  }

  return (
    <Card key={item.id}>
      <UserInfo>
        <TouchableOpacity onPress={onPress}>
          <UserImg
            source={{
              uri: userData
                ? userData.userImg ||
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
                : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
            }}
          />
        </TouchableOpacity>
        <UserInfoText>
          <UserName>
            {userData?.name}
          </UserName>
          <Text numberOfLines={1} ellipsizeMode='tail'>{`Location: ${item.location} Time: ${item.time} Recipient: ${item.recipient} Pay: ${item.pay}`}</Text>

          <PostText numberOfLines={1} ellipsizeMode='tail'>{item.text}</PostText>
        </UserInfoText>
      </UserInfo>
      {/* {item.postImg != null ? <PostImg source={{uri: item.postImg}} /> : <Divider />} */}
      {item.postImg != null ? (
        <ProgressiveImage
          defaultImageSource={require('../assets/default-img.jpg')}
          source={{ uri: item.postImg }}
          style={{ width: '100%', height: 250 }}
          resizeMode="cover"
        />
      ) : (
        <Divider />
      )}

      <PostInfoView>
        <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
        <InteractionWrapper>
          <Interaction active={favorite} onPress={() => { toggleFavorite() }}>
            <InteractionText active={favorite}>{!likes ? 0 : likes}</InteractionText>
            <Ionicons name={favorite ? 'heart' : 'heart-outline'} size={20} color={favorite ? '#2e64e5' : '#333'} />
          </Interaction>
          <Interaction onPress={() => { sendComment() }}>
            <InteractionText>{!item.comments ? 0 : item.comments}</InteractionText>
            <Ionicons name="md-chatbubble-outline" size={20} />
          </Interaction>

          {/* {user.uid == item.userId ? (
            <Interaction onPress={() => onDelete(item.id)}>
              <Ionicons name="md-trash-bin" size={25} />
            </Interaction>
          ) : null} */}
        </InteractionWrapper>
      </PostInfoView>
    </Card>
  );
};

export default PostCard;
