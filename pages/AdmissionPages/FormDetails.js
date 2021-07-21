import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, StatusBar, ScrollView, FlatList, Image, TextInput,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { selectTheme } from '../../actions';
import settings from '../../appSettings';
import Header from '../../components/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import { Ionicons, Entypo, AntDesign, Feather, MaterialCommunityIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
const fontFamily = settings.fontFamily
const width = Dimensions.get('screen').width
const height = Dimensions.get("window").height
const screenHeight = Dimensions.get("screen").height
const lightTheme = settings.lightTheme
const darkTheme = settings.darkTheme
const branch =  [
    {
        label:"CSE",value:"CSE"
    },
    {
        label: "CIVIL", value: "CIVIL"
    },
    {
        label: "ECE", value: "ECE"
    },
    {
        label: "IT", value: "IT"
    },
]
const degree = [
    {
        label: "B.E", value: "B.E"
    },
    {
        label: "ARTS", value: "ARTS"
    },
    {
        label: "COMMERCE", value: "COMMERCE"
    },
    {
        label: "DIPLOMO", value: "DIPLOMO"
    },
]
class FormDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            degree,
            name:"",
            address:"",
            phoneNo:"",
            city:"",
            state:"",
            open: false,
            open2: false,
            value: null,
            value2: null,
            branch,
            marksheet:null,
            openImageModal:false,
            isMarkSheet:false,
            iscommunity:false,
            communityCertificate:null
        };
    }
    setOpen = (open)=> {
        this.setState({
            open
        });
    }

    setValue = (callback)=> {
        this.setState(state => ({
            value: callback(state.value)
        }));
    }

    setItems = (callback)=> {
        this.setState(state => ({
            degree: callback(state.degree)
        }));
    }
    setOpen2 = (open2) => {
        this.setState({
            open2
        });
    }

    setValue2 = (callback) => {
        this.setState(state => ({
            value2: callback(state.value2)
        }));
    }

    setItems2 = (callback) => {
        this.setState(state => ({
            branch: callback(state.branch)
        }));
    }
    _pickImage = async () => {
    
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true
        });
        console.log(result)
        if (result.cancelled == true) {
            return
        }
        let filename = result.uri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        var type = match ? `image/${match[1]}` : `image`;
        const photo = {
            uri: result.uri,
            type: type,
            name: filename,
        };
        if(this.state.isMarkSheet){
         return   this.setState({ openImageModal: false ,marksheet:photo})
        }
        if(this.state.iscommunity){
            return this.setState({ openImageModal: false, communityCertificate: photo })
        }
      
    };
    modalAttach = async (event) => {
        console.log("hree")
        if (event == 'gallery') return this._pickImage();
        if (event == 'camera') {
            this.handlePhoto()
        }
    }
    handlePhoto = async () => {
        let picture = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.1,
        });
        if (picture.cancelled == true) {
            return
        }

        let filename = picture.uri.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        const photo = {
            uri: picture.uri,
            type: type,
            name: filename,
        };
        if (this.state.isMarkSheet) {
            return this.setState({ openImageModal: false, marksheet: photo })
        }
        if (this.state.iscommunity) {
            return this.setState({ openImageModal: false, communityCertificate: photo })
        }
    }
    renderModal = () => {
        let theme;
        if (this.props.theme == "dark") {
            theme = darkTheme
        } else {
            theme = lightTheme
        }
        const themeColor = theme.inverseColor
        return (
            <Modal
                deviceHeight={screenHeight}
                statusBarTranslucent={true}
                isVisible={this.state.openImageModal}
                hasBackdrop={true}
                style={[styles.modalView1, { position: 'absolute', bottom: -20, left: 0, }]}
                onBackdropPress={() => { this.setState({ openImageModal: false }); }} useNativeDriver={true} onRequestClose={() => { this.setState({ openImageModal: false }); }} >
                <View style={{ paddingVertical: width * 0.01, }}>
                    <View style={{
                        flexDirection: 'row', height: width * 0.25, justifyContent: 'space-between',
                        borderWidth: 0, backgroundColor: 'transparent', borderRadius: 0, paddingTop: width * 0.05
                    }}>
                        <TouchableOpacity
                            style={{
                                alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', paddingHorizontal: 4,
                                paddingVertical: 6, borderWidth: 0, borderRadius: 0
                            }}
                            onPress={() => {this.modalAttach('gallery') }}>
                            <FontAwesome
                                name="folder"
                                size={width * 0.16}
                                style={{
                                    marginRight: 5, color: themeColor,
                                    textAlign: 'center', marginLeft: width * 0.1
                                }} />
                            <Text style={{ fontSize: 16, color: themeColor, textAlign: 'center', marginLeft: width * 0.1 }}>Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', paddingHorizontal: 4, paddingVertical: 6, borderWidth: 0, borderRadius: 0, }}
                            onPress={() => { this.modalAttach('camera') }}>
                            <FontAwesome name="camera" size={width * 0.14} style={{ marginRight: 5, color: themeColor, textAlign: 'center', marginRight: width * 0.1 }} />
                            <Text style={{ fontSize: 16, color: themeColor, textAlign: 'center', marginRight: width * 0.1 }}>camera</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
    render() {
        let theme;
        if (this.props.theme == "dark") {
            theme = darkTheme
        } else {
            theme = lightTheme
        }
        const { open, value, degree ,branch,open2,value2} = this.state;
        return (
            <>
                <StatusBar backgroundColor={theme.backgroundColor} barStyle={this.props.theme == "dark" ? "light-content" : "dark-content"} />
                <SafeAreaView style={[styles.topSafeArea, { backgroundColor: theme.backgroundColor }]} />
                <SafeAreaView style={[styles.bottomSafeArea, { backgroundColor: theme.backgroundColor }]}>
                    <Header navigation={this.props.navigation} title={"FORM DETAILS"} />
                    <View style={{ flex: 1, backgroundColor:theme.backgroundColor}}>
                         <ScrollView 
                           showsVerticalScrollIndicator={false}
                           contentContainerStyle={{paddingBottom:20}}
                         >
                                              {/* PERSONAL INFO */}

                                <View style={{alignItems:"center",justifyContent:"center",marginTop:20}}>
                                    <Text style={[styles.text,{color:theme.TextColor,textDecorationLine:"underline"}]}>PERSONAL INFO :</Text>
                                </View>
                               <View style={{marginTop:10,paddingHorizontal:20}}>
                                   <Text style={[styles.text,{color:theme.TextColor}]}>Name* : </Text>
                                   <TextInput 
                                     value={this.state.name}
                                     selectionColor={theme.inverseColor}
                                    onChangeText={(name)=>{this.setState({name})}}
                                     style={{height:height*0.05,width:width*0.7,marginLeft:10,borderColor:theme.borderColor,borderBottomWidth:1,color:theme.TextColor}}
                                   />
                               </View>
                            <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                                <Text style={[styles.text, { color: theme.TextColor }]}>Address* : </Text>
                                <TextInput
                                    value={this.state.address}
                                    selectionColor={theme.inverseColor}
                                    onChangeText={(address) => { this.setState({ address }) }}
                                    style={{ minHeight: height * 0.05, width: width * 0.7, marginLeft: 10, borderColor: theme.borderColor, borderBottomWidth: 1, color: theme.TextColor }}
                                    multiline={true}
                                />
                            </View>
                            <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                                <Text style={[styles.text, { color: theme.TextColor }]}>City* : </Text>
                                <TextInput
                                    value={this.state.city}
                                    selectionColor={theme.inverseColor}
                                    onChangeText={(city) => { this.setState({ city }) }}
                                    style={{ minHeight: height * 0.05, width: width * 0.7, marginLeft: 10, borderColor: theme.borderColor, borderBottomWidth: 1, color: theme.TextColor }}
                                    multiline={true}
                                />
                            </View>
                            <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                                <Text style={[styles.text, { color: theme.TextColor }]}>State* : </Text>
                                <TextInput
                                    value={this.state.state}
                                    selectionColor={theme.inverseColor}
                                    onChangeText={(state) => { this.setState({ state }) }}
                                    style={{ minHeight: height * 0.05, width: width * 0.7, marginLeft: 10, borderColor: theme.borderColor, borderBottomWidth: 1, color: theme.TextColor }}
                                    multiline={true}
                                />
                            </View>
                            <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                                <Text style={[styles.text, { color: theme.TextColor }]}>Phone No*: </Text>
                                <TextInput
                                    maxLength={10}
                                    keyboardType={"numeric"}
                                    value={this.state.phoneNo}
                                    selectionColor={theme.inverseColor}
                                    onChangeText={(phoneNo) => { this.setState({ phoneNo }) }}
                                    style={{height: height * 0.05, width: width * 0.7, marginLeft: 10, borderColor: theme.borderColor, borderBottomWidth: 1, color: theme.TextColor }}
                                   
                                />
                            </View>

                                            {/* DEGREE INFO */}


                            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                                <Text style={[styles.text, { color: theme.TextColor, textDecorationLine: "underline" }]}>DEGREE INFO :</Text>
                            </View>


                            <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                                <Text style={[styles.text, { color: theme.TextColor }]}>Select Degree: </Text>
                                <View style={{ marginTop:20,height:this.state.open?height*0.3:height*0.08}}>
                                    <DropDownPicker
                                     
                                        open={open}
                                        value={value}
                                        items={degree}
                                        setOpen={this.setOpen}
                                        setValue={this.setValue}
                                        setItems={this.setItems}
    
                                     />
                                </View>
                            </View>
                            <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                                <Text style={[styles.text, { color: theme.TextColor }]}>Select Branch: </Text>
                                <View style={{ marginTop: 20, height: this.state.open2 ? height * 0.3 : height * 0.08 }}>
                                    <DropDownPicker

                                        open={open2}
                                        value={value2}
                                        items={branch}
                                        setOpen={this.setOpen2}
                                        setValue={this.setValue2}
                                        setItems={this.setItems2}

                                    />
                                </View>
                            </View>

                                            {/* DOCUMENT INFO */}
                            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                                <Text style={[styles.text, { color: theme.TextColor, textDecorationLine: "underline" }]}>UPLOAD DOCUMENTS :</Text>
                            </View>
                            <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                                <Text style={[styles.text, { color: theme.TextColor }]}>MARK SHEET*: </Text>
                                <View style={{marginTop:10,flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
                                    <TouchableOpacity 
                                        onPress={() => { this.setState({ openImageModal: true,isMarkSheet:true})}}
                                     style={{height:height*0.05,width:width*0.4,alignItems:"center",justifyContent:"center",backgroundColor:theme.inverseColor}}
                                    >
                                        <Text style={[styles.text,{color:"#fff"}]}>Browse</Text>
                                    </TouchableOpacity>
                                    <View>
                                        <Image 
                                           style={{height:50,width:50}}
                                           source={{uri:this.state.marksheet?.uri}}
                                           resizeMode={"contain"}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                                <Text style={[styles.text, { color: theme.TextColor }]}>COMMUNITY CERTIFICATE*: </Text>
                                <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
                                    <TouchableOpacity
                                        onPress={() => { this.setState({ openImageModal: true, iscommunity: true }) }}
                                        style={{ height: height * 0.05, width: width * 0.4, alignItems: "center", justifyContent: "center", backgroundColor: theme.inverseColor }}
                                    >
                                        <Text style={[styles.text, { color: "#fff" }]}>Browse</Text>
                                    </TouchableOpacity>
                                    <View>
                                        <Image
                                            style={{ height: 50, width: 50 }}
                                            source={{ uri: this.state.communityCertificate?.uri }}
                                            resizeMode={"contain"}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginVertical: 20, alignItems: "center", justifyContent: "center" }}>
                                <TouchableOpacity style={{ height: height * 0.05, width: width * 0.3, alignItems: "center", justifyContent: "center", backgroundColor: theme.inverseColor, borderRadius: 10 }}
                                    onPress={() => { }}
                                >
                                    <Text style={[styles.text, { color: "#fff" }]}>APPLY</Text>
                                </TouchableOpacity>
                            </View>
                            {this.renderModal()}
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
        theme: state.selectedTheme,

    }
}
const mapActionToProps = {

    selectTheme

}
export default connect(mapStateToProps, mapActionToProps)(FormDetails)