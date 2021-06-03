import React, { Component } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, AsyncStorage, StatusBar, Dimensions, StyleSheet } from 'react-native';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Entypo, Fontisto, Feather, Ionicons } from '@expo/vector-icons';
import settings from '../appSettings';
import Swiper from 'react-native-swiper';
import Post from '../components/Post';
import VideoPost from '../components/VideoPost';

const fontFamily = settings.fontFamily
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const cellHeight = height * 0.6;
const cellWidth = width;
const viewabilityConfig = {
    itemVisiblePercentThreshold: 80,
};

const data = [
    {
        description: "gwu hwuhw hwiofiw  ifhif fhwhf",
        type: 'video',
        img: [
            "https://cdn.pixabay.com/photo/2018/10/30/16/06/water-lily-3784022_960_720.jpg",
            "https://cdn.pixabay.com/photo/2018/02/08/22/27/flower-3140492_960_720.jpg",
            "https://cdn.pixabay.com/photo/2018/08/21/23/29/fog-3622519_960_720.jpg"
        ]

    },
    {
        description: "gwu hwuhw hwiofiw  ifhif fhwhf",
        type: 'image',
        img: [
            "https://cdn.pixabay.com/photo/2018/10/30/16/06/water-lily-3784022_960_720.jpg",
            "https://cdn.pixabay.com/photo/2018/02/08/22/27/flower-3140492_960_720.jpg",
            "https://cdn.pixabay.com/photo/2018/08/21/23/29/fog-3622519_960_720.jpg",
            "https://cdn.pixabay.com/photo/2018/10/30/16/06/water-lily-3784022_960_720.jpg",
            "https://cdn.pixabay.com/photo/2018/02/08/22/27/flower-3140492_960_720.jpg",
            "https://cdn.pixabay.com/photo/2018/08/21/23/29/fog-3622519_960_720.jpg",
            "https://cdn.pixabay.com/photo/2018/10/30/16/06/water-lily-3784022_960_720.jpg",
            "https://cdn.pixabay.com/photo/2018/02/08/22/27/flower-3140492_960_720.jpg",
            "https://cdn.pixabay.com/photo/2018/08/21/23/29/fog-3622519_960_720.jpg",
        ]

    },
    {
        description: "gwu hwuhw hwiofiw  ifhif fhwhf",
        type: 'image',
        img: [
            "https://cdn.pixabay.com/photo/2018/10/30/16/06/water-lily-3784022_960_720.jpg",
            "https://cdn.pixabay.com/photo/2018/02/08/22/27/flower-3140492_960_720.jpg",
            "https://cdn.pixabay.com/photo/2018/08/21/23/29/fog-3622519_960_720.jpg"
        ]

    },
    {
        description: "gwu hwuhw hwiofiw  ifhif fhwhf",
        type: 'video',
        img: [
            "https://cdn.pixabay.com/photo/2018/10/30/16/06/water-lily-3784022_960_720.jpg",
            "https://cdn.pixabay.com/photo/2018/02/08/22/27/flower-3140492_960_720.jpg",
            "https://cdn.pixabay.com/photo/2018/08/21/23/29/fog-3622519_960_720.jpg"
        ]

    },


]
class Home extends Component {
    constructor(props) {
        super(props);
        this.cellRefs = {};
        this.state = {
            theme: this.props.theme,
            currentItem: null,
        };
    }
    async componentDidMount() {
        console.log(await AsyncStorage.getItem('theme'), "ttttttttt")
        console.log(this.props.theme)
        this._schemeSubscription = Appearance.addChangeListener(({ colorScheme }) => {
            this.props.selectTheme(colorScheme)
        });
    }
    componentWillUnmount() {
        this._schemeSubscription.remove()
    }
    _onScrollBeginDrag(e) {
    }

    _onScrollSettlingDrag(e) {
    }

