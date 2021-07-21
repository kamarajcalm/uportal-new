import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet,Dimensions} from 'react-native';
import settings from '../appSettings';
import { connect } from 'react-redux';
import { selectTheme} from '../actions';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
const width = Dimensions.get('screen').width
const height = Dimensions.get("window").height
const screenHeight = Dimensions.get("screen").height
const { lightTheme, darkTheme,fontFamily} = settings

const Header = (props)=>{

    let theme;
    if (props.theme == "dark") {
        theme = darkTheme
    } else {
        theme = lightTheme
    }

    const goback =()=>{
       props.navigation.goBack()
    }
    return(
        <View style={[styles.elevation, { height: height * 0.08, backgroundColor: theme.backgroundColor, flexDirection: "row" }]}>
            <TouchableOpacity style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}
             onPress={()=>{goback()}}
            >
                <Ionicons name="arrow-back-outline" size={24} color={theme.TextColor} />
            </TouchableOpacity>
            <View style={{ flex: 0.6, alignItems: "center", justifyContent: "center" }}>
                <Text style={[styles.text, { color: theme.TextColor, fontSize: 20 }]}>{props.title}</Text>
            </View>
            <View style={{ flex: 0.2, alignItems: "center", justifyContent: "center" }}>
                
            </View>
        </View>
    )
}

Header.propTypes = {
    navigation: PropTypes.object,
    title: PropTypes.string
};
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
    elevation: {
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.12,
        shadowRadius: 60,
    }
})
const mapStateToProps = (state) => {

    return {
        theme: state.selectedTheme,

    }
}
const mapActionsToProps ={
    selectTheme,
}
export default connect(mapStateToProps, mapActionsToProps)(Header)