import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, StatusBar, Image} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import settings from '../appSettings';
const fontFamily = settings.fontFamily
const width = Dimensions.get('screen').width
const height = Dimensions.get("window").height
const screenHeight = Dimensions.get("screen").height
const lightTheme = settings.lightTheme
const darkTheme = settings.darkTheme
import data from '../data/ProfileDataCollegeStudent';
import { AntDesign, Entypo } from '@expo/vector-icons';
class Profile extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
   
        };
    }
componentDidMount(){
    this._subscribe = this.props.navigation.addListener('focus', () => {
        let color;
        if (this.props.theme == "dark") {
            color = "#333"
        } else {
            color = "#eee"
        }
        StatusBar.setBackgroundColor(color)
    })
}
componentWillUnmount(){
    this._subscribe()
}
    navigate =(item)=>{

        if (item.name =="STATISTICS"){
            return this.props.navigation.navigate('Statistics')
        }
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
                <StatusBar backgroundColor={this.props.theme == "dark" ? "#333" : "#eee"} barStyle={this.props.theme == "dark" ? "light-content" : "dark-content"} />
                <SafeAreaView style={[styles.topSafeArea, { backgroundColor: theme.backgroundColor }]} />
                <SafeAreaView style={[styles.bottomSafeArea, { backgroundColor: theme.backgroundColor }]}>
                    <View style={{ flex: 1,backgroundColor: theme.backgroundColor }}>
                        <View style={{ height: height * 0.19, backgroundColor: this.props.theme=="dark"?"#333":"#eee",paddingBottom:10}}>
                             <View style={{alignItems:"center",paddingVertical:10}}>
                                 <Text style={[styles.text,{color:this.props.theme=="dark"?"#fff":lightTheme.secondaryColor,fontWeight:"bold"}]}>THE CATHEDRAL HIGH SCHOOL</Text>
                             </View>
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                                    <Image
                                        source={{ uri: "https://i.dlpng.com/static/png/1486888-student-png-png-of-a-girl-student-1017_1030_preview.png" }}
                                        style={{ height: height * 0.1, width: height * 0.1, borderRadius: height * 0.05, }}
                                        resizeMode={"cover"}
                                    />
                                </View>
                                <View style={{ flex: 0.4, justifyContent:"space-around",borderRightColor:theme.secondaryColor,borderRightWidth:0.5 }}>
                                   <View style={{flexDirection:"row"}}>
                                       <View style={{flex:0.5}}>
                                            <Text style={[styles.text, { color: theme.TextColor }]}>Unique Id </Text>
                                       </View>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={[styles.text, { color: theme.TextColor }]}>: 8909</Text>
                                        </View>
                                   </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={[styles.text, { color: theme.TextColor }]}>Name</Text>
                                        </View>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={[styles.text, { color: theme.TextColor }]}>: Abhi</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={[styles.text, { color: theme.TextColor }]}>Student ID </Text>
                                        </View>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={[styles.text, { color: theme.TextColor }]}>: 7889789</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={[styles.text, { color: theme.TextColor }]}>Class </Text>
                                        </View>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={[styles.text, { color: theme.TextColor }]}>: III sec A</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flex: 0.4, }}>
                                    <View style={{flex:0.5,alignItems:"center",justifyContent:"center"}}>
                                        <TouchableOpacity>
                                            <Text style={[styles.text,{color:"red",textDecorationLine:"underline"}]}>REQUIRE ADMISSION</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flex:0.5,alignItems:'center',justifyContent:"center"}}>
                                        <TouchableOpacity style={{height:height*0.05,alignItems:"center",justifyContent:'center',borderRadius:5,backgroundColor:theme.secondaryColor,width:width*0.3}}>
                                            <Text style={[styles.text,{color:this.props.theme=="dark"?"#000":"#fff"}]}>LOGOUT</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
             
                                     {/* ITEMS */}

                          <FlatList 
                            data={data}
                            keyExtractor ={(item,index)=>{index.toString()}}
                            renderItem ={({item,index})=>{
                                   return(
                                       <TouchableOpacity style={{height:height*0.07,backgroundColor:theme.backgroundColor,flexDirection:"row"}}
                                        onPress ={()=>{this.props.navigation.navigate(item.navigate)}}
                                       >
                                             <View style={{flex:0.2,alignItems:"center",justifyContent:"center"}}>
                                                <Image 
                                                 source={{uri:this.props.theme=="dark"?item.darkicon:item.lighticon}}
                                                 style={{height:"70%",width:"70%"}}
                                                />
                                             </View>
                                             <View style={{flex:0.6,justifyContent:'center'}}>
                                                <Text style={[styles.text,{color:theme.TextColor}]}>{item.name}</Text>
                                             </View>
                                             <View style={{flex:0.2,alignItems:"center",justifyContent:"center"}}>
                                               <Entypo name="chevron-small-right" size={24} color={theme.TextColor} />
                                             </View>
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
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,

    }
}
export default connect(mapStateToProps, { selectTheme })(Profile)