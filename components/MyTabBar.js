import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { selectTheme, selectVideo } from '../actions';
import settings from '../appSettings';
import { Appearance, useColorScheme } from 'react-native-appearance';
const lightTheme = settings.lightTheme
const darkTheme =settings.darkTheme
 class MyTabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        showTab: true
    };
  }
componentDidMount(){
    Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
}
     componentWillUnmount() {
         Keyboard.removeListener('keyboardDidShow', this._keyboardDidShow);
         Keyboard.removeListener('keyboardDidHide', this._keyboardDidHide);
     }
     _keyboardDidShow = () => {
         this.setState({ showTab: false })
     };

     _keyboardDidHide = () => {
         this.setState({ showTab: true })
     };
    icon = (label, isFocused,theme) => {
        if (label == "universal") {
            return (
                <Entypo name="globe" size={20} color={isFocused?theme.secondaryColor:"gray"}/>
            )
        }
        if(label == "Media"){
            return (
                <MaterialIcons name="perm-media" size={20} color={isFocused ? theme.secondaryColor : "gray"}/>
            )
        }
         if (label == "QuestionPapers") {
             return (
                 <FontAwesome name="newspaper-o" size={20} color={isFocused ? theme.secondaryColor : "gray"} />
             )
         }
         if (label == "Sports") {
             return (
                 <MaterialCommunityIcons name="tennis" size={20} color={isFocused ? theme.secondaryColor : "gray"} />
             )
         }
         if (label == "Admissions") {
             return (
                 <FontAwesome name="institution" size={20} color={isFocused ? theme.secondaryColor : "gray"} />
             )
         }
        if (label == "Profile") {
            return (
                <Ionicons name="md-person-circle" size={24} color={isFocused ? theme.secondaryColor : "gray"} />
            )
        }
        if (label == "Institute") {
            return (
                <FontAwesome name="institution" size={20} color={isFocused ? theme.secondaryColor : "gray"} />
            )
        }
        if (label == "Class") {
            return (
                <MaterialCommunityIcons name="google-classroom" size={24} color={isFocused ? theme.secondaryColor : "gray"} />
            )
        }
    }
  
  render() {
      let theme
      const { state, descriptors, navigation,selectedTheme} =this.props
      if(this.props.theme =="dark"){
           theme = darkTheme 
      }else{
          theme =lightTheme
      }
     if(this.state.showTab){
         return (
             <View style={{ backgroundColor: theme.backgroundColor, height: 50, flexDirection: "row" }}>
                 {state.routes.map((route, index) => {
                     const { options } = descriptors[route.key];
                     const label =
                         options.tabBarLabel !== undefined
                             ? options.tabBarLabel
                             : options.title !== undefined
                                 ? options.title
                                 : route.name;

                     const isFocused = state.index === index;



                     const onPress = () => {
                         const event = navigation.emit({
                             type: 'tabPress',
                             target: route.key,
                         });

                         if (!isFocused && !event.defaultPrevented) {
                             navigation.navigate(route.name);
                         }
                     };

                     const onLongPress = () => {
                         navigation.emit({
                             type: 'tabLongPress',
                             target: route.key,
                         });
                     };

                     return (
                         <TouchableOpacity
                             key={index}
                             accessibilityRole="button"
                             accessibilityStates={isFocused ? ['selected'] : []}
                             accessibilityLabel={options.tabBarAccessibilityLabel}
                             testID={options.tabBarTestID}
                             onPress={onPress}
                             onLongPress={onLongPress}
                             style={{ flex: 0.2, alignItems: "center", justifyContent: "center", borderTopWidth: isFocused ? 5 : 0, borderColor: theme.secondaryColor }}
                         >
                             {
                                 this.icon(label, isFocused, theme)
                             }
                             <Text style={[{ color: isFocused ? theme.secondaryColor : 'gray', fontFamily: "openSans", fontSize: label == "QuestionPapers" ? 10 : 12 }, styles.text]}>
                                 {label}
                             </Text>
                         </TouchableOpacity>
                     );
                 })}
             </View>
         );
     }else{
         return null
     }
    
  }
}

const styles = StyleSheet.create({
    text:{
      fontFamily:"openSans",
      lineHeight: 22,
      fontWeight:'bold'
    }, 
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,
        selectedVideo: state.selectedVideo
    }
}

export default connect(mapStateToProps, { selectTheme})(MyTabBar)