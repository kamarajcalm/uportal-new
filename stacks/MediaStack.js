import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import Media from '../Screens/Media';
const Stack = createStackNavigator();
export default class MediaStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Media} options={{ headerShown: false }} />

            </Stack.Navigator>
        );
    }
}
