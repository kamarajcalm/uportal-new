import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TextInput, ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { selectTheme,selectUser } from '../actions';
import settings from '../appSettings';
const fontFamily = settings.fontFamily
const width = Dimensions.get('screen').width
const height = Dimensions.get("window").height
const screenHeight = Dimensions.get("screen").height
const lightTheme = settings.lightTheme
const darkTheme = settings.darkTheme
class LoginScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
           mobileNo:"",
           password:""
        }
    }
    login =()=>{
this.props.selectUser("hhhh")
    }
    render() {
        let theme;
        if (this.props.theme == "dark") {
            theme = darkTheme
        } else {
            theme = lightTheme
        }
        return (
            <View style={{ flex: 1,backgroundColor:theme.backgroundColor}}>
                  <View style={{marginTop:height*0.1,alignItems:"center"}}>
                      <Text style={[styles.text,{color:theme.secondaryColor,fontSize:22}]}>Sign In</Text>
                  </View>
                  <View style={{alignItems:"center"}}>
                     <View style={{height:height*0.06,width:width*0.86,borderColor:theme.secondaryColor,borderRadius:5,borderWidth:1,marginTop:30}}>
                      <TextInput 
                        value={this.state.mobileNo}
                        keyboardType={"numeric"}
                        style={{height:"100%",width:"100%",paddingLeft:10,color:theme.TextColor}}
                        selectionColor={theme.secondaryColor}
                        onChangeText={(mobileNo) => { this.setState({ mobileNo})}}
                      />
                     </View>
                     <View style={{position:"absolute",top:20,left:40,backgroundColor:theme.backgroundColor,paddingHorizontal:10}}>
                        <Text style={[styles.text,{color:theme.TextColor}]}>UID/Mobile no</Text>
                     </View>
                  </View>

                <View style={{ alignItems: "center" }}>
                    <View style={{ height: height * 0.06, width: width * 0.86, borderColor: theme.secondaryColor, borderRadius: 5, borderWidth: 1, marginTop: 30 }}>
                        <TextInput
                            value={this.state.password}
                            secureTextEntry={true}
                            style={{ height: "100%", width: "100%", paddingLeft: 10, color: theme.TextColor }}
                            selectionColor={theme.secondaryColor}
                            onChangeText={(password) => { this.setState({ password }) }}
                        />
                    </View>
                    <View style={{ position: "absolute", top: 20, left: 40, backgroundColor: theme.backgroundColor, paddingHorizontal: 10 }}>
                        <Text style={[styles.text, { color: theme.TextColor }]}>Password</Text>
                    </View>
                </View>

                 <View style={{marginTop:30,alignItems:"center",}}>
                     <TouchableOpacity style={{height:height*0.05,width:width*0.4,alignItems:'center',justifyContent:"center",backgroundColor:theme.inverseColor,borderRadius:5}}
                       onPress ={()=>{this.login()}}
                     >
                         <Text style={[styles.text,{color:"#fff"}]}>Login</Text>
                     </TouchableOpacity>
                 </View>
            </View>
        );
    }
}
const styles =StyleSheet.create({
    text:{
        fontFamily
    }
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,

    }
}
export default connect(mapStateToProps, { selectTheme, selectUser})(LoginScreen)