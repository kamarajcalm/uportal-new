import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather } from '@expo/vector-icons';

export default class MyTabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

    icon = (label, isFocused) => {
        if (label == "universal") {
            return (
                <Entypo name="globe" size={20} color={isFocused?"black":"gray"}/>
            )
        }
        if(label == "Media"){
            return (
                <MaterialIcons name="perm-media" size={20} color={isFocused ? "black" : "gray"}/>
            )
        }
         if (label == "QuestionPapers") {
             return (
                 <FontAwesome name="newspaper-o" size={20} color={isFocused ? "black" : "gray"} />
             )
         }
         if (label == "Sports") {
             return (
                 <MaterialCommunityIcons name="tennis" size={20} color={isFocused ? "black" : "gray"} />
             )
         }
         if (label == "Admissions") {
             return (
                 <FontAwesome name="institution" size={20} color={isFocused ? "black" : "gray"} />
             )
         }
    }
  render() {
      const { state, descriptors, navigation} =this.props
    return (
      <View style={{backgroundColor:"#fff",height:50,flexDirection:"row"}}>
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
                       
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 0.2, alignItems: "center", justifyContent: "center", borderTopWidth:isFocused?5:0,borderColor:'black' }}
                    >
                        {
                            this.icon(label,isFocused)
                        }
                        <Text style={[{ color: isFocused ? 'black' : 'gray', fontFamily: "openSans", fontSize: label =="QuestionPapers"?10:12}, styles.text]}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    text:{
      fontFamily:"openSans",
      lineHeight: 22,
      fontWeight:'bold'
    }, 
})