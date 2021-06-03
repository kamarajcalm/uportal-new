import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import InstituteWall from '../Screens/InstituteWall';
import ClassWall from '../ClassScreens/ClassWall';
const Stack = createStackNavigator();
export default class ClassStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="ClassWall" component={ClassWall} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }
}