import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity, FlatList,Animated,StatusBar} from 'react-native';
import { connect } from 'react-redux';
import { selectTheme ,selectVideo} from '../actions';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Ionicons, FontAwesome5, Entypo} from '@expo/vector-icons';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';
import Modal from 'react-native-modal';
const lightTheme = settings.lightTheme
const darkTheme = settings.darkTheme
const width = Dimensions.get('screen').width
const height = Dimensions.get("window").height
const screenHeight =Dimensions.get("screen").height
import settings from '../appSettings';
import data from '../data/data'
import ImagePosts from './ImagePosts';
import VideoPost from './VideoPost';

const cellHeight = height * 0.7;
const cellWidth = width;
const viewabilityConfig = {
    itemVisiblePercentThreshold: 80,
};
const color = Appearance.getColorScheme()
const fontFamily = settings.fontFamily
const { diffClamp } = Animated;
const headerHeight = height * 0.14;
class HomePage extends React.PureComponent {
    constructor(props) {
       
        super(props);
        this.state = {
          currentItem:null,
          showModal:false
        }
        this.cellRefs = [];
        this.scrollY = new Animated.Value(0)
        this.translateYNumber = React.createRef()
    }

    _onViewableItemsChanged = (props) => {
        const changed = props.changed;
        changed.forEach((item) => {
            this.setState({ currentItem: item.key})
            const cell = this.cellRefs[item.key];
            this.cellRefs.forEach((i)=>{
                i?.pause();
            })
            if (cell) {
                if (item.isViewable) {
                    this.props.selectVideo(cell)
                    cell.play();
                } else {
                    cell.pause();
                }
            }else{
                this.props.selectVideo(null)
            }
        });
    };
    componentDidMount(){
        this._schemeSubscription = Appearance.addChangeListener(({ colorScheme }) => {
            console.log(colorScheme,"pppp");
            this.props.selectTheme(colorScheme)
        });
    }
    componentWillUnmount(){
        console.log("called")
        this._schemeSubscription.remove()
    }
    openBottomSheet =(itemmm)=>{
     this.setState({showModal:true})

    }
    bottomModal =(theme)=>{
        return(
           <Modal 
           swipeThreshold={100}
            onSwipeComplete={() => { this.setState({ showModal:false})}}
            swipeDirection="down"
            animationOutTiming={50}
            animationOut={"slideOutDown"}
             onBackdropPress={() => { this.setState({ showModal:false})}}
            style={{alignItems:"flex-end",marginHorizontal:0,flexDirection:"row",marginVertical:0}}
             statusBarTranslucent={true}
             deviceHeight={screenHeight}
             isVisible={this.state.showModal}
           >
               <View style={{height:height*0.4,backgroundColor:theme.backgroundColor,width,elevation:5,borderTopRightRadius:15,borderTopLeftRadius:15}}>
                   <View style={{height:5,width:width*0.1,alignSelf:"center",backgroundColor:"gray",marginVertical:10,borderRadius:5}}>

                   </View>
                   <View style={{flex:1,justifyContent:"space-around",alignItems:"center"}}>
                        <View>
                            <Text style={[styles.text,{color:theme.TextColor}]}>Turn on post Notifications</Text>
                        </View>
                        <View>
                            <Text style={[styles.text, { color: theme.TextColor }]}>Delete</Text>
                        </View>
                        <View>
                            <Text style={[styles.text,{color:"red"}]}>Report</Text>
                        </View>
                   </View>
               
               </View>
           </Modal>
        )
     
    }
    getCloser = (value, checkOne, checkTwo) =>
        Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;
    render() {
        let theme;
        if(this.props.theme =="dark"){
            theme=darkTheme
        }else{
            theme =lightTheme
        }
        const scrollYClamped = diffClamp(this.scrollY, 0, headerHeight);

        const translateY = scrollYClamped.interpolate({
            inputRange: [0, headerHeight],
            outputRange: [0, -(headerHeight / 2)],
        });


        translateY.addListener(({ value }) => {
            this.translateYNumber.current = value;
        });

        const handleScroll = Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: { y: this.scrollY },
                    },
                },
            ],
            {
                useNativeDriver: true,
            },
        );

        const handleSnap = ({ nativeEvent }) => {

            const offsetY = nativeEvent.contentOffset.y;
            if (
                !(
                    this.translateYNumber.current === 0 ||
                    this.translateYNumber.current === -headerHeight / 2
                )
            ) {
                if (this.ref) {

                    this.ref.scrollToOffset({
                        animated:true,
                        offset:
                            this.getCloser(this.translateYNumber.current, -headerHeight / 2, 0) ===
                                -headerHeight / 2
                                ? offsetY + headerHeight / 2
                                : offsetY - headerHeight / 2,
                    });
                }
            }
        };
        return (
            <>
            <View style={{ flex: 1,backgroundColor:theme.backgroundColor,}}>
                    {/* HEADERS */}
                    <View style={[{height:height*0.1,backgroundColor:theme.backgroundColor,flexDirection:"row"}]}>
                            <View style={{flex:0.2,alignItems:"center",justifyContent:"center"}}>
                                <Ionicons name="notifications-outline" size={24} color={theme.secondaryColor} />
                            </View>
                            <View style={{flex:0.6,alignItems:"center",justifyContent:'center'}}>
                                <Text style={[styles.text,{color:theme=="dark"?"#fff":theme.secondaryColor,fontSize:22,fontWeight:"bold"}]}>Universal Wall</Text>
                            </View>
                            <View style ={{flex:0.2,alignItems:"center",justifyContent:"center"}}>
                                <Ionicons name="search" size={24} color={theme.secondaryColor} />
                            </View>
                    </View>
                                      {/* Details */}
                              
               
                    {/* POSTS */}
                    <Animated.FlatList
                        contentContainerStyle={{paddingTop:height*0.14}}
                        initialNumToRender={3}
                        maxToRenderPerBatch={3}
                        onViewableItemsChanged={this._onViewableItemsChanged}
                         windowSize ={5}
                        getItemLayout={(_data, index) => ({
                            length: cellHeight,
                            offset: cellHeight * index,
                            index,
                        })}
                        viewabilityConfig={viewabilityConfig}
                        removeClippedSubviews={true}
                        onScroll={handleScroll}
                       onMomentumScrollEnd={handleSnap}
                        data={data}
                        ref={ref => this.ref = ref}
                        keyExtractor ={(item,index)=>index.toString()}
                        renderItem ={({item,index})=>{
                          if(item.type =="image"){
                             return(
                                <ImagePosts item ={item} index={index} openSheet={(itemm)=>{this.openBottomSheet(itemm)}} theme ={this.props.theme}/>
                             )
                          }
                            return(
                               <VideoPost 
                                    ref={(ref) => {
                                        this.cellRefs[index] = ref;
                                        
                                    }}
                                    index={this.props.index}
                                    item={item}
                                    theme ={this.props.theme}
                               />
                            )
                        }}
                  />

            </View>
            
                {
                    this.bottomModal(theme)
                }
        
                <Animated.View style={{ position: "absolute", top: height * 0.1-StatusBar.currentHeight, height: height * 0.14, width, transform: [{ translateY }]}}>
                    <View style={{ height: height * 0.07, flexDirection: "row", marginTop: 10, backgroundColor: theme.backgroundColor }}>
                        <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={require('../assets/unknownPerson.jpg')}
                                style={{ height: 50, width: 50, borderRadius: 25 }}
                            />
                        </View>
                        <View style={{ flex: 0.7, justifyContent: "center" }}>
                            <Text style={[styles.text, { color: theme.TextColor }]}>What's on your mind?</Text>
                        </View>
                    </View>
                    <View style={{ height: height * 0.07, backgroundColor: theme.backgroundColor, flexDirection: "row" }}>
                        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: "center" }}>
                            <TouchableOpacity style={{ flexDirection: "row" }}>
                                <View>
                                    <FontAwesome5 name="photo-video" size={24} color={theme.secondaryColor} />
                                </View>
                                <View style={{ marginLeft: 10, alignItems: "center", justifyContent: "center" }}>
                                    <Text style={[styles.text, { color: theme.TextColor }]}>PHOTO / VIDEOS</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 0.5, alignItems: 'center', justifyContent: "center" }}>
                            <TouchableOpacity

                                style={{ flexDirection: "row" }}
                            >
                                <View>
                                    <Entypo name="folder-images" size={24} color={theme.secondaryColor} />
                                </View>
                                <View style={{ marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={[styles.text, { color: theme.TextColor }]}>MY WALL</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </>
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
    },
    modalView1: {
        backgroundColor: '#fff',
        marginHorizontal: 0,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        justifyContent: 'flex-end',
        width: width
    }

})
const mapStateToProps = (state) => {

    return {
        theme:state.selectedTheme,
        video:state.selectedVideo
    }
}
export default connect(mapStateToProps, { selectTheme, selectVideo })(HomePage)