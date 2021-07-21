import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/Home';
import Admissions from '../Screens/Admissions';
import ViewInstitute from '../pages/AdmissionPages/ViewInstitute';
import { TransitionSpecs, CardStyleInterpolators} from '@react-navigation/stack';
import FormDetails from '../pages/AdmissionPages/FormDetails';
const Stack = createStackNavigator();
export default class AdmissionsStack extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
    
        return (
            <Stack.Navigator 
             screenOptions={{
                 transitionSpec:{
                     open: TransitionSpecs.TransitionIOSSpec,
                     close: TransitionSpecs.TransitionIOSSpec,
                  },
                  cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS
              
            }}
            >
                <Stack.Screen name="Home" component={Admissions} options={{ headerShown: false }} />
                <Stack.Screen name="ViewInstitute" component={ViewInstitute} options={{ headerShown: false }} />
                <Stack.Screen name="FormDetails" component={FormDetails} options={{ headerShown: false }} />

            </Stack.Navigator>
        );
    }
}