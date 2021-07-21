import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
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
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import ProfileStack from '../stacks/ProfileStack';
const Tab = createBottomTabNavigator();


import TabNavigator from '../components/TabNavigator';
import DefaultScreen from '../Screens/DefaultScreen';
const Stack = createStackNavigator();
 class AppNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
        login:true
    };
  }
     getTheme = async()=>{
        // let theme = await AsyncStorage.getItem("theme")
        let theme = Appearance.getColorScheme()
        console.log(theme,"ppppppppp")
        this.props.selectTheme(theme)
     }
  componentDidMount(){

      this._schemeSubscription = Appearance.addChangeListener(({ colorScheme }) => {
       
          console.log(colorScheme, "pppp");
          this.props.selectTheme(colorScheme)
      });
      this.getTheme()
  }
  
  render() {
      return (
          <NavigationContainer >
              <Stack.Navigator>
                  <Stack.Screen name="DefaultScreen" component={DefaultScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false }} />
              </Stack.Navigator>
          </NavigationContainer>
      );
  }
}
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,

    }
}
export default connect(mapStateToProps, { selectTheme })(AppNavigator)