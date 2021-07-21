import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, StatusBar, ScrollView, FlatList, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { selectTheme } from '../../actions';
import settings from '../../appSettings';
import Header from '../../components/Header';
const fontFamily = settings.fontFamily
const width = Dimensions.get('screen').width
const height = Dimensions.get("window").height
const screenHeight = Dimensions.get("screen").height
const lightTheme = settings.lightTheme
const darkTheme = settings.darkTheme
class ViewInstitute extends React.PureComponent {
    constructor(props) {
        let item = props.route.params.item

        super(props);
        this.state = {
            item
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
                    <Header navigation={this.props.navigation} title={this.state.item.institute}/>
                    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
                          <ScrollView
                            showsVerticalScrollIndicator={false}
                          
                          >


                                            {/* ADDRESS */}


                               <View style={{alignItems:"center",justifyContent:"center"}}> 
                                   <Text style={[styles.text,{color:theme.TextColor,marginTop:10}]}>{this.state.item.address}</Text>
                                <Text style={[styles.text, { color: theme.TextColor, marginTop: 10}]}>{this.state.item.city}</Text>
                                <Text style={[styles.text, { color: theme.TextColor, marginTop: 10}]}>{this.state.item.state}</Text>
                                <Text style={[styles.text, { color: theme.TextColor, marginTop: 10}]}>{this.state.item.pincode}</Text>
                               </View>

                                               {/* CAMPUS */}

                                <View style={{marginTop:10}}>
                                    <View style={{height:height*0.05,width,backgroundColor:theme.inverseColor,justifyContent:"center"}}>
                                        <Text style={[styles.text,{color:"#fff",marginLeft:10}]}>CAMPUS</Text>
                                    </View>
                                    <View style={{paddingVertical:20,}}>
                                         <FlatList
                                           showsHorizontalScrollIndicator={false}
                                           contentContainerStyle={{paddingRight:20}} 
                                           horizontal={true}
                                           data={this.state.item.campus}
                                           keyExtractor={(item,index)=>index.toString()}
                                           renderItem ={({item,index})=>{
                                                    return(
                                                        <View style={{width:width*0.3,marginLeft:20,}}>
                                                            <View>
                                                                <Image 
                                                                  source={{uri:item.image}}
                                                                  style={{height:height*0.15,width:"100%"}}
                                                                />
                                                            </View>
                                                            <View style={{alignItems:"center",justifyContent:"center",}}>
                                                                <Text style={[styles.text, { color: theme.TextColor}]}>{item.name}</Text>
                                                            </View>
                                                        </View>
                                                    )
                                           }}
                                         />
                                    </View>
                                </View>

                                           {/* CLASS ROOMS */}

                            <View style={{  }}>
                                <View style={{ height: height * 0.05, width, backgroundColor: theme.inverseColor, justifyContent: "center" }}>
                                    <Text style={[styles.text, { color: "#fff", marginLeft: 10 }]}>CLASS ROOMS</Text>
                                </View>
                                <View style={{ paddingVertical: 20, }}>
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={{ paddingRight: 20 }}
                                        horizontal={true}
                                        data={this.state.item.campus}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <View style={{ width: width * 0.3, marginLeft: 20, }}>
                                                    <View>
                                                        <Image
                                                            source={{ uri: item.image }}
                                                            style={{ height: height * 0.15, width: "100%" }}
                                                        />
                                                    </View>
                                                    <View style={{ alignItems: "center", justifyContent: "center", }}>
                                                        <Text style={[styles.text, { color: theme.TextColor }]}>{item.name}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                            </View>

                                                     {/* LIBRARY */}
                            <View style={{}}>
                                <View style={{ height: height * 0.05, width, backgroundColor: theme.inverseColor, justifyContent: "center" }}>
                                    <Text style={[styles.text, { color: "#fff", marginLeft: 10 }]}>LIBRARY</Text>
                                </View>
                                <View style={{ paddingVertical: 20, }}>
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={{ paddingRight: 20 }}
                                        horizontal={true}
                                        data={this.state.item.campus}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <View style={{ width: width * 0.3, marginLeft: 20, }}>
                                                    <View>
                                                        <Image
                                                            source={{ uri: item.image }}
                                                            style={{ height: height * 0.15, width: "100%" }}
                                                        />
                                                    </View>
                                                    <View style={{ alignItems: "center", justifyContent: "center", }}>
                                                        <Text style={[styles.text, { color: theme.TextColor }]}>{item.name}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                            </View>
 
                                                    {/* LABS */}

                            <View style={{}}>
                                <View style={{ height: height * 0.05, width, backgroundColor: theme.inverseColor, justifyContent: "center" }}>
                                    <Text style={[styles.text, { color: "#fff", marginLeft: 10 }]}>LABS</Text>
                                </View>
                                <View style={{ paddingVertical: 20, }}>
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={{ paddingRight: 20 }}
                                        horizontal={true}
                                        data={this.state.item.campus}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <View style={{ width: width * 0.3, marginLeft: 20, }}>
                                                    <View>
                                                        <Image
                                                            source={{ uri: item.image }}
                                                            style={{ height: height * 0.15, width: "100%" }}
                                                        />
                                                    </View>
                                                    <View style={{ alignItems: "center", justifyContent: "center", }}>
                                                        <Text style={[styles.text, { color: theme.TextColor }]}>{item.name}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                            </View>
                                        {/* FEES STRUCTURES */}

                            <View style={{}}>
                                <View style={{ height: height * 0.05, width, backgroundColor: theme.inverseColor, justifyContent: "center" }}>
                                    <Text style={[styles.text, { color: "#fff", marginLeft: 10 }]}>FEE STRUCTURE</Text>
                                </View>
                                <View style={{ paddingVertical: 20, }}>
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={{ paddingRight: 20 }}
                                        horizontal={true}
                                        data={this.state.item.campus}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <View style={{ width: width * 0.3, marginLeft: 20, }}>
                                                    <View>
                                                        <Image
                                                            source={{ uri: item.image }}
                                                            style={{ height: height * 0.15, width: "100%" }}
                                                        />
                                                    </View>
                                                    <View style={{ alignItems: "center", justifyContent: "center", }}>
                                                        <Text style={[styles.text, { color: theme.TextColor }]}>{item.name}</Text>
                                                    </View>
                                                </View>
                                            )
                                        }}
                                    />
                                </View>
                            </View>


                                          {/* APPLY */}

                                <View style={{marginVertical:20,alignItems:"center",justifyContent:"center"}}>
                                     <TouchableOpacity style={{height:height*0.05,width:width*0.3,alignItems:"center",justifyContent:"center",backgroundColor:theme.inverseColor,borderRadius:10}}
                                    onPress={() => { this.props.navigation.navigate("FormDetails")}}
                                     >
                                         <Text style={[styles.text,{color:"#fff"}]}>APPLY</Text>
                                     </TouchableOpacity>
                                </View>
                          </ScrollView>  
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
const mapActionToProps ={
  
        selectTheme
    
}
export default connect(mapStateToProps, mapActionToProps)(ViewInstitute)