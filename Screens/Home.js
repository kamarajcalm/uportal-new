import React, { Component } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';

export default class Home extends Component {
  constructor(props) {
      
    super(props);
    this.state = {
    };
  }
  componentDidMount(){
      let colorScheme = Appearance.getColorScheme();
    
      this._schemeSubscription = Appearance.addChangeListener(({ colorScheme }) => {
         console.log(colorScheme,"ggggggg")
      });
  }

  render() {
    return (
      <View style={{flex:1,alignItems:"center",justifyContent:'center'}}> 
         <Text style={{fontFamily:"openSans"}}>Home page</Text>
      </View>
    );
  }
}
