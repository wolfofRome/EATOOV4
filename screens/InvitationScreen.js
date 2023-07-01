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
  InvitationSection,
  InfoText,
  Location,
  Time,
  ButtonContainer,
  FilterContainer,
  ControlContainer,
  InvitationContainer
} from '../styles/MessageStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Messages = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../assets/users/user-3.jpg'),
    location: "VOIX",
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../assets/users/user-1.jpg'),
    location: 'Home',
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../assets/users/user-4.jpg'),
    location: 'ANNOVA',
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../assets/users/user-6.jpg'),
    location: 'ANNOVA',
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../assets/users/user-7.jpg'),
    location: 'ANNOVA',
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

const MessagesScreen = ({ navigation }) => {

  const [showAll, setShowAll] = useState(false);

  const showInvitationDetail = (invitation) => {
    console.log("showInvitationDetail");

  }

  const showSearchDialog = () => {
    console.log('showSearchDialog');
  }

  const showUnreadInvitation = () => {
    setShowAll(false);
  }

  const showAllInvitation = () => {
    setShowAll(true);
  }

  return (
    <Container>
      <FilterContainer>
        <Pressable onPress={() => { navigation.navigate('Messages') }}>
          <Ionicons
            name="newspaper-outline"
            color='#1b9b9b'
            size={40}
          />
        </Pressable>
        <Pressable onPress={() => { showUnreadInvitation() }} style={{marginLeft: 20}}>
          <Text style={showAll ? styles.unselectedFilter : styles.selectedFilter}>
            Unread
          </Text>
        </Pressable>
        <Pressable onPress={() => { showAllInvitation() }} style={{marginLeft: 20}}>
          <Text style={showAll ? styles.selectedFilter : styles.unselectedFilter}>
            History
          </Text>
        </Pressable>
      </FilterContainer>
      <FlatList
        data={Messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card onPress={() => showInvitationDetail(item)}>
            <UserInfo>
              <UserImgWrapper onPress={() => {
                navigation.navigate("HomeProfile", { item });
              }}>
                <UserImg source={item.userImg} />
              </UserImgWrapper>
              <InvitationSection>
                <UserInfoText>
                  <UserName>{item.userName}</UserName>
                </UserInfoText>
                <InfoText>
                  <Location>{`Location:${item.location}`}</Location>
                  <Time>{`Time: ${item.messageTime}`}</Time>
                </InfoText>
                <MessageText numberOfLines={1}>{item.messageText}</MessageText>
              </InvitationSection>
              <InvitationContainer>

              </InvitationContainer>
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
