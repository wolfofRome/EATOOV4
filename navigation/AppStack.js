import React from 'react';
import { View, TouchableOpacity, Text, Button, Pressable } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddPostScreen from '../screens/AddPostScreen';
import MessagesScreen from '../screens/MessagesScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import InvitationScreen from '../screens/InvitationScreen';
import UserSearchScreen from '../screens/UserSearchScreen';
import FavoriteScreen from '../screens/FavoriteScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = ({ navigation }) => (
  <Stack.Navigator
    headerMode='screen'
    screenOptions={{
      headerStyle: {
        backgroundColor: '#ed297b',
      },
      headerTitleStyle: {
        height: 50,
        fontWeight: 'bold',
      },
    }}>
    <Stack.Screen
      name="HomePage"
      component={HomeScreen}
      options={{
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <Ionicons
              name="mail-outline"
              size={40}
              color="white"
              onPress={() => navigation.navigate('Invitation')}
            />
          </View>
        ),
        headerLeft: () => (
          <View style={{ marginLeft: 10 }}>
            <Ionicons
              name="person-circle-outline"
              size={40}
              color="white"
              onPress={() => navigation.navigate('EditProfile')}
            />
          </View>
        ),
        headerTitle: () => (
          <View style={{ marginLeft: 10, alignItems: 'center' }}>
            <Pressable
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 6,
                paddingHorizontal: 32,
                borderRadius: 5,
                borderColor: 'black',
                borderWidth: 2,
                elevation: 3,
                backgroundColor: 'white',
                size: 20,
              }}
            >
              <Text style={{
                fontSize: 20,
                color: 'black'
              }}>EAT</Text></Pressable>

          </View>
        )
      }}
    />
    <Stack.Screen
      name="HomeProfile"
      component={ProfileScreen}
      options={{
        headerTitle: "PROFILE",
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold'
        },
        headerLeft: () => (
          <View style={{ marginLeft: 10 }}>
            <Ionicons
              name="person-circle-outline"
              size={40}
              color="#1b9b9b"
            />
          </View>
        ),
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <Ionicons
              name="home-outline"
              size={40}
              color="white"
              onPress={() => navigation.navigate('HomePage')}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        headerTitle: "Profile",
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold'
        },
        headerLeft: () => (
          <View style={{ marginLeft: 10 }}>
            <Ionicons
              name="person-circle-outline"
              size={40}
              color="#1b9b9b"
            />
          </View>
        ),
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <Ionicons
              name="home-outline"
              size={40}
              color="white"
              onPress={() => navigation.navigate('HomePage')}
            />
          </View>
        ),
      }}
    />
    <Stack.Screen name="Messages" component={MessagesScreen}
      options={{
        headerTitle: "Messages",
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold'
        },
        headerLeft: () => (
          <View style={{ marginLeft: 10 }}>
            <Ionicons
              name="home-outline"
              size={40}
              color="white"
              onPress={() => navigation.navigate('HomePage')}
            />
          </View>
        ),
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <Ionicons
              name="mail-outline"
              size={40}
              color="#1b9b9b"
            />
          </View>
        ),
      }} />
    <Stack.Screen name="Invitation" component={InvitationScreen}
      options={{
        headerTitle: "INVITATION",
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold'
        },
        headerLeft: () => (
          <View style={{ marginLeft: 10 }}>
            <Ionicons
              name="home-outline"
              size={40}
              color="white"
              onPress={() => navigation.navigate('HomePage')}
            />
          </View>
        ),
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <Ionicons
              name="mail-outline"
              size={40}
              color="#1b9b9b"
            />
          </View>
        ),
      }} />
    <Stack.Screen name="UserSearch" component={UserSearchScreen}
      options={{
        headerTitle: "Connect",
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold'
        },
        headerLeft: () => (
          <View style={{ marginLeft: 10 }}>
            <Ionicons
              name="home-outline"
              size={40}
              color="white"
              onPress={() => navigation.navigate('HomePage')}
            />
          </View>
        ),
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <Ionicons
              name="mail-outline"
              size={40}
              color="#1b9b9b"
            />
          </View>
        ),
      }} />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({ route }) => ({
        title: route.params.userName,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold'
        },
        headerLeft: () => (
          <View style={{ marginLeft: 10 }}>
            <Ionicons
              name="home-outline"
              size={40}
              color="white"
              onPress={() => navigation.navigate('HomePage')}
            />
          </View>
        ),
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <Ionicons
              name="mail-outline"
              size={40}
              color="#1b9b9b"
            />
          </View>
        ),
      })}
    />
  </Stack.Navigator>
);

const SearchStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="AddPost"
      component={AddPostScreen}
      options={{
        headerTitle: "POST",
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold'
        },
        headerLeft: () => (
          <View style={{ marginLeft: 10 }}>
            <Ionicons
              name="arrow-back"
              size={30}
              color="white"
              onPress={() => navigation.navigate('HomePage')}
            />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const PostStack = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#ed297b',
      },
      headerTitleStyle: {
        height: 50,
        fontWeight: 'bold',
      },
    }}>
    <Stack.Screen
      name="AddPost"
      component={AddPostScreen}
      options={{
        headerTitle: "POST",
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold'
        },
        headerLeft: () => (
          <View style={{ marginLeft: 10 }}>
            <Ionicons
              name="arrow-back"
              size={30}
              color="white"
              onPress={() => navigation.navigate('HomePage')}
            />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const FavoriteStack = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#ed297b',
      },
      headerTitleStyle: {
        height: 50,
        fontWeight: 'bold',
      },
    }}>
    <Stack.Screen
      name="FavoritePage"
      component={FavoriteScreen}
      options={{
        headerTitle: "FAVORITE",
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold'
        },
        headerLeft: () => (
          <View style={{ marginLeft: 10 }}>
            <Ionicons
              name="arrow-back"
              size={30}
              color="white"
              onPress={() => navigation.navigate('HomePage')}
            />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';

    if (routeName === "HomePage" ||
      routeName === "Home" ||
      routeName === "Search" ||
      routeName === "Post" ||
      routeName === "Favorite" ||
      routeName === "") {
      return true;
    }
    return false;
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#1b9b9b',
        inactiveTintColor: 'white',
        style: {
          backgroundColor: '#ed297b',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={FeedStack}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarLabel: 'Home',
          unmountOnBlur: true,
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          // Or Hide tabbar when push!
          // https://github.com/react-navigation/react-navigation/issues/7677
          // tabBarVisible: route.state && route.state.index === 0,
          // tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="search-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Post"
        component={PostStack}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
          // Or Hide tabbar when push!
          // https://github.com/react-navigation/react-navigation/issues/7677
          // tabBarVisible: route.state && route.state.index === 0,
          // tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="paper-plane-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteStack}
        options={({ route }) => ({
          unmountOnBlur: true,
          tabBarVisible: getTabBarVisibility(route),
          // tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          )
        })
        }
      />
    </Tab.Navigator>
  );
};

export default AppStack;
