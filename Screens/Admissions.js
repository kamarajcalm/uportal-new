import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, StatusBar, Platform, FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SliderBox } from "react-native-image-slider-box";
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
import { Ionicons,AntDesign } from '@expo/vector-icons';
import institutes from '../data/institutes';
import { index } from 'd3-array';
class Admissions extends React.PureComponent {
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
          <View style={{ backgroundColor: theme.backgroundColor, flex: 1 }}>
                  {/* headers */}
                  <View style={[styles.elevation,{height:height*0.08,backgroundColor:theme.backgroundColor,flexDirection:"row"}]}>
                        <View style={{flex:0.2,alignItems:"center",justifyContent:"center"}}>
                               <Ionicons name="notifications-outline" size={24} color={theme.TextColor} />
                        </View>
                        <View style={{flex:0.6,alignItems:"center",justifyContent:"center"}}>
                             <Text style={[styles.text,{color:theme.TextColor,fontSize:20}]}>INSTITUTE INFO</Text>
                        </View>
                          <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                              <AntDesign name="search1" size={24} color={theme.TextColor} />
                        </View>
                  </View>

                            {/* INSITUTES */}
               <FlatList 
                 initialNumToRender={1}
                 contentContainerStyle={{paddingBottom:20}}
                 data={institutes}
                 keyExtractor={(item,index)=>index.toString()}
                 renderItem={({item,index})=>{
                     return(
                       <View style={{marginTop:20}}>
                         <SliderBox
                           images={item.images}
                           sliderBoxHeight={height*0.25}
                           onCurrentImagePressed={() => { this.props.navigation.navigate('ViewInstitute', { item }) }}
                           dotColor={theme.inverseColor}
                           inactiveDotColor="#90A4AE"
                           paginationBoxVerticalPadding={20}
                           autoplay
                           circleLoop
                           resizeMethod={'resize'}
                           resizeMode={'cover'}
                           paginationBoxStyle={{
                             position: "absolute",
                             bottom: 0,
                             padding: 0,
                             alignItems: "center",
                             alignSelf: "center",
                             justifyContent: "center",
                             paddingVertical: 10
                           }}
                           dotStyle={{
                             width: 10,
                             height: 10,
                             borderRadius: 5,
                             marginHorizontal: 0,
                             padding: 0,
                             margin: 0,
                             backgroundColor: "rgba(128, 128, 128, 0.92)"
                           }}
                           ImageComponentStyle={{ borderRadius: 15, width: '97%', marginTop: 5 }}
                           imageLoadingColor={theme.inverseColor}
                         />
                         <View style={{position:"absolute",top:20,}}>
                              <View style={{height:height*0.1,width:width*0.9,marginLeft:20,alignItems:"center",justifyContent:"center"}}>
                                <Text style={[styles.text, { color: "#fff",fontSize:22 ,fontWeight:"bold"}]}>{item.institute}</Text>
                              </View>
                         </View>
                         <View style={{position:"absolute",bottom:20,right:20}}>
                               <TouchableOpacity 
                                 onPress={() => { this.props.navigation.navigate('ViewInstitute',{item})}}
                               >
                                     <Text style={[styles.text,{color:"#fff",textDecorationLine:"underline",fontWeight:"500"}]}>VIEW DETAILS</Text>
                               </TouchableOpacity>
                         </View>
                       </View>
                 
                     )
                 }}
               />
          </View>
        </SafeAreaView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    fontFamily
  },
  topSafeArea: {
    flex: 0,
  },
  bottomSafeArea: {
    flex: 1,

  },
  elevation:{
    elevation:5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 60,
  }
})
const mapStateToProps = (state) => {

  return {
    theme: state.selectedTheme,

  }
}
export default connect(mapStateToProps, { selectTheme })(Admissions)