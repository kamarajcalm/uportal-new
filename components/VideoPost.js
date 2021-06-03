import React, { Component } from 'react';
import { View, Text, Dimensions, Image ,StyleSheet,TouchableOpacity} from 'react-native';
import { Entypo, AntDesign, FontAwesome5, FontAwesome, Feather, EvilIcons, MaterialCommunityIcons, Octicons} from '@expo/vector-icons';

const width = Dimensions.get('window').width
const height = Dimensions.get("window").height
const cellHeight = height * 0.6;
const cellWidth = width;
const viewabilityConfig = {
    itemVisiblePercentThreshold: 80,
};
import settings from '../appSettings';
import * as Animatable from 'react-native-animatable';
const fontFamily = settings.fontFamily
import { Video } from 'expo-av';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const lightTheme = settings.lightTheme
const darkTheme = settings.darkTheme
export default class VideoPost extends React.PureComponent{
  constructor(props) {
    super(props);
    this.state = {
     like:false,
     muted:false,
     play:false,
     playBackStatus:null,
     totalDuration:null
    };
  }

    componentWillUnmount() {
    
     
        if (this.video) {
            this.video.unloadAsync();
         
        }
    }
    async play() {
        const status = await this.video.getStatusAsync();
     
        if (status.isPlaying) {
            return;
        }
        this.setState({ totalDuration: this.milliconverter(status.durationMillis)})
        this.setState({ play: true })
        return this.video.playAsync();
    }

    pause() {
        if (this.video) {
            this.setState({ play: false })
            this.video.stopAsync();
        }
    }
    handleMute =async()=>{
      let status = await this.video.getStatusAsync()
        if (status.isMuted){
          this.video.setIsMutedAsync(false)
          this.setState({muted:false})
      }else{
            this.video.setIsMutedAsync(true)
            this.setState({ muted: true })
      }
    }
    milliconverter = (millis) => {
        if (millis) {
            var minutes = Math.floor(millis / 60000);
            var seconds = ((millis % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
            
        }

    }
  render() {
      let {item} = this.props
      let theme
      if(this.props.theme =="dark"){
         theme =darkTheme
      }else{
          theme =lightTheme
      }
    return (
        <View style={{ height: height * 0.7 }}>
            <View style={{ height: height * 0.075, }}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: 'center' }}>
                        <Image
                            style={{ height: 50, width: 50, borderRadius: 25 }}
                            source={require('../assets/unknownPerson.jpg')}
                        />
                    </View>

                    <View style={{ marginLeft: 10, justifyContent: 'center', flex: 0.7 }}>
                        <View>
                            <Text style={[styles.text,{color:theme.TextColor}]}>Stanley</Text>
                        </View>
                        <View>
                            <Text style={[styles.text,{color:theme.TextColor}]}>PES UNIVERSITY</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ alignItems: 'center', justifyContent: "center" }}>
                                <Entypo name="back-in-time" size={15} color={theme.secondaryColor} />
                            </View>

                            <View style={{ marginLeft: 5 }}>
                                <Text style={[styles.text,{color:theme.TextColor}]} >just now</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <TouchableWithoutFeedback
             onPress={()=>{ 
                this.handleMute()
             }}
            >
                <Video
                    ref={(ref) => {
                        this.video = ref;
                    }}
                    isLooping={true}
                    onPlaybackStatusUpdate={(status) => { this.setState({ playBackStatus: this.milliconverter(status.positionMillis)})}}
                    source={{ uri: item.media }}
                    shouldPlay={false}
                    resizeMode="cover"
                    style={{ height: height * 0.5, width }}
                />
                <View style={{ position: "absolute", bottom: 20, right: 20}}>
                    {
                        this.state.muted ? <FontAwesome5 name="volume-mute" size={24} color="#fff" /> :
                            <Octicons name="unmute" size={24} color="#fff" />
                    }

                </View>
                <View style={{ position: "absolute", top: 20, right: 20 }}>
                    {
                        this.state.play ? <View>
                            <Text style={[styles.text,{color:"#fff"}]}>{this.state.playBackStatus||"0:00"}/{this.state.totalDuration}</Text>
                        </View> :
                            <FontAwesome5 name="play" size={24} color="#fff" />
                    }

                </View>
            </TouchableWithoutFeedback>
     
            <View style={{flex:1,}}>
                <View style={{ flex: 0.5, flexDirection:"row"}}>
                    <View style={{ flex: 0.3, alignItems: "center", justifyContent: "space-around", flexDirection: 'row', }}>
                        <View style={{ flexDirection: "row" }}>
                            {!this.state.like ? <TouchableOpacity style={{ alignItems: "center", justifyContent: 'center' }}
                                onPress={() => { this.setState({ like: true }) }}
                            >
                                <AntDesign name="hearto" size={24} color={theme.secondaryColor} />
                            </TouchableOpacity> : <Animatable.View
                                animation={"bounceIn"}
                            >
                                <TouchableOpacity
                                    onPress={() => { this.setState({ like: false }) }}
                                >
                                    <AntDesign name="heart" size={24} color="red" />
                                </TouchableOpacity>

                            </Animatable.View>}

                        </View>
                        <TouchableOpacity style={{ flexDirection: "row" }}>
                            <View style={{ alignItems: "center", justifyContent: 'center' }}>
                                <FontAwesome5 name="comment" size={24} color={theme.secondaryColor} />
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: "row" }}>
                            <View style={{ alignItems: "center", justifyContent: 'center' }}>
                                <Feather name="send" size={24} color={theme.secondaryColor} />
                            </View>

                        </TouchableOpacity>
                    </View>

                </View>
                <View>
                    <Text style={[styles.text,{marginLeft:10,color:theme.TextColor}]}>50 likes</Text>
                </View>
                <View style={{ flex:0.4, justifyContent: "center" }}>

                    <Text style={[styles.text, { marginLeft: 10 ,color:theme.TextColor}]}>Lorem ipsum Lorem ipsum Lorem ipsum  Lorem ipsum</Text>
                </View>
            </View>
        </View>
    );
  }
}
const styles = StyleSheet.create({
    text: {
        fontFamily
    },
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    }

})