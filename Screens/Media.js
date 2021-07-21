import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, StatusBar, Platform, FlatList, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import settings from '../appSettings';
const fontFamily = settings.fontFamily
const width = Dimensions.get('screen').width
const height = Dimensions.get("window").height
const screenHeight = Dimensions.get("screen").height
const lightTheme = settings.lightTheme
const darkTheme = settings.darkTheme
import data from '../data/Videos';
 class Media extends React.PureComponent{
  constructor(props) {
    super(props);
    this.state = {
  
    };
  }

  render() {
    let theme;
    if (this.props.theme == "dark") {
      theme = darkTheme
    } else {
      theme = lightTheme
    }
    return (
      <>
        <StatusBar backgroundColor={theme.backgroundColor} barStyle={this.props.theme == "dark" ? "light-content" : "dark-content"} />
        <SafeAreaView style={[styles.topSafeArea, { backgroundColor: theme.backgroundColor }]} />
        <SafeAreaView style={[styles.bottomSafeArea, { backgroundColor: theme.backgroundColor }]}>
          <View style={{backgroundColor: this.props.theme == "dark" ? "#333" : "#fff",flex:1}}>
            <FlatList 
              data={data}
              keyExtractor={(item,index)=>index.toString()}
              renderItem={({item,index})=>{
                return(
                  <TouchableOpacity 
                    
                    onPress={()=>{this.props.navigation.navigate('VideoPlayer',{uri:item.uri})}}
                    style={{height:height*0.2,width:width,marginTop:20}}
                  >
                   <Image 
                     style={{height:"100%",width:'100%'}}
                     resizeMode="cover"
                     source={{uri:item.img}}
                   />
                  </TouchableOpacity>
                )
              }}
            />
          </View>
        </SafeAreaView>
      </>
    );
  }
}
const styles= StyleSheet.create({
  text: {
    fontFamily
  },
  topSafeArea: {
    flex: 0,
  },
  bottomSafeArea: {
    flex: 1,

  },
})
const mapStateToProps = (state) => {
 
  return {
    theme: state.selectedTheme,

  }
}
export default connect(mapStateToProps, { selectTheme })(Media)