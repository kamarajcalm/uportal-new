import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, StatusBar, Platform} from 'react-native';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import settings from '../appSettings';
const fontFamily = settings.fontFamily
const width = Dimensions.get('screen').width
const height = Dimensions.get("window").height
const screenHeight = Dimensions.get("screen").height
const lightTheme = settings.lightTheme
const darkTheme = settings.darkTheme
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import VideoPlayer from 'expo-video-player'
 class Media extends React.PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      fullScreen:false
    };
  }
   onFullscreenUpdate = async ({fullscreenUpdate}) => {
     this.setState({ fullScreen:!this.state.fullScreen},async()=>{
       if (this.state.fullScreen) {
        return await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
       }else{
        return await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
       }
     
     })
    
    
  
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
          <View style={{ flex: 1, backgroundColor: this.props.theme == "dark" ? "#333" : "#fff"}}>
            <Video
            style={{height,width}}
              ref={ref=>this.video=ref}
              shouldPlay={true}
              source={{ uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }}
              resizeMode={"contain"}
              useNativeControls={true}
              onFullscreenUpdate={this.onFullscreenUpdate}
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