    _onScrollEndDrag(e) {

    }
    onViewableItemsChanged = ({ viewableItems, changed }) => {
        this.setState({ currentItem: viewableItems })
    }
    handleScroll = (event) => {
        let yOffset = event.nativeEvent.contentOffset.y
        console.log(yOffset);
        let contentHeight = 321.0909118652344
        let value = yOffset / contentHeight
        // console.log(value)
    }
    _onViewableItemsChanged = (props) => {
        const changed = props.changed;
        changed.forEach((item) => {
            const cell = this.cellRefs[item.key];
            if (cell) {
                if (item.isViewable) {
                    cell.play();
                } else {
                    cell.pause();
                }
            }
        });
    };
    home = () => {
        return (
            <FlatList
                scrollEventThrottle={16}
                data={data}
                viewabilityConfig={viewabilityConfig}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.1}
                onEndReached={() => { console.log("eeeee") }}
                onViewableItemsChanged={this._onViewableItemsChanged}
                removeClippedSubviews={true}
                initialNumToRender={3}
                maxToRenderPerBatch={3}
                windowSize={5}
                getItemLayout={(_data, index) => ({
                    length: cellHeight,
                    offset: cellHeight * index,
                    index,
                })}
                renderItem={({ item, index }) => {
                    if (item.type == "video") {
                        return (

                            <VideoPost
                                ref={(ref) => {
                                    this.cellRefs[index] = ref;
                                }}
                                {...item}
                            />

                        )
                    }
                    return (
                        <View style={{ heigth: height * 0.7 }}>
                            <Post item={item} />
                        </View>

                    )

                }}
            />
        )
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: this.props.theme == "dark" ? "#333" : "#fff" }}>
                <StatusBar
                    backgroundColor={this.props.theme == "dark" ? "black" : "#ffff"}
                    barStyle={this.props.theme == "dark" ? "light-content" : "dark-content"}
                />
                {/* HEADERS */}
                <View style={{ height: height * 0.07, elevation: 5, width, backgroundColor: "#fff", flexDirection: "row" }}>
                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                        <Ionicons name="notifications-outline" size={24} color="black" />
                    </View>
                    <View style={{ flex: 0.6, alignItems: "center", justifyContent: 'center' }}>
                        <Text style={[styles.text, { fontSize: 20, fontWeight: 'bold', color: this.props.theme == "dark" ? "#1f1f1f" : "#1792E3" }]}>UNIVERSAL WALL</Text>
                    </View>
                    <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                        <Ionicons name="notifications-outline" size={24} color="black" />
                    </View>
                </View>
                <Swiper style={{}}
                    onScrollBeginDrag={this._onScrollBeginDrag.bind(this)}
                    onScrollSettlingDrag={this._onScrollSettlingDrag.bind(this)}
                    onScrollEndDrag={this._onScrollSettlingDrag.bind(this)}
                    showsButtons={true} loop={false}
                    buttonWrapperStyle={{
                        backgroundColor: 'transparent', flexDirection: 'row',
                        position: 'absolute', top: 0, left: 0, flex: 1,
                        paddingHorizontal: 10, paddingVertical: 10,
                        justifyContent: 'space-between', alignItems: 'center',
                    }}
                    prevButton={<View style={{ borderColor: "#fff", borderWidth: 2 }}><Text style={[styles.text1, { transform: [{ rotate: '270 deg' }], }]}>BACK</Text></View>}

                    nextButton={<Text style={[styles.text1, { transform: [{ rotate: '90 deg' }], }]}>LOGIN</Text>}
                    showsPagination={false}
                    disablePrevButton={false}
                    scrollEnabled={true}
                    disableNextButton={false}
                    onIndexChanged={(loginIndex) => { this.setState({ loginIndex, otpShow: false }) }}
                    index={this.state.loginIndex}>
                    <View style={styles.slide1}>
                        {this.home()}
                    </View>
                    <View style={styles.slide2}>
                        <View style={{ flex: 1 }}>
                            <View>
                                <Text>gfgggg</Text>
                            </View>
                        </View>
                    </View>
                </Swiper>
            </View>
        );
    }


}
const styles = StyleSheet.create({
    text: {
        fontFamily
    },
    text1: {
        fontStyle: 'normal',
        fontFamily: fontFamily,
        lineHeight: 22,
        backgroundColor: '#2f2f2f',
        paddingHorizontal: 20,
        borderRadius: 10,
        marginHorizontal: -40,
        overflow: 'hidden',
        color: '#fff',
        fontSize: 14,
        fontWeight: '700',
    },
    slide1: {
        flex: 1,
        backgroundColor: '#fff'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,

    }
}
export default connect(mapStateToProps, { selectTheme })(Home)