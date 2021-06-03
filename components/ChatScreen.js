import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, TextInput, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { selectTheme, selectUser } from '../actions';
import settings from '../appSettings';
const fontFamily = settings.fontFamily
const width = Dimensions.get('screen').width
const height = Dimensions.get("window").height
const screenHeight = Dimensions.get("screen").height
const lightTheme = settings.lightTheme
const darkTheme = settings.darkTheme
class ChatScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          
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
            <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
               <Text>chat screen</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    text: {
        fontFamily
    }
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,

    }
}
export default connect(mapStateToProps, { selectTheme, selectUser })(ChatScreen)