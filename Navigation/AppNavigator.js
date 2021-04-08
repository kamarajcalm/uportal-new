import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {
    NavigationContainer, DefaultTheme,
    DarkTheme,} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import HomeStack from '../stacks/HomeStack';
import MediaStack from '../stacks/MediaStack';
import LottieView from 'lottie-react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import MyTabBar from '../components/MyTabBar';
import QuestionPapersStack from '../stacks/QuestionPapersStack';
import SportsStacks from '../stacks/SportsStacks';
import Admissions from '../Screens/Admissions';
import AdmissionsStack from '../stacks/AdmissionsStack';
import { Appearance, useColorScheme } from 'react-native-appearance';
const Tab = createBottomTabNavigator();
export default function AppNavigator () {
    const colorScheme = useColorScheme();
    return (
        <NavigationContainer >
            <Tab.Navigator 
                tabBar={props => <MyTabBar {...props} />}
            >
                <Tab.Screen name="universal" component={HomeStack} 
                   
                
                />
                <Tab.Screen name="Media" component={MediaStack} 
             
                
                />
                <Tab.Screen name="QuestionPapers" component={QuestionPapersStack} 
                  
                
                />
                <Tab.Screen name="Sports" component={SportsStacks} 
                 
                
                />
                <Tab.Screen name="Admissions" component={AdmissionsStack}
                 

                />
            </Tab.Navigator>
        </NavigationContainer>
    );
  
}
