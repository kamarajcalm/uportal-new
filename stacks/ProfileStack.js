import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import Media from '../Screens/Media';
import Sports from '../Screens/Sports';
import Profile from '../profileScreens/Profile';
import Statistics from '../profileScreens/Statistics';
const Stack = createStackNavigator();
export default class ProfileStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                <Stack.Screen name="Statistics" component={Statistics} options={{ headerShown: false }} />

            </Stack.Navigator>
        );
    }
}