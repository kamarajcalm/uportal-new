import React, { Component } from 'react';
import { View, Text, Dimensions, StatusBar, StyleSheet, SafeAreaView} from 'react-native';
import { connect } from 'react-redux';
import { selectTheme ,selectVideo} from '../actions';
import { TabView, SceneMap } from 'react-native-tab-view';
import FirstRoute from '../components/FirstRoute';
import HomePage from '../components/HomePage';
import LoginScreen from '../components/LoginScreen';
import settings from '../appSettings';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NotesScreen from '../components/NotesScreen';
import ChatScreen from '../components/ChatScreen';
const fontFamily =settings.fontFamily
const width =Dimensions.get('screen').width
const height = Dimensions.get("window").height
const screenHeight = Dimensions.get("screen").height
const lightTheme = settings.lightTheme
const darkTheme = settings.darkTheme
class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      index:0,
      routes: [
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
      ],
      routes2: [
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
        { key: 'third', title: 'Third' },
      ],
      navigation:this.props.navigation,
      play:true,
      index2:1,
    };
  }
  renderScene = ({ route ,}) => {
    switch (route.key) {
   
      case 'first':
        return <HomePage index={this.state.index} navigation={this.state.navigation} play ={this.state.play}/>
      case 'second':
        return <LoginScreen navigation={this.state.navigation}/>
      default:
        return null;
    }
  };
  renderScene2 = ({ route, }) => {
    switch (route.key) {

      case 'first':
        return <NotesScreen index={this.state.index} navigation={this.state.navigation} play={this.state.play} />
      case 'second':
        return <HomePage navigation={this.state.navigation} />
      case 'third':
        return <ChatScreen navigation={this.state.navigation} />
      default:
        return null;
    }
  };
