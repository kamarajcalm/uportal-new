import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import InstituteWall from '../Screens/InstituteWall';
const Stack = createStackNavigator();
export default class InsituteStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="InsituteWall" component={InstituteWall} options={{ headerShown: false }} />

            </Stack.Navigator>
        );
    }
}