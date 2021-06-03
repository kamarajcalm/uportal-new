import React, { Component } from 'react';
import { View, Text, Dimensions, Image, StyleSheet, ScrollView, Animated, StatusBar, FlatList} from 'react-native';
import VideoPost from './VideoPost';
import { Entypo, AntDesign, FontAwesome5, FontAwesome, Feather, EvilIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import settings from '../appSettings';
import { PinchGestureHandler, State } from 'react-native-gesture-handler'
const screen = Dimensions.get('window')
const fontFamily = settings.fontFamily

import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import * as Animatable from 'react-native-animatable';
const lightTheme = settings.lightTheme
const darkTheme = settings.darkTheme
const width = Dimensions.get('window').width
const windowWidth = Dimensions.get('window').width
const height = Dimensions.get("window").height
 class ImagePosts extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
       currentIndex:1,
       like:false
    };
    this.scrollX= new Animated.Value(0)
      this.position = Animated.divide(this.scrollX, width)
  }
    onViewableItemsChanged = ({ viewableItems, changed }) => {
        if (viewableItems.length>0){
            this.setState({ currentIndex: viewableItems[0].index+1})
        }
      
    }
     renderContent = () => (
         <View
             style={{
                 backgroundColor: 'white',
                 padding: 16,
                 height: height*0.3,
             }}
         >
             <Text>Swipe down to close</Text>
         </View>
     );
       
  render() {
      let theme;
      let {item} =this.props
      let position = Animated.divide(this.scrollx, width)
      if(this.props.theme=="dark"){
        theme =darkTheme
      }else{
          theme =lightTheme
      }
    return (
       
      <View style={{height:height*0.7}}>
         
          <View style={{flex:0.15,marginVertical:5,flexDirection:"row"}}>
              <View style={{flexDirection:"row",flex:0.8}}>
                  <View style={{flex:0.2,alignItems:"center",justifyContent:'center'}}>
                        <Image
                            style={{ height: 50, width: 50, borderRadius: 25 }}
                            source={require('../assets/unknownPerson.jpg')}
                        />
                  </View>
                 
                  <View style={{marginLeft:10,justifyContent:'center',flex:0.7}}>
                        <View>
                            <Text style={[styles.text,{color:theme.TextColor}]}>Stanley</Text>
                        </View>
                        <View>
                            <Text style={[styles.text, { color: theme.TextColor }]}>PES UNIVERSITY</Text>
                        </View>
                        <View style={{flexDirection:"row"}}>
                            <View style={{alignItems:'center',justifyContent:"center"}}>
                                <Entypo name="back-in-time" size={15} color={theme.secondaryColor} />
                            </View>
                          
                            <View style={{marginLeft:5}}>
                                <Text style={[styles.text, { color: theme.TextColor }]}>just now</Text>
                            </View>
                        </View>
                  </View>
              </View>
              <View style={{flex:0.2,alignItems:"center",justifyContent:"center"}}>
                  <TouchableOpacity 
                        onPress={() => {
                            this.props.openSheet(item)
                        }}
                  >
                        <MaterialCommunityIcons name="dots-vertical" size={24} color={theme.secondaryColor} />
                  </TouchableOpacity>
              </View>
          </View>
         
          <View style={{flex:0.65,}}>
                <FlatList
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: this.scrollX } } }],
                        { useNativeDriver: false})}
                    scrollEventThrottle={1}
                    onViewableItemsChanged={this.onViewableItemsChanged}
                    showsHorizontalScrollIndicator={false}
                    viewabilityConfig={{
                        itemVisiblePercentThreshold: 90
                    }}

                    horizontal={true}
                    pagingEnabled={true}
                    data={item.media}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            
                                <Image
                                    source={{ uri: item }}
                                    style={{
                                        width: screen.width,
                                        height:"100%",
                                    }}
                                    resizeMode="cover"
                                />
                        
                        )
                    }}
                />
                
          </View>
           
            {item.media.length>1&&<View style={{ position: 'absolute', height: 20, width: width * 0.12, top:height*0.13, backgroundColor: "#000", right: 20, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                <View>
                    <Text style={[styles.text, { color: "#fff" }]}>{this.state.currentIndex}/{item.media.length}</Text>
                </View>
            </View>}
            <View style={{ flex: 0.1, flexDirection: "row", }}>
                <View style={{flex:0.5,flexDirection:"row",}}>
                    <View style={{ flex: 0.7, alignItems: "center", justifyContent: "space-around", flexDirection: 'row',}}>
                        <View style={{ flexDirection: "row" }}>
                           {!this.state.like? <TouchableOpacity style={{ alignItems: "center", justifyContent: 'center' }}
                            onPress={()=>{this.setState({like:true})}}
                           >
                                <AntDesign name="hearto" size={24} color={theme.secondaryColor} />
                            </TouchableOpacity> : <Animatable.View
                                    animation={"bounceIn"}
                            >
                                <TouchableOpacity 
                                 onPress={()=>{this.setState({like:false})}}
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
                <View 
                style ={{flex:0.2,flexDirection:"row",alignItems:"center",paddingLeft:10}}
                
                >
                    {/* <ScrollView
                    ref= {ref=>this.ref =ref}
                     contentContainerStyle={{flexDirection:"row"}}
                    >
                        { 
                            item.media.map((_, index) => {
                                const width = this.scrollx.interpolate(
                                    {
                                        inputRange:[
                                           windowWidth*(index-1) ,
                                           windowWidth*index,
                                           windowWidth*(index+1)
                                        ],
                                        outputRange :[
                                            5,10,5
                                        ],
                                        extrapolate:"clamp"
                                    }
                                )
                                const opacity = position.interpolate({
                                    inputRange: [index - 1, index, index + 1],
                                    outputRange: [0.3, 1, 0.3],
                                    extrapolate: 'clamp'
                                })
                                return (
                                    <Animated.View

                                        key={index}
                                        style={{ height: 5, width, borderRadius: 2.5, backgroundColor: "#1792E3", marginLeft: 10,opacity }}>

                                    </Animated.View>
                                )
                            })
                        }
                    </ScrollView> */}
                    <RNAnimatedScrollIndicators
                        
                        numberOfCards={item.media.length}
                        scrollWidth={windowWidth}
                        activeColor={theme.secondaryColor}
                        inActiveColor={"gray"}
                        scrollAnimatedValue={this.scrollX}
                    />

                 </View>
            </View>
            <View>
                <Text style={[styles.text,{marginLeft:10,color:theme.TextColor}]}>100 likes</Text>
            </View>
          <View style={{flex:0.1,justifyContent:"center"}}>
             
                <Text style={[styles.text,{marginLeft:10,color:theme.TextColor}]}>Lorem ipsum Lorem ipsum Lorem ipsum  Lorem ipsum</Text>
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
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,

    }
}
export default connect(mapStateToProps, { selectTheme })(ImagePosts)