componentDidMount(){
  this._unsubscribe = this.props.navigation.addListener('blur', () => {
    if(this.props.selectedVideo){
        this.props.selectedVideo.pause()
    }
  });
  this._subscribe = this.props.navigation.addListener('focus',()=>{
    let color;
    if (this.props.theme == "dark") {
      color = "#000"
    } else {
      color = "#fff"
    }
    StatusBar.setBackgroundColor(color)
  })
}

  componentWillUnmount(){
    this._unsubscribe()
    console.log("home unmount")
  }
  
  render() {
    let theme;
    let index;
    let routes;
    if(this.props.user==null){
      index =this.state.index
      routes= this.state.routes
    }else{
      index = this.state.index2
      routes = this.state.routes2
    }
    if(this.props.theme=="dark"){
      theme =darkTheme
    }else{
      theme = lightTheme
    }
                              // not login
    if(this.props.user==null){
      return (
        <>
          <SafeAreaView style={[styles.topSafeArea, { backgroundColor: theme.backgroundColor }]} />
          <SafeAreaView style={[styles.bottomSafeArea, { backgroundColor: theme.backgroundColor }]}>
            <StatusBar backgroundColor={theme.backgroundColor} barStyle={this.props.theme == "dark" ? "light-content" : "dark-content"} />
            <TabView
              renderTabBar={() => null}
              navigationState={{ index, routes }}
              renderScene={this.renderScene}
              onIndexChange={(index) => {
                if (index != 0) {
                  if (this.props.selectedVideo) {
                    this.props.selectedVideo.pause()
                  }
                } else {
                  if (this.props.selectedVideo) {
                    this.props.selectedVideo.play()
                  }
                }

                this.setState({ index })
              }}
              initialLayout={{ width }}
            />
            {this.state.index == 0 && <View style={{
              position: "absolute",
              top: screenHeight * 0.5,
              right: -25,
              transform: [{ rotate: '270 deg' }],
              backgroundColor: theme.inverseColor,
              height: 20,
              width: height * 0.1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10
            }}


            >
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  if (this.props.selectedVideo) {
                    this.props.selectedVideo.pause()
                  }
                  this.setState({ index: 2 })
                }}
              >
                <Text style={[styles.text, { color: "#fff" }]}>Login</Text>
              </TouchableOpacity>

            </View>}
            {this.state.index == 1 && <View style={{
              position: "absolute",
              top: screenHeight * 0.5,
              left: -25,
              transform: [{ rotate: '270 deg' }],
              backgroundColor: theme.inverseColor,
              height: 20,
              width: height * 0.1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10
            }}


            >
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  if (this.props.selectedVideo) {
                    this.props.selectedVideo.play()
                  }
                  this.setState({ index: 1 })
                }}
              >
                <Text style={[styles.text, { color: "#fff" }]}>back</Text>
              </TouchableOpacity>

            </View>}
          </SafeAreaView>
        </>
      );
                                    // if login
    }else{
      return(
        <>
          <SafeAreaView style={[styles.topSafeArea, { backgroundColor: theme.backgroundColor }]} />
          <SafeAreaView style={[styles.bottomSafeArea, { backgroundColor: theme.backgroundColor }]}>
            <StatusBar backgroundColor={theme.backgroundColor} barStyle={this.props.theme == "dark" ? "light-content" : "dark-content"} />
            <TabView
              renderTabBar={() => null}
              navigationState={{index,routes}}
              renderScene={this.renderScene2}
              onIndexChange={(index2) => {
                if (index2 != 1) {
                  if (this.props.selectedVideo) {
                    this.props.selectedVideo.pause()
                  }
                } else {
                  if (this.props.selectedVideo) {
                    this.props.selectedVideo.play()
                  }
                }

                this.setState({ index2 })
              }}
              initialLayout={{ width }}
            />
            {this.state.index2 == 0 && <View style={{
              position: "absolute",
              top: screenHeight * 0.5,
              right: -25,
              transform: [{ rotate: '270 deg' }],
              backgroundColor: theme.inverseColor,
              height: 20,
              width: height * 0.1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10
            }}


            >
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  if (this.props.selectedVideo) {
                    this.props.selectedVideo.play()
                  }
                  this.setState({ index2: 1 })
                }}
              >
                <Text style={[styles.text, { color: "#fff" }]}>Back</Text>
              </TouchableOpacity>

            </View>}
            {this.state.index2 == 1 && <View style={{
              position: "absolute",
              top: screenHeight * 0.5,
              left: -25,
              transform: [{ rotate: '270 deg' }],
              backgroundColor: theme.inverseColor,
              height: 20,
              width: height * 0.1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10
            }}


            >
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  if (this.props.selectedVideo) {
                    this.props.selectedVideo.pause()
                  }
                  this.setState({ index2: 0 })
                }}
              >
                <Text style={[styles.text, { color: "#fff" }]}>Notes</Text>
              </TouchableOpacity>

            </View>}
            {this.state.index2 == 1 && <View style={{
              position: "absolute",
              top: screenHeight * 0.5,
              right: -25,
              transform: [{ rotate: '270 deg' }],
              backgroundColor: theme.inverseColor,
              height: 20,
              width: height * 0.1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10
            }}


            >
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  if (this.props.selectedVideo) {
                    this.props.selectedVideo.pause()
                  }
                  this.setState({ index2: 2 })
                }}
              >
                <Text style={[styles.text, { color: "#fff" }]}>Chats</Text>
              </TouchableOpacity>

            </View>}
            {this.state.index2 == 2 && <View style={{
              position: "absolute",
              top: screenHeight * 0.5,
              left: -25,
              transform: [{ rotate: '270 deg' }],
              backgroundColor: theme.inverseColor,
              height: 20,
              width: height * 0.1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10
            }}


            >
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  if (this.props.selectedVideo) {
                    this.props.selectedVideo.play()
                  }
                  this.setState({ index2: 1 })
                }}
              >
                <Text style={[styles.text, { color: "#fff" }]}>Back</Text>
              </TouchableOpacity>

            </View>}
          </SafeAreaView>
        </>
      )
    }
    
  }
}
const styles = StyleSheet.create({
  text:{
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
    selectedVideo:state.selectedVideo,
    user:state.selectedUser,
  }
}

const mapActionsToProps =()=>{
  return {
    selectTheme,
    selectVideo
  }
}
 

export default connect(mapStateToProps, mapActionsToProps)(Home)