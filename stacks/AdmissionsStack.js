import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import Admissions from '../Screens/Admissions';
const Stack = createStackNavigator();
export default class AdmissionsStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Admissions} options={{ headerShown: false }} />

            </Stack.Navigator>
        );
    }
}