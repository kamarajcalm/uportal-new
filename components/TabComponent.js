import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import settings from '../appSettings';
import { Value } from 'react-native-reanimated';
import { CommonActions } from '@react-navigation/native';
const fontFamily =settings.fontFamily
 class TabComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
      
    return (
      <View style={{flex:1,flexDirection:"row"}}>
          <TouchableOpacity style={{flex:0.2,borderTopWidth:5,borderColor:"black",height:'100%'}}
                onPress={() => {
                    this.props.navigation.dispatch(
                        CommonActions.navigate({
                            name: 'Home',
                            params: {
                                user: 'jane',
                            },
                        })
                    );
                }}
          >
                <View style={{flex:0.5,alignItems:"center",justifyContent:"center"}}>
                    <Entypo name="globe" size={20} color={"black"} />
                </View>
                <View style={{flex:0.5,alignItems:"center",justifyContent:"center"}}>

                    <Text style={[styles.text]}>Universal</Text>
                </View>
             
          </TouchableOpacity>
            <TouchableOpacity style={{ flex: 0.2 }}
             onPress ={()=>{this.props.navigation.navigate('Media')}}
            > 
                <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}>
                    <MaterialIcons name="perm-media" size={20} color={"black"} />
                </View>
                <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}>

                    <Text style={[styles.text]}>Media</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 0.2 }}>
                <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}>
                    <FontAwesome name="newspaper-o" size={20} color={"black"} style={{ marginTop: 3 }}/>
                </View>
                <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}>

                    <Text style={[styles.text,{fontSize:10,marginTop:3,fontWeight:"bold"}]}>QuestionPapers</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 0.2 }}>
                <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}>
                    <MaterialCommunityIcons name="tennis" size={20} color={"black"} />
                </View>
                <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}>

                    <Text style={[styles.text, {}]}>Sports</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 0.2 }}>
                <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}>
                    <Ionicons name="md-person-circle" size={24} color="black" />
                </View>
                <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}>

                    <Text style={[styles.text, {}]}>Profile</Text>
                </View>
            </TouchableOpacity>
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
export default connect(mapStateToProps, { selectTheme })(TabComponent)