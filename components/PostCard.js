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

const PostCard = ({ item, onDelete, onPress }) => {
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  likeIcon = item.liked ? 'heart' : 'heart-outline';
  likeIconColor = item.liked ? '#2e64e5' : '#333';

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
  };

  useEffect(() => {
    getUser();
  }, []);

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
          <Interaction active={item.liked}>
            <InteractionText active={item.liked}>{!item.likes ? 0 : item.likes}</InteractionText>
            <Ionicons name={likeIcon} size={20} color={likeIconColor} />
          </Interaction>
          <Interaction>
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
