import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import Media from '../Screens/Media';
import VideoPlayer from '../MediaScreens/VideoPlayer';
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
                <Stack.Screen name="Media" component={Media} options={{ headerShown: false }} />
                <Stack.Screen name="VideoPlayer" component={VideoPlayer} options={{ headerShown: false }} />

            </Stack.Navigator>
        );
    }
}
