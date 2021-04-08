import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import Media from '../Screens/Media';
import QuestionPapers from '../Screens/QuestionPapers';
const Stack = createStackNavigator();
export default class QuestionPapersStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={QuestionPapers} options={{ headerShown: false }} />

            </Stack.Navigator>
        );
    }
}