import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { selectTheme } from '../actions';
import settings from '../appSettings';
const fontFamily = settings.fontFamily
const width = Dimensions.get('screen').width
const height = Dimensions.get("window").height
const screenHeight = Dimensions.get("screen").height
const lightTheme = settings.lightTheme
const darkTheme = settings.darkTheme
class InstituteWall extends React.PureComponent {
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
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: this.props.theme == "dark" ? "#333" : "#fff" }}>
                        <Text> Insitute Wall</Text>
                   

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
export default connect(mapStateToProps, { selectTheme })(InstituteWall)