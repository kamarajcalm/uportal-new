import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, Animated } from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import settings from '../appSettings';
import { FlatList } from 'react-native-gesture-handler'
const fontFamily = settings.fontFamily
export default class Post extends Component {
   
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {item}= this.props
    const length =item.img.length
    const scrollX =new Animated.Value(0)
    let position =Animated.divide(scrollX,width)
    return (
      <View>
          <View style={{height:height*0.1,backgroundColor:"#fff",flex:1,alignItems:'center',justifyContent:"center",flexDirection:"row"}}>
              <View style={{flex:0.2,alignItems:"center",justifyContent:"center"}}>
                   <View style={{height:60,width:60,borderRadius:30,backgroundColor:"#000"}}> 
                      <Image 
                        source={{ uri:'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'}}
                        style={{height:"100%",width:"100%"}}
                      
                      />
                   </View>
              </View>
              <View style={{ flex: 0.8,justifyContent:'center'}}>
                   <Text style={{ color:"#1792E3"}}>{item.name}</Text>
                   <Text style={[styles.text,{ color:"#000"}]}>CHRIST UNIVERSITY</Text>
                   <View style={{flexDirection:"row"}}>
                        <Ionicons name="time-outline" size={18} color="black" />
                        <Text>11 aug 2021</Text>
                   </View>
                
              </View>
          </View>
          <View >
          <FlatList
            
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            horizontal={true}
            data={item.img}
            keyExtractor={(item, index) => index.toString()}
            onScroll={Animated.event(
              [{nativeEvent:{contentOffset:{x:scrollX}},}],
            )}
            renderItem={({ item, index }) => {
              return (
                <View>
               
                <Image
                  source={{ uri: item }}
                  style={{ height:height*0.6, width: width ,resizeMode:"cover"}}
                />
                  <View style={{ position: "absolute", right: 20, backgroundColor: "#000",top:20,borderRadius:10,width:35,height:20,borderRadius:10,alignItems:"center",justifyContent:"center"}}>
                    <Text style={{ color: "#fff" }}>{index+1}/{length}</Text>
                  </View>
                </View>
              )
            }}
          />
          <View style={styles.dotView}>
              {
                item.img.map((_,i)=>{
                  let  opacity =position.interpolate({
                    inputRange:[i-1,i,i+1],
                    outputRange:[0.3,1,0.3],
                    extrapolate:'clamp'
                  })
                  return(
                    <Animated.View
                      key={i}
                      style={{ opacity, height: 5, width: 5, backgroundColor:'#1792E3',marginTop:10,borderRadius:5,marginLeft:5}}
                    >

                    </Animated.View>
                  )
                })
              }
          </View>
          </View>
       
      

        <View style={{height:height*0.07,backgroundColor:"#fff",flexDirection:'row',alignItems:'center',justifyContent:"space-around"}}>
          <SimpleLineIcons name="like" size={24} color="black" />
          <Fontisto name="comment" size={24} color="black" />
          <FontAwesome name="share-square-o" size={24} color="black" />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text:{
    fontFamily
  },
  dotView:{
     flexDirection:"row",
     justifyContent:"center"
  } 
})

