import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import AppLoading from 'expo-app-loading';

// Context
import { AudioProvider } from './src/context/AudioContext';
import { PlantProvider } from './src/context/PlantContext';

// Tip tanımları
import { RootStackParamList } from './src/navigation/types';

// Ekranlar
import HomeScreen from './src/screens/home/HomeScreen';
import GameScreen from './src/screens/games/GameScreen';
import CardMatchingGame from './src/screens/games/CardMatchingGame';
import QuizGame from './src/screens/games/QuizGame';
import PlantCareGame from './src/screens/games/PlantCareGame';
import CollectionScreen from './src/screens/collection/CollectionScreen';
import PlantIdentifier from './src/screens/plant/PlantIdentifier';

// Tab Navigator ve Stack Navigator oluşturma
const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createStackNavigator<RootStackParamList>();
const MainStack = createStackNavigator<RootStackParamList>();

// Oyun ekranları için stack navigator
function GameStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        presentation: 'card', 
        animationTypeForReplace: 'push', 
      }}
    >
      <Stack.Screen name="Games" component={GameScreen} />
      <Stack.Screen name="CardMatchingGame" component={CardMatchingGame} />
      <Stack.Screen name="QuizGame" component={QuizGame} />
      <Stack.Screen name="PlantCareGame" component={PlantCareGame} />
    </Stack.Navigator>
  );
}

// Tab Navigator 
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 70,
          paddingTop: 5,
          paddingBottom: 10,
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 10
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          paddingBottom: 5,
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#95a5a6',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Ana Sayfa',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: focused ? 'rgba(76, 175, 80, 0.15)' : 'transparent',
              width: 40,
              height: 40,
              borderRadius: 20,
            }}>
              <Ionicons name="home" color={color} size={24} />
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="Games" 
        component={GameStack} 
        options={{
          tabBarLabel: 'Oyunlar',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: focused ? 'rgba(76, 175, 80, 0.15)' : 'transparent',
              width: 40,
              height: 40,
              borderRadius: 20,
            }}>
              <Ionicons name="game-controller" color={color} size={24} />
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="Collection" 
        component={CollectionScreen} 
        options={{
          tabBarLabel: 'Koleksiyon',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: focused ? 'rgba(76, 175, 80, 0.15)' : 'transparent',
              width: 40,
              height: 40,
              borderRadius: 20,
            }}>
              <Ionicons name="leaf" color={color} size={24} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Ana bileşen
export default function App() {
  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <PlantProvider>
        <AudioProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <MainStack.Navigator screenOptions={{ headerShown: false }}>
              <MainStack.Screen name="Main" component={TabNavigator} />
              <MainStack.Screen name="PlantIdentifier" component={PlantIdentifier} />
            </MainStack.Navigator>
          </NavigationContainer>
        </AudioProvider>
      </PlantProvider>
    </SafeAreaProvider>
  );
}