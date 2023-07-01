import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Pressable } from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
  InfoText,
  Location,
  Time,
  ButtonContainer,
  FilterContainer
} from '../styles/MessageStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Messages = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../assets/users/user-3.jpg'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../assets/users/user-1.jpg'),
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../assets/users/user-4.jpg'),
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../assets/users/user-6.jpg'),
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../assets/users/user-7.jpg'),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

const MessagesScreen = ({ navigation }) => {

  const [showAll, setShowAll] = useState(false);

  const showSearchDialog = () => {
    console.log('showSearchDialog');
  }

  const showUnreadMessages = () => {
    setShowAll(false);
  }

  const showAllMessages = () => {
    setShowAll(true);
  }
  return (
    <Container>
      <FilterContainer>
        <Pressable onPress={() => { showUnreadMessages() }} style={{ marginLeft: 20 }}>
          <Text style={showAll ? styles.unselectedFilter : styles.selectedFilter}>
            Unread
          </Text>
        </Pressable>
        <Pressable onPress={() => { showAllMessages() }} style={{ marginLeft: 20 }}>
          <Text style={showAll ? styles.selectedFilter : styles.unselectedFilter}>
            History
          </Text>
        </Pressable>
      </FilterContainer>
      <FlatList
        data={Messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card onPress={() => navigation.navigate('Chat', { userName: item.userName })}>
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={item.userImg} />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.userName}</UserName>
                  <PostTime>{item.messageTime}</PostTime>
                </UserInfoText>
                <MessageText>{item.messageText}</MessageText>
              </TextSection>
            </UserInfo>
          </Card>
        )}
      />
      <ButtonContainer>
        <Pressable onPress={() => { navigation.navigate('UserSearch') }}>
          <Ionicons
            name="person-add-outline"
            color='#1b9b9b'
            size={40}
          />
        </Pressable>
        <Pressable onPress={() => { showSearchDialog() }}>
          <Ionicons
            name="search-outline"
            color='#1b9b9b'
            size={40}
          />
        </Pressable>
      </ButtonContainer>
    </Container>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedFilter: {
    color: 'white',
    backgroundColor: "#1b9b9b",
    borderRadius: 50,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 20,
    paddingLeft: 20
  },
  unselectedFilter: {
    color: '#1b9b9b',
    borderWidth: 2,
    borderColor: "#1b9b9b",
    borderRadius: 50,
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 20,
    paddingLeft: 20
  }
